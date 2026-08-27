"use client";

import { useEffect, useState } from "react";

const loadingMessages = [
  "Understanding your preferences…",
  "Comparing NYC neighborhoods…",
  "Evaluating budget, commute, and lifestyle fit…",
  "Ranking your strongest matches…",
  "Preparing your personalized recommendations…",
];

const transportationMap = {
  any: ["no-preference"],
  subway: ["subway", "walking"],
  manhattan: ["subway", "commuter-rail"],
  multiple: ["subway", "bus"],
  bus: ["bus", "walking"],
};

const lifestyleMap = {
  any: { lifestyle: ["no-preference"], amenities: [] },
  quiet: { lifestyle: ["quiet"], amenities: [] },
  community: { lifestyle: ["community-oriented"], amenities: [] },
  nightlife: { lifestyle: ["nightlife", "social"], amenities: [] },
  restaurants: { lifestyle: ["food-and-dining"], amenities: ["restaurants"] },
  parks: { lifestyle: ["parks-and-outdoors"], amenities: ["parks"] },
  groceries: {
    lifestyle: ["community-oriented"],
    amenities: ["grocery stores"],
  },
  shopping: { lifestyle: ["shopping"], amenities: ["shopping"] },
  walkable: {
    lifestyle: ["fitness"],
    amenities: ["walkable streets"],
    transportation: ["walking"],
  },
};

