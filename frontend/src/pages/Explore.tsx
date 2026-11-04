import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import useLocalStorageState from "../hooks/useLocalStorageState";
import PageHeader from "../components/PageHeader";
import DestinationDetailsModal from "../components/DestinationDetailsModal";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import {
  destinations,
  type Destination,
} from "../data/destinations";

import {
  Search,
  MapPin,
  Heart,
  Star,
  ArrowLeftRight,
  Check,
} from "lucide-react";



const categories = [
  "All",
  "Nature",
  "Beach",
  "Culture",
  "Adventure",
];
const COMPARE_STORAGE_KEY = "tripsync-compare-destinations";

type Category = (typeof categories)[number];

type SortOption = "recommended" | "budget-low" | "rating-high";

function Explore() {
    const navigate = useNavigate();

  const [compareNames, setCompareNames] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(COMPARE_STORAGE_KEY);

      if (!saved) return [];

      const parsed: unknown = JSON.parse(saved);

      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === "string")
        : [];

    } catch {
      return [];
    }
  });

  const [compareMessage, setCompareMessage] = useState("");

  const [searchParams] = useSearchParams();

  const queryFromUrl = searchParams.get("search") ?? "";

  const [search, setSearch] = useState(queryFromUrl);

  useEffect(() => {
    setSearch(queryFromUrl);
  }, [queryFromUrl]);
    const [category, setCategory] = useState<Category>("All");
    const [sortBy, setSortBy] = useState<SortOption>("recommended");
    const [budgetFilter, setBudgetFilter] = useState("all");

const [durationFilter, setDurationFilter] = useState("all");
    const [favorites, setFavorites] = useLocalStorageState<number[]>(
      "tripsync-explore-favorites",
        [1, 3]
  );
  const [selectedDestination, setSelectedDestination] =
  useState<Destination | null>(null);

  // Toggle destination comparison

const toggleCompare = (destinationName: string) => {
  setCompareMessage("");

  let updated: string[];

  if (compareNames.includes(destinationName)) {
    updated = compareNames.filter(
      (name) => name !== destinationName
    );
  } else {
    if (compareNames.length >= 3) {
      setCompareMessage(
        "You can compare a maximum of 3 destinations."
      );
      return;
    }

    updated = [...compareNames, destinationName];
  }

  setCompareNames(updated);

  localStorage.setItem(
    COMPARE_STORAGE_KEY,
    JSON.stringify(updated)
  );
};

