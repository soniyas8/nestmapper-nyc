export default function Home() {
  return (
    <main className="min-h-screen text-slate-900">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-400 via-blue-300 to-sky-200 px-6 py-20 text-center text-slate-800 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          NestMapper-NYC
        </h1>

        <p className="mx-auto mt-4 max-w-5xl text-lg text-blue-900 md:text-xl md:whitespace-nowrap">
          Find your best-fit apartment in your ideal neighborhood.
        </p>
      </section>

      {/* Preference Section */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-[28px] border border-blue-100 bg-white/95 p-8 shadow-xl shadow-blue-100/60 sm:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Find Your Best Match
            </h2>

            <p className="mt-2 text-slate-500">
              Tell us what you&apos;re looking for in your next NYC apartment.
            </p>
          </div>

          {/* 2 x 2 Preferences */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Monthly Rent */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Monthly Rent
              </label>

              <input
                type="number"
                placeholder="Enter monthly rent"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none"
              />
            </div>

            {/* Pet */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Pet
              </label>

              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none">
                <option>Select pet preference</option>
                <option>No Pet</option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Pet Friendly</option>
              </select>
            </div>

            {/* Bedroom */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Bedroom
              </label>

              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none">
                <option>Select bedroom</option>
                <option>Studio</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3 Bedrooms</option>
                <option>4+ Bedrooms</option>
              </select>
            </div>

            {/* Safety */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Safety Rating
              </label>

              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none">
                <option>Any Safety Rating</option>
                <option>3+ / 5</option>
                <option>4+ / 5</option>
                <option>4.5+ / 5</option>
              </select>
            </div>
          

            {/* Transportation */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Transportation
              </label>

              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none">
                <option>Any Transportation</option>
                <option>Near Subway</option>
                <option>Easy Manhattan Commute</option>
                <option>Multiple Transit Options</option>
                <option>Bus Access</option>
              </select>
            </div>

            {/* Lifestyle & Amenities */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Lifestyle & Amenities
              </label>

              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none">
                <option>Any Lifestyle & Amenities</option>
                <option>Quiet</option>
                <option>Family-Friendly</option>
                <option>Nightlife</option>
                <option>Restaurants</option>
                <option>Parks</option>
                <option>Grocery Stores</option>
                <option>Shopping</option>
                <option>Walkable</option>
              </select>
            </div>
          </div>

          {/* Additional Requirements */}
          <div className="mt-7">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              What matters most to you?
            </label>

            <textarea
              rows="5"
              placeholder="Tell us anything else you're looking for — near subway, quiet neighborhood, restaurants, nightlife, short commute, parks, schools, grocery stores..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none"
            />
          </div>

          {/* Apartment Area */}
          <div className="mt-7">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Preferred Borough
            </label>

            <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none">
              <option>Any NYC Area</option>
              <option>Manhattan</option>
              <option>Brooklyn</option>
              <option>Queens</option>
              <option>Bronx</option>
              <option>Staten Island</option>
            </select>
          </div>

          {/* Analyze Button */}
          <button
            type="button"
            className="analyze-button mt-8 w-full"
          >
            Analyze My Best Match
          </button>
        </div>
      </section>

      {/* Result Section */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Top 3 Neighborhood Matches
          </h2>

          <p className="mt-2 text-slate-500">
            Explore the best neighborhoods and apartment options based on your preferences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ResultCard
            rank="1"
            area="Bay Ridge"
            borough="Brooklyn"
            score="92%"
            rent="$2,350"
            safety="4.5 / 5"
            apartments={[
              {
                name: "1 Bedroom Apartment",
                price: "$2,300/mo",
                details: "Pet Friendly · Near Subway",
              },
              {
              name: "Studio Apartment",
              price: "$2,150/mo",
              details: "Laundry · Elevator",
              },
            ]}
            
          />

          <ResultCard
            rank="2"
            area="Astoria"
            borough="Queens"
            score="87%"
            rent="$2,650"
            safety="4.2 / 5"
            apartments={[
              {
                name: "1 Bedroom Apartment",
                price: "$2,600/mo",
                details: "Near Subway · Restaurants",
              },
              {
                name: "Studio Apartment",
                price: "$2,400/mo",
                details: "Pet Friendly · Laundry",
              },
            ]}  
          />

          <ResultCard
            rank="3"
            area="Sunnyside"
            borough="Queens"
            score="83%"
            rent="$2,400"
            safety="4.1 / 5"
            apartments={[
              {
                name: "1 Bedroom Apartment",
                price: "$2,350/mo",
                details: "Quiet Area · Near Subway",
              },
              {
                name: "Studio Apartment",
                price: "$2,200/mo",
                details: "Elevator · Grocery Nearby",
              },
            ]} 
          />
        </div>

        {/* AI Summary */}
        <div className="mt-10 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 p-8 shadow-lg shadow-blue-100/50">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            ✨ AI Summary
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            Best Overall Match: Bay Ridge + 1 Bedroom Apartment
          </h3>

          <p className="mt-4 leading-7 text-slate-600">
            Bay Ridge offers the strongest overall balance of affordability,
            safety, transportation access, and apartment features based on your
            selected preferences.
          </p>

        {/* Strengths */}
        <div className="mt-6">
          <h4 className="mb-3 font-bold text-slate-900">
            Why It Stands Out
          </h4>

        <div className="grid gap-3 sm:grid-cols-2">
          <SummaryItem text="Within your preferred monthly budget" />
          <SummaryItem text="Highest safety score among the top matches" />
          <SummaryItem text="Apartment meets your bedroom and pet preferences" />
          <SummaryItem text="Good access to transportation and local amenities" />
        </div>
        </div>

        {/* Trade-offs */}
        <div className="mt-6 rounded-2xl bg-white/70 p-5">
          <h4 className="font-bold text-slate-900">
            Trade-offs
          </h4>

        <p className="mt-2 leading-6 text-slate-600">
          Bay Ridge may have a longer commute than Astoria. Astoria provides
          stronger nightlife and Manhattan access, but its matching apartments
          are generally more expensive.
        </p>
        </div>

        {/* Final Recommendation */}
        <div className="mt-6">
          <h4 className="font-bold text-slate-900">
          Final Recommendation
        </h4>

        <p className="mt-2 leading-6 text-slate-600">
          Choose Bay Ridge if affordability, safety, and apartment value are
          your highest priorities. Consider Astoria instead if commute time and
          lifestyle options matter more to you.
        </p>
      </div>
      </div>
      </section>

      <footer className="border-t border-blue-100 bg-white/80 px-6 py-6 text-center text-sm text-slate-500">
        <p> © 2026 NestMapper-NYC </p>
        <p> Gemini AI-powered NYC Apartment Matching</p>
      </footer>

    </main>
  );
}

function ResultCard({
  rank,
  area,
  borough,
  score,
  rent,
  safety,
  apartments,
}) {
  return (
    <div className="result-card rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            #{rank} Match
          </p>

          <h3 className="mt-1 text-xl font-bold text-slate-900">
            {area}
          </h3>

          <p className="text-sm text-slate-500">
            {borough}
          </p>
        </div>

        <div className="rounded-full bg-blue-100 px-3 py-2 text-sm font-bold text-blue-700">
          {score}
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">
            Average Rent
          </span>

          <span className="font-semibold text-slate-800">
            {rent}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">
            Safety
          </span>

          <span className="font-semibold text-slate-800">
            {safety}
          </span>
        </div>
      </div>

      {/* Top Apartments */}
      <div className="mt-6 border-t border-slate-200 pt-4">
        <h4 className="mb-3 text-sm font-bold text-slate-900">
          Top Apartments
        </h4>

        <div className="space-y-3">
          {apartments.map((apartment, index) => (
            <div
              key={index}
              className="rounded-xl bg-blue-50 p-3"
            >
              <div className="flex justify-between gap-3">
                <span className="text-sm font-semibold text-slate-800">
                  {apartment.name}
                </span>

                <span className="whitespace-nowrap text-sm font-bold text-blue-700">
                  {apartment.price}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                {apartment.details}
              </p>
            </div>
          ))}
        </div>
      </div>
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