export default function Home() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setLoadingStep((currentStep) =>
        Math.min(currentStep + 1, loadingMessages.length - 1),
      );
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isLoading]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoadingStep(0);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const transportation = transportationMap[formData.get("transportation")];
    const lifestyle = lifestyleMap[formData.get("lifestyle")];
    const typedAmenities = String(formData.get("requiredAmenities") || "")
      .split(",")
      .map((amenity) => amenity.trim())
      .filter(Boolean);

    const payload = {
      budget: Number(formData.get("budget")),
      preferredBorough: formData.get("preferredBorough"),
      commuteLocation: formData.get("commuteLocation"),
      lifestyle: lifestyle.lifestyle,
      transportation: [
        ...new Set([
          ...transportation,
          ...(lifestyle.transportation || []),
        ]),
      ],
      requiredAmenities: [
        ...new Set([...lifestyle.amenities, ...typedAmenities]),
      ],
      bedrooms: formData.get("bedrooms"),
      pet: formData.get("pet"),
      safetyPreference: formData.get("safetyPreference"),
      additionalPreferences: formData.get("additionalPreferences"),
    };

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        const fieldErrors = data.fields
          ?.map(({ field, message }) => `${field}: ${message}`)
          .join(" ");
        throw new Error(fieldErrors || data.error || "Request failed.");
      }

      setResult(data.result);
      requestAnimationFrame(() => {
        document.getElementById("recommendations")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch (requestError) {
      setResult(null);
      setError(requestError.message || "Unable to get recommendations.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen text-slate-900">
      <section className="bg-gradient-to-r from-blue-400 via-blue-300 to-sky-200 px-6 py-20 text-center text-white shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          NestMapper-NYC
        </h1>
        <p className="mx-auto mt-4 max-w-5xl text-lg text-blue-600 md:text-xl">
          Find your best-fit apartment in your ideal neighborhood.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-blue-100 bg-white/95 p-8 shadow-xl shadow-blue-100/60 sm:p-10"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Find Your Best Match
            </h2>
            <p className="mt-2 text-slate-500">
              Tell us what you&apos;re looking for in your next NYC apartment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField label="Monthly Rent" htmlFor="budget">
              <input
                id="budget"
                name="budget"
                type="number"
                min="500"
                max="50000"
                step="1"
                required
                placeholder="Enter maximum monthly rent"
                className="form-control"
              />
            </FormField>

            <FormField label="Pet" htmlFor="pet">
              <select id="pet" name="pet" required className="form-control">
                <option value="">Select pet preference</option>
                <option value="None">No Pet</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other">Other / Pet Friendly</option>
              </select>
            </FormField>

            <FormField label="Bedroom" htmlFor="bedrooms">
              <select id="bedrooms" name="bedrooms" required className="form-control">
                <option value="">Select bedroom</option>
                <option value="Studio">Studio</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4+">4+ Bedrooms</option>
              </select>
            </FormField>

            <FormField label="Safety Priority" htmlFor="safetyPreference">
              <select id="safetyPreference" name="safetyPreference" className="form-control" defaultValue="no-preference">
                <option value="no-preference">No Preference</option>
                <option value="important">Important</option>
                <option value="very-important">Very Important</option>
              </select>
            </FormField>

            <FormField label="Transportation" htmlFor="transportation">
              <select id="transportation" name="transportation" className="form-control" defaultValue="any">
                <option value="any">Any Transportation</option>
                <option value="subway">Near Subway</option>
                <option value="manhattan">Easy Manhattan Commute</option>
                <option value="multiple">Multiple Transit Options</option>
                <option value="bus">Bus Access</option>
              </select>
            </FormField>

            <FormField label="Lifestyle & Amenities" htmlFor="lifestyle">
              <select id="lifestyle" name="lifestyle" className="form-control" defaultValue="any">
                <option value="any">Any Lifestyle</option>
                <option value="quiet">Quiet</option>
                <option value="community">Community-oriented</option>
                <option value="nightlife">Nightlife</option>
                <option value="restaurants">Restaurants</option>
                <option value="parks">Parks</option>
                <option value="groceries">Grocery Stores</option>
                <option value="shopping">Shopping</option>
                <option value="walkable">Walkable</option>
              </select>
            </FormField>

            <FormField label="Preferred Borough" htmlFor="preferredBorough">
              <select id="preferredBorough" name="preferredBorough" className="form-control" defaultValue="Any">
                <option value="Any">Any NYC Area</option>
                <option value="Manhattan">Manhattan</option>
                <option value="Brooklyn">Brooklyn</option>
                <option value="Queens">Queens</option>
                <option value="Bronx">Bronx</option>
                <option value="Staten Island">Staten Island</option>
              </select>
            </FormField>

            <FormField label="Commute Destination" htmlFor="commuteLocation">
              <input
                id="commuteLocation"
                name="commuteLocation"
                type="text"
                maxLength="100"
                required
                placeholder="Example: Midtown Manhattan"
                className="form-control"
              />
            </FormField>
          </div>

          <div className="mt-7">
            <FormField label="Required Amenities" htmlFor="requiredAmenities">
              <input
                id="requiredAmenities"
                name="requiredAmenities"
                type="text"
                maxLength="300"
                placeholder="Comma-separated: elevator, laundry, dog park"
                className="form-control"
              />
            </FormField>
          </div>

          <div className="mt-7">
            <FormField label="What matters most to you?" htmlFor="additionalPreferences">
              <textarea
                id="additionalPreferences"
                name="additionalPreferences"
                rows="5"
                maxLength="500"
                placeholder="Tell us anything else you're looking for..."
                className="form-control resize-none"
              />
            </FormField>
          </div>

          {error && (
            <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {isLoading && <LoadingProgress currentStep={loadingStep} />}

          <button type="submit" disabled={isLoading} className="analyze-button mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60">
            {isLoading ? "Finding your best matches…" : "Analyze My Best Match"}
          </button>
        </form>
      </section>

      <section id="recommendations" className="mx-auto min-h-32 max-w-5xl scroll-mt-8 px-6 pb-20 pt-6" aria-live="polite">
        {result ? (
          <RecommendationResults result={result} />
        ) : (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-white/60 p-8 text-center text-slate-500">
            Complete the form to receive three personalized NYC neighborhood recommendations.
          </div>
        )}
      </section>

      <footer className="border-t border-blue-100 bg-white/80 px-6 py-6 text-center text-sm text-slate-500">
        <p>© 2026 NestMapper-NYC</p>
        <p>Gemini AI-powered NYC Apartment Matching</p>
      </footer>
    </main>
  );
}

function FormField({ label, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}

function LoadingProgress({ currentStep }) {
  const progress = ((currentStep + 1) / loadingMessages.length) * 100;

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/80 p-5"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"
        />
        <div>
          <p className="font-semibold text-blue-900">
            {loadingMessages[currentStep]}
          </p>
          <p className="mt-1 text-sm text-blue-700">
            This usually takes around 15–30 seconds.
          </p>
        </div>
      </div>

      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-blue-100"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400 transition-[width] duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="sr-only">Recommendation request in progress.</span>
    </div>
  );
}

function RecommendationResults({ result }) {
  const bestRecommendation = result.recommendations[0];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Top 3 Results</h2>
        <p className="mt-2 text-slate-500">Recommended neighborhoods based on your preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {result.recommendations.map((recommendation) => (
          <ResultCard key={recommendation.rank} recommendation={recommendation} />
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 p-8 shadow-lg shadow-blue-100/50">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-600">✨ AI Summary</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900">Best Overall Match: {result.bestMatch}</h3>
        <p className="mt-4 leading-7 text-slate-600">{result.summary}</p>

        <div className="mt-6">
          <h4 className="mb-3 font-bold text-slate-900">Why It Stands Out</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {bestRecommendation.reasons.map((reason) => (
              <SummaryItem key={reason} text={reason} />
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white/70 p-5">
          <h4 className="font-bold text-slate-900">Trade-offs</h4>
          <ul className="mt-2 list-disc space-y-2 pl-5 leading-6 text-slate-600">
            {bestRecommendation.tradeoffs.map((tradeoff) => (
              <li key={tradeoff}>{tradeoff}</li>
            ))}
          </ul>
        </div>

        <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          <strong>Verify current information:</strong> {result.dataCaveat}
        </p>
      </div>
    </>
  );
}

function ResultCard({ recommendation }) {
  return (
    <article className="result-card rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-600">#{recommendation.rank} Match</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">{recommendation.neighborhood}</h3>
          <p className="text-sm text-slate-500">{recommendation.borough}</p>
        </div>
        <div className="rounded-full bg-blue-100 px-3 py-2 text-sm font-bold text-blue-700">
          {recommendation.matchScore}%
        </div>
      </div>

      <div className="mt-6 text-sm">
        <p className="text-slate-500">Estimated Rent</p>
        <p className="mt-1 font-semibold text-slate-800">
          {recommendation.estimatedMonthlyRent || "Not verified"}
        </p>
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-slate-800">Why it matches</h4>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
          {recommendation.reasons.map((reason) => <li key={reason}>{reason}</li>)}
        </ul>
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-slate-800">Tradeoffs</h4>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
          {recommendation.tradeoffs.map((tradeoff) => <li key={tradeoff}>{tradeoff}</li>)}
        </ul>
      </div>

      <div className="mt-6 border-t border-blue-100 pt-5">
        <h4 className="text-sm font-semibold text-slate-800">
          Verified Active Apartments
        </h4>
        {recommendation.listings?.length ? (
          <div className="mt-3 space-y-3">
            {recommendation.listings.map((listing) => (
              <ApartmentListing key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm leading-6 text-slate-500">
            No matching active listing was found in this neighborhood for the
            selected budget and bedroom count. Availability changes often.
          </p>
        )}
      </div>

      <p className="mt-5 border-t border-blue-100 pt-4 text-xs leading-5 text-slate-500">
        {recommendation.verificationNote}
      </p>
    </article>
  );
}

function ApartmentListing({ listing }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.address)}`;

  return (
    <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
            Active listing
          </p>
          <p className="mt-1 text-sm font-semibold leading-5 text-slate-900">
            {listing.address}
          </p>
        </div>
        <p className="whitespace-nowrap text-sm font-bold text-emerald-800">
          ${listing.price.toLocaleString()}/mo
        </p>
      </div>

      <p className="mt-2 text-xs text-slate-600">
        {listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} bed`}
        {listing.bathrooms != null ? ` · ${listing.bathrooms} bath` : ""}
        {listing.squareFootage ? ` · ${listing.squareFootage.toLocaleString()} sq ft` : ""}
      </p>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-xs font-semibold text-blue-700 underline underline-offset-2"
      >
        View address on map
      </a>
    </div>
  );
}

function SummaryItem({ text }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700">
      <span className="mr-2 text-blue-600">✓</span>
      {text}
    </div>
  );
}
