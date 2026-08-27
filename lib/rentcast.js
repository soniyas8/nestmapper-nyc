import "server-only";

const RENTCAST_ENDPOINT =
  "https://api.rentcast.io/v1/listings/rental/long-term";

function bedroomFilter(bedrooms) {
  if (bedrooms === "Studio") return "0";
  if (bedrooms === "4+") return "4:";
  return bedrooms;
}

function normalizeListing(listing) {
  return {
    id: listing.id,
    address: listing.formattedAddress,
    price: listing.price,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms ?? null,
    squareFootage: listing.squareFootage ?? null,
    status: listing.status,
    listedDate: listing.listedDate ?? null,
    lastSeenDate: listing.lastSeenDate ?? null,
    latitude: listing.latitude ?? null,
    longitude: listing.longitude ?? null,
  };
}

async function fetchListingsForRecommendation(recommendation, preferences) {
  const apiKey = process.env.RENTCAST_API_KEY;

  if (!apiKey) {
    return [];
  }

  const params = new URLSearchParams({
    zipCode: recommendation.zipCode,
    status: "Active",
    price: `0:${preferences.budget}`,
    bedrooms: bedroomFilter(preferences.bedrooms),
    limit: "2",
  });
  const response = await fetch(`${RENTCAST_ENDPOINT}?${params}`, {
    headers: { "X-Api-Key": apiKey },
    cache: "no-store",
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`RentCast returned HTTP ${response.status}`);
  }

  const listings = await response.json();
  return Array.isArray(listings)
    ? listings
        .filter(
          (listing) =>
            listing.status === "Active" && listing.formattedAddress,
        )
        .map(normalizeListing)
    : [];
}

export async function addVerifiedListings(recommendations, preferences) {
  if (!process.env.RENTCAST_API_KEY) {
    return recommendations.map((recommendation) => ({
      ...recommendation,
      listings: [],
    }));
  }

  const listingResults = await Promise.allSettled(
    recommendations.map((recommendation) =>
      fetchListingsForRecommendation(recommendation, preferences),
    ),
  );

  return recommendations.map((recommendation, index) => {
    const listingResult = listingResults[index];

    if (listingResult.status === "rejected") {
      console.error(
        `RentCast lookup failed for ${recommendation.neighborhood}:`,
        listingResult.reason,
      );
    }

    return {
      ...recommendation,
      listings:
        listingResult.status === "fulfilled" ? listingResult.value : [],
    };
  });
}
