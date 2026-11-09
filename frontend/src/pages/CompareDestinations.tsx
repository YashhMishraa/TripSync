import { useEffect, useState } from "react";
import { destinations } from "../data/destinations";
import {
  ArrowLeftRight,
  CalendarDays,
  Check,
  Compass,
  MapPin,
  Plus,
  Star,
  Wallet,
  X,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";


const COMPARE_STORAGE_KEY = "tripsync-compare-destinations";

function CompareDestinations() {
  const [selectedIds, setSelectedIds] = useState<number[]>(() => {

  try {
    const saved = localStorage.getItem(COMPARE_STORAGE_KEY);

    if (saved === null) return [1, 2];

    const names: unknown = JSON.parse(saved);

    if (!Array.isArray(names)) return [1, 2];

    return destinations
      .filter((destination) => names.includes(destination.name))
      .map((destination) => destination.id);

  } catch {
    return [1, 2];
  }

});
  const [limitMessage, setLimitMessage] = useState("");
  useEffect(() => {

  const selectedNames = destinations
    .filter((destination) => selectedIds.includes(destination.id))
    .map((destination) => destination.name);

  localStorage.setItem(
    COMPARE_STORAGE_KEY,
    JSON.stringify(selectedNames)
  );

}, [selectedIds]);

  const selectedDestinations = destinations.filter((destination) =>
    selectedIds.includes(destination.id)
  );

  const lowestBudget = Math.min(
    ...selectedDestinations.map((destination) => destination.budget)
  );

  const highestBudget = Math.max(
    0,
    ...selectedDestinations.map((destination) => destination.budget)
  );

  const highestRating = Math.max(
    ...selectedDestinations.map((destination) => destination.rating)
  );

  const toggleDestination = (id: number) => {
    setLimitMessage("");

    if (selectedIds.includes(id)) {
      setSelectedIds((previous) => previous.filter((item) => item !== id));
      return;
    }

    if (selectedIds.length >= 3) {
      setLimitMessage("You can compare a maximum of 3 destinations.");
      return;
    }

    setSelectedIds((previous) => [...previous, id]);
  };

  return (
    <div className="p-4 md:p-7">

      {/* Page Heading */}

      <div className="mb-8">

        <p className="text-xs font-semibold tracking-[0.2em] text-orange-400">
          MAKE BETTER TRAVEL DECISIONS
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
          Compare Destinations
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
          Compare destinations based on estimated budgets, travel
          duration, activities and ratings to find your ideal journey.
        </p>

      </div>

      {/* Destination Selection */}

      <section className="mb-8">

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2 className="text-xl font-semibold text-white">
              Select Destinations
            </h2>

            <p className="mt-1 text-xs text-white/50">
              Select 2 or 3 destinations to compare.
            </p>
          </div>

          <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-xs font-medium text-orange-300">
            {selectedIds.length}/3 Selected
          </span>

        </div>

        {limitMessage && (
          <p className="mb-4 text-sm text-orange-300" role="alert">
            {limitMessage}
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

          {destinations.map((destination) => {

            const isSelected = selectedIds.includes(destination.id);

            return (

              <Button
                key={destination.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleDestination(destination.id)}
                className={`group relative overflow-hidden rounded-2xl border text-left transition duration-300 ${
                  isSelected
                    ? "border-orange-400 bg-orange-500/10"
                    : "border-white/15 bg-white/5 hover:border-white/35"
                }`}
              >

                <div className="relative h-40 overflow-hidden">

                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <span className="absolute bottom-3 left-4 flex items-center gap-1 text-xs text-white">
                    <MapPin size={13} />
                    {destination.country}
                  </span>

                  <span
                    className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full ${
                      isSelected
                        ? "bg-orange-500 text-white"
                        : "bg-black/50 text-white"
                    }`}
                  >
                    {isSelected ? <Check size={16} /> : <Plus size={16} />}
                  </span>

                </div>

                <div className="p-4">

                  <div className="flex items-center justify-between gap-2">

                    <h3 className="font-semibold text-white">
                      {destination.name}
                    </h3>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/70">
                      {destination.category}
                    </span>

                  </div>

                  <div className="mt-3 flex items-center justify-between">

                    <span className="text-sm font-semibold text-orange-300">
                      ₹{destination.budget.toLocaleString("en-IN")}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-white/70">
                      <Star size={13} fill="#FFB347" color="#FFB347" />
                      {destination.rating}
                    </span>

                  </div>

                </div>

              </Button>

            );
          })}

        </div>

      </section>

      {/* Comparison Highlights */}

        {selectedDestinations.length >= 2 && (

          <section className="mb-7">

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white">
                Comparison Highlights
              </h2>

              <p className="mt-1 text-xs text-white/50">
                Quick insights to help you choose your destination.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Most Budget-Friendly */}

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-emerald-400/15 p-3 text-emerald-300">
                    <Wallet size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-emerald-300">
                      MOST BUDGET-FRIENDLY
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {
                        selectedDestinations.find(
                          (destination) => destination.budget === lowestBudget
                        )?.name
                      }
                    </h3>
                  </div>

                </div>

                <p className="mt-4 text-2xl font-bold text-emerald-300">
                  ₹{lowestBudget.toLocaleString("en-IN")}
                </p>

                <p className="mt-1 text-xs text-white/50">
                  Lowest estimated budget among selected destinations.
                </p>

              </div>

              {/* Highest Rated */}

              <div className="rounded-2xl border border-orange-400/20 bg-orange-400/10 p-5">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-orange-400/15 p-3 text-orange-300">
                    <Star size={21} fill="currentColor" />
                  </div>

                  <div>
                    <p className="text-xs text-orange-300">
                      HIGHEST RATED
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {
                        selectedDestinations.find(
                          (destination) => destination.rating === highestRating
                        )?.name
                      }
                    </h3>
                  </div>

                </div>

                <p className="mt-4 text-2xl font-bold text-orange-300">
                  {highestRating}/5
                </p>

                <p className="mt-1 text-xs text-white/50">
                  Highest destination rating among your selections.
                </p>

              </div>

            </div>

          </section>

        )}

      {/* Comparison Results */}

      <section className="overflow-hidden rounded-[26px] border border-white/15 bg-white/5 backdrop-blur-xl">

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-orange-500/20 p-3 text-orange-400">
              <ArrowLeftRight size={21} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Destination Comparison
              </h2>

              <p className="text-xs text-white/50">
                Side-by-side travel comparison
              </p>
            </div>

          </div>

          <span className="text-xs text-white/50">
            {selectedDestinations.length} destinations
          </span>

        </div>

        {selectedDestinations.length < 2 ? (

          <div className="p-12 text-center">

            <Compass size={35} className="mx-auto text-orange-400" />

            <h3 className="mt-4 text-lg font-semibold text-white">
              Select at least 2 destinations
            </h3>

            <p className="mt-2 text-sm text-white/50">
              Choose another destination above to start comparing.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">
            <Card
                variant="glass"
                padding="none"
                className="overflow-hidden"
              >

            <table className="w-full min-w-[650px] border-collapse text-left">

            <thead>

              <tr className="border-b border-white/10">

                {/* Comparison Column */}

                <th className="w-40 bg-[#173B3B] p-5 text-xs font-medium uppercase tracking-wider text-white/50">
                  Comparison
                </th>

                {/* Destination Columns */}

                {selectedDestinations.map((destination) => (

                  <th
                    key={destination.id}
                    className="min-w-56 p-4"
                  >

                    <div className="flex items-center gap-3">

                      {/* Destination Image */}

                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="h-14 w-14 shrink-0 rounded-xl object-cover"
                      />

                      {/* Destination Information */}

                      <div className="min-w-0 text-left">

                        <p className="truncate font-semibold text-white">
                          {destination.name}
                        </p>

                        <p className="mt-1 text-xs font-normal text-white/50">
                          {destination.country}
                        </p>

                        <span className="mt-2 inline-block rounded-full bg-orange-500/15 px-2 py-1 text-[10px] text-orange-300">
                          {destination.category}
                        </span>

                      </div>

                      {/* Remove Destination */}

                      {/* Remove Destination */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          aria-label={`Remove ${destination.name}`}
                          onClick={() => toggleDestination(destination.id)}
                          className="ml-auto rounded-full p-1.5 text-white/40 transition hover:bg-red-400/10 hover:text-red-400"
                        >
                          <X size={15} />
                        </Button>

                    </div>

                  </th>

                ))}

                </tr>

              </thead>

              <tbody className="divide-y divide-white/10">

                {/* Budget Comparison */}

                    <tr>

                      <td className="p-5">

                        <span className="flex items-center gap-2 text-sm text-white/60">
                          <Wallet size={16} />
                          Estimated Budget
                        </span>

                      </td>

                      {selectedDestinations.map((destination) => {

                        const isLowest = destination.budget === lowestBudget;

                        const budgetWidth =
                          highestBudget > 0
                            ? (destination.budget / highestBudget) * 100
                            : 0;

                        return (

                          <td key={destination.id} className="p-5">

                            {/* Budget Amount */}

                            <div className="flex items-center justify-between gap-2">

                              <span className={`text-base font-bold ${
                                isLowest ? "text-emerald-300" : "text-white"
                              }`}>
                                ₹{destination.budget.toLocaleString("en-IN")}
                              </span>

                              {isLowest && (
                                <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[10px] text-emerald-300">
                                  Lowest
                                </span>
                              )}

                            </div>

                            {/* Budget Comparison Bar */}

                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  isLowest ? "bg-emerald-400" : "bg-orange-400"
                                }`}
                                style={{
                                  width: `${budgetWidth}%`,
                                }}
                              />

                            </div>

                            <p className="mt-2 text-[10px] text-white/40">
                              {budgetWidth.toFixed(0)}% of highest selected budget
                            </p>

                          </td>

                        );
                      })}

                    </tr>
                {/* Duration */}

                <tr>

                  <td className="p-5">
                    <span className="flex items-center gap-2 text-sm text-white/60">
                      <CalendarDays size={16} />
                      Duration
                    </span>
                  </td>

                  {selectedDestinations.map((destination) => (

                    <td key={destination.id} className="p-5 text-sm text-white/80">
                      {destination.duration}
                    </td>

                  ))}

                </tr>

                {/* Category */}

                <tr>

                  <td className="p-5">
                    <span className="flex items-center gap-2 text-sm text-white/60">
                      <Compass size={16} />
                      Category
                    </span>
                  </td>

                  {selectedDestinations.map((destination) => (

                    <td key={destination.id} className="p-5 text-sm text-white/80">
                      {destination.category}
                    </td>

                  ))}

                </tr>

                {/* Rating */}

                <tr>

                  <td className="p-5">
                    <span className="flex items-center gap-2 text-sm text-white/60">
                      <Star size={16} />
                      Rating
                    </span>
                  </td>

                  {selectedDestinations.map((destination) => (

                    <td key={destination.id} className="p-5">

                      <span
                        className={`font-semibold ${
                          destination.rating === highestRating
                            ? "text-orange-300"
                            : "text-white"
                        }`}
                      >
                        ★ {destination.rating}/5
                      </span>

                      {destination.rating === highestRating && (

                        <span className="ml-2 text-[10px] text-orange-300">
                          Top rated
                        </span>

                      )}

                    </td>

                  ))}

                </tr>

                {/* Best For */}

                <tr>

                  <td className="p-5 text-sm text-white/60">
                    Best For
                  </td>

                  {selectedDestinations.map((destination) => (

                    <td key={destination.id} className="p-5 text-sm text-white/80">
                      {destination.bestFor}
                    </td>

                  ))}

                </tr>

                {/* Activities */}

                <tr>

                  <td className="p-5 text-sm text-white/60">
                    Activities
                  </td>

                  {selectedDestinations.map((destination) => (

                    <td key={destination.id} className="p-5">

                      <div className="flex flex-wrap gap-2">

                        {destination.activities.map((activity) => (

                          <span
                            key={activity}
                            className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] text-white/70"
                          >
                            {activity}
                          </span>

                        ))}

                      </div>

                    </td>

                  ))}

                </tr>

              </tbody>

            </table>
            </Card>

          </div>

        )}

      </section>

      {/* Information */}

      <p className="mt-5 text-xs leading-5 text-white/40">
        All destination budgets, ratings and travel durations are
        illustrative sample data. Actual costs may vary depending
        on travel dates, accommodation and personal preferences.
      </p>

    </div>
  );
}

export default CompareDestinations;