const openComparison = () => {
  if (compareNames.length < 2) {
    setCompareMessage(
      "Select at least 2 destinations to compare."
    );
    return;
  }

  navigate("/compare");
};

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    const query = search.toLowerCase().trim();

    const results = destinations.filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(query) ||
        destination.country.toLowerCase().includes(query);

      const matchesCategory =
          category === "All" || destination.category === category;

        // Budget Filter

        let matchesBudget = true;

        if (budgetFilter === "under-20000") {
          matchesBudget = destination.budget < 20000;
        }

        if (budgetFilter === "20000-50000") {
          matchesBudget =
            destination.budget >= 20000 &&
            destination.budget <= 50000;
        }

        if (budgetFilter === "above-50000") {
          matchesBudget = destination.budget > 50000;
        }

        // Duration Filter

        const minimumDays = Number(
          destination.duration.match(/\d+/)?.[0] ?? 0
        );

        let matchesDuration = true;

        if (durationFilter === "short") {
          matchesDuration = minimumDays <= 4;
        }

        if (durationFilter === "long") {
          matchesDuration = minimumDays >= 5;
        }

        return (
          matchesSearch &&
          matchesCategory &&
          matchesBudget &&
          matchesDuration
        );
    });

    if (sortBy === "budget-low") {
      results.sort((a, b) => a.budget - b.budget);
    }

    if (sortBy === "rating-high") {
      results.sort((a, b) => b.rating - a.rating);
    }

    return results;
      }, [
      search,
      category,
      sortBy,
      budgetFilter,
      durationFilter,
    ]);

  // Toggle favorite destinations

  const toggleFavorite = (id: number) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  return (
    <div className="p-4 md:p-7">

      <PageHeader
        eyebrow="DISCOVER THE WORLD"
        title="Explore Destinations"
        description="Discover amazing places, explore new experiences and find destinations that match your travel preferences."
      />
    
      {/* Search and Sorting */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row">

        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">

          <Search size={19} className="text-white/50" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search destinations or countries..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />

        </div>

        <select
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value as SortOption)
          }
          aria-label="Sort destinations"
          className="rounded-2xl border border-white/15 bg-[#173B3B] px-4 py-3 text-sm text-white outline-none"
        >
          <option value="recommended">Recommended</option>
          <option value="budget-low">Lowest Budget</option>
          <option value="rating-high">Highest Rated</option>
        </select>

      </div>

      {/* Category Filters */}

      <div className="mb-8 flex flex-wrap gap-3">

        {categories.map((item) => (

          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              category === item
                ? "border-orange-400 bg-orange-500 text-white"
                : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {item}
          </button>

        ))}

      </div>
                {/* Advanced Filters */}

          <div className="mb-7 rounded-2xl border border-white/15 bg-white/5 p-4">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="text-sm font-semibold text-white">
                Advanced Filters
              </h3>

              <button
                type="button"
                onClick={() => {
                  setBudgetFilter("all");
                  setDurationFilter("all");
                  setCategory("All");
                  setSearch("");
                  setSortBy("recommended");
                }}
                className="text-xs font-medium text-orange-400 transition hover:text-orange-300"
              >
                Clear All Filters
              </button>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Budget Filter */}

              <div>

                <label
                  htmlFor="budget-filter"
                  className="mb-2 block text-xs text-white/60"
                >
                  Estimated Budget
                </label>

                <select
                  id="budget-filter"
                  value={budgetFilter}
                  onChange={(event) => setBudgetFilter(event.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-[#173B3B] px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
                >

                  <option value="all">Any Budget</option>

                  <option value="under-20000">
                    Under ₹20,000
                  </option>

                  <option value="20000-50000">
                    ₹20,000 – ₹50,000
                  </option>

                  <option value="above-50000">
                    Above ₹50,000
                  </option>

                </select>

              </div>

              {/* Duration Filter */}

              <div>

                <label
                  htmlFor="duration-filter"
                  className="mb-2 block text-xs text-white/60"
                >
                  Travel Duration
                </label>

                <select
                  id="duration-filter"
                  value={durationFilter}
                  onChange={(event) => setDurationFilter(event.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-[#173B3B] px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
                >

                  <option value="all">Any Duration</option>

                  <option value="short">
                    Up to 4 days
                  </option>

                  <option value="long">
                    5 days or more
                  </option>

                </select>

              </div>

            </div>

          </div>

      {/* Results Header */}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Popular Destinations
          </h2>

          <p className="mt-1 text-xs text-white/50">
            {filteredDestinations.length} destinations found
          </p>
        </div>

        <button
          type="button"
          onClick={openComparison}
          disabled={compareNames.length < 2}
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeftRight size={17} />

          Compare Selected ({compareNames.length}/3)
        </button>

      </div>

      {compareMessage && (
        <p role="alert" className="mb-4 text-sm text-orange-300">
          {compareMessage}
        </p>
      )}

      {/* Destination Cards */}

      {filteredDestinations.length > 0 ? (

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {filteredDestinations.map((destination) => {

            const isFavorite = favorites.includes(destination.id);
            const isSelectedForCompare = compareNames.includes(
              destination.name
              );

              return (

              <Card
                  variant="glass"
                  padding="none"
                  className="group overflow-hidden transition duration-300 hover:-translate-y-1"
                >

                {/* Destination Image */}

                <div className="relative h-52 overflow-hidden">

                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Category */}

                  <span className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                    {destination.category}
                  </span>

                  {/* Favorite */}

                  <button
                    type="button"
                    onClick={() => toggleFavorite(destination.id)}
                    aria-label={
                      isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    aria-pressed={isFavorite}
                    className="absolute right-4 top-4 rounded-full bg-black/40 p-2.5 text-white backdrop-blur-md transition hover:bg-black/60"
                  >

                    <Heart
                      size={18}
                      fill={isFavorite ? "#FF9654" : "none"}
                      color={isFavorite ? "#FF9654" : "white"}
                    />

                  </button>

                </div>

                {/* Destination Information */}

                <div className="flex flex-1 flex-col p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {destination.name}
                      </h3>

                      <p className="mt-1 flex items-center gap-1 text-xs text-white/50">
                        <MapPin size={13} />
                        {destination.country}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-orange-300">

                      <Star size={15} fill="currentColor" />

                      {destination.rating}

                    </div>

                  </div>

                  <p className="mt-4 min-h-[3.75rem] line-clamp-3 text-xs leading-5 text-white/60">
                    {destination.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">

                    <div>
                      <p className="text-[11px] text-white/45">
                        Estimated budget
                      </p>

                      <p className="mt-1 font-semibold text-orange-300">
                        ₹{destination.budget.toLocaleString("en-IN")}
                      </p>
                    </div>

                      <div className="text-right">
                            <p className="text-[11px] text-white/45">
                              Duration
                            </p>

                            <p className="mt-1 text-sm text-white/80">
                              {destination.duration}
                            </p>
                        </div>
                        </div>

                        
                      <div className="mt-auto grid grid-cols-2 gap-2 pt-5">

                        {/* View Details Button */}

                        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">

                            <Button variant="primary" size="sm">
                                View Details
                              </Button>

                            <button
                              type="button"
                              onClick={() => toggleCompare(destination.name)}
                              aria-pressed={isSelectedForCompare}
                              className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-xs font-medium transition ${
                                isSelectedForCompare
                                  ? "border-orange-400 bg-orange-500/20 text-orange-300"
                                  : "border-white/20 text-white/80 hover:border-orange-400 hover:text-orange-300"
                              }`}
                            >
                              {isSelectedForCompare ? <Check size={15} /> : <ArrowLeftRight size={15} />}

                              {isSelectedForCompare ? "Added" : "Compare"}

                            </button>

                          </div>

                        {/* Compare Button */}

                        <Button variant="secondary" size="sm">
                            Compare
                          </Button>

                      </div>
                      </div>

              </Card>

            );
          })}

        </div>

      ) : (

        <div className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center">

          <Search size={35} className="mx-auto text-white/40" />

          <h3 className="mt-4 text-lg font-semibold text-white">
            No destinations found
          </h3>

          <p className="mt-2 text-sm text-white/50">
            Try another search term or category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="mt-5 text-sm font-semibold text-orange-400 hover:text-orange-300"
          >
            Clear Filters
          </button>
          
        </div>
      
      )}

      {/* Disclaimer */}

      <p className="mt-6 text-xs text-white/40">
        Destination budgets and ratings are illustrative sample data,
        not live travel quotes.
      </p>

      {/* Destination Details Modal */}

      <DestinationDetailsModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />

    </div>
  );
}

export default Explore;