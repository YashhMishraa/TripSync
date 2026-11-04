import { useEffect, useMemo, useState } from "react";
import type { Trip, TripStatus } from "../types/trip";
import {
  readTrips,
  saveTrips,
} from "../utils/tripStorage";
import PageHeader from "../components/PageHeader";

import {
  CalendarDays,
  MapPin,
  Users,
  Wallet,
  Clock,
  Search,
  ArrowUpRight,
  CheckCircle2,
  Bookmark,
  Plane,
  ChevronDown,
  X,
} from "lucide-react";





const initialTrips: Trip[] = [
  {
    id: 1,
    name: "Manali Mountain Escape",
    country: "India",
    status: "Upcoming",
    startDate: "November 18, 2026",
    duration: "5 days",
    travelers: 2,
    budget: 18000,
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=85",
    activities: ["Trekking", "Sightseeing", "Adventure"],
    itinerary: [
      "Day 1: Arrival and local sightseeing",
      "Day 2: Solang Valley exploration",
      "Day 3: Mountain trekking",
      "Day 4: Local markets and cafes",
      "Day 5: Return journey",
    ],
  },
  {
    id: 2,
    name: "Goa Beach Holiday",
    country: "India",
    status: "Upcoming",
    startDate: "December 10, 2026",
    duration: "4 days",
    travelers: 3,
    budget: 25000,
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=85",
    activities: ["Beaches", "Water Sports", "Food"],
    itinerary: [
      "Day 1: Arrival and beach visit",
      "Day 2: Water sports and sightseeing",
      "Day 3: Explore local markets",
      "Day 4: Departure",
    ],
  },
  {
    id: 3,
    name: "Jaipur Heritage Tour",
    country: "India",
    status: "Completed",
    startDate: "October 10, 2026",
    duration: "3 days",
    travelers: 2,
    budget: 12000,
    image:
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=900&q=85",
    activities: ["Fort Tours", "Shopping", "Local Food"],
    itinerary: [
      "Day 1: Amber Fort and local sightseeing",
      "Day 2: Hawa Mahal and City Palace",
      "Day 3: Shopping and return journey",
    ],
  },
  {
    id: 4,
    name: "Bali Tropical Getaway",
    country: "Indonesia",
    status: "Saved",
    startDate: "Date not selected",
    duration: "7 days",
    travelers: 2,
    budget: 65000,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85",
    activities: ["Beaches", "Temples", "Waterfalls"],
    itinerary: [
      "Day 1: Explore Ubud",
      "Day 2: Visit rice terraces",
      "Day 3: Beach exploration",
      "Day 4: Temple visits",
      "Day 5: Waterfall exploration",
      "Day 6: Leisure activities",
      "Day 7: Departure",
    ],
  },
];

const filters = [
  "All Trips",
  "Upcoming",
  "Completed",
  "Saved",
] as const;

type TripFilter = (typeof filters)[number];

function MyTrips() {
  const [trips, setTrips] = useState<Trip[]>(() =>
  readTrips(initialTrips)
);

    useEffect(() => {
    try {
      saveTrips(trips);
    } catch {
      console.error("Unable to save trips.");
    }
  }, [trips]);
  const [activeFilter, setActiveFilter] =
    useState<TripFilter>("All Trips");
  const [search, setSearch] = useState("");
  const [expandedTrip, setExpandedTrip] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

const [tripToDelete, setTripToDelete] = useState<number | null>(null);

const [editError, setEditError] = useState("");

  const filteredTrips = useMemo(() => {
    const query = search.toLowerCase().trim();

    return trips.filter((trip) => {
      const matchesSearch =
        trip.name.toLowerCase().includes(query) ||
        trip.country.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "All Trips" ||
        trip.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [trips, activeFilter, search]);

  const updateTripStatus = (id: number, status: TripStatus) => {
    setTrips((previous) =>
      previous.map((trip) =>
        trip.id === id ? { ...trip, status } : trip
      )
    );

    setMessage(
      status === "Completed"
        ? "Trip marked as completed in this demo."
        : "Trip updated successfully."
    );
  };
  // Save edited trip details

const saveTripEdits = () => {
  if (!editingTrip) return;

  if (!editingTrip.name.trim()) {
    setEditError("Please enter a trip name.");
    return;
  }

  if (!Number.isFinite(editingTrip.budget) || editingTrip.budget < 0) {
    setEditError("Please enter a valid budget.");
    return;
  }

  if (
  editingTrip.budgetLimit !== undefined &&
  (!Number.isFinite(editingTrip.budgetLimit) ||
    editingTrip.budgetLimit < 0)
) {
  setEditError("Please enter a valid total budget.");
  return;
}

  if (
    !Number.isInteger(editingTrip.travelers) ||
    editingTrip.travelers < 1
  ) {
    setEditError("At least one traveller is required.");
    return;
  }

  setTrips((previous) =>
    previous.map((trip) =>
      trip.id === editingTrip.id ? editingTrip : trip
    )
    );

      setEditingTrip(null);
      setEditError("");

      setMessage("Trip details updated successfully!");
};

  // Request deletion confirmation

const removeSavedTrip = (id: number) => {
  setTripToDelete(id);
};

// Confirm deletion

const confirmRemoveSavedTrip = () => {
  if (tripToDelete === null) return;

  setTrips((previous) =>
    previous.filter((trip) => trip.id !== tripToDelete)
  );

  setExpandedTrip(null);
  setTripToDelete(null);

  setMessage("Trip deleted successfully!");
};

  const getStatusConfig = (status: TripStatus) => {
    switch (status) {
      case "Upcoming":
        return {
          label: "Upcoming Journey",
          icon: Plane,
          style: "border-sky-400/30 bg-sky-400/15 text-sky-300",
        };

      case "Completed":
        return {
          label: "Completed",
          icon: CheckCircle2,
          style: "border-emerald-400/30 bg-emerald-400/15 text-emerald-300",
        };

      case "Saved":
        return {
          label: "Saved Plan",
          icon: Bookmark,
          style: "border-orange-400/30 bg-orange-400/15 text-orange-300",
        };
    }
  };

  const upcomingCount = trips.filter(
    (trip) => trip.status === "Upcoming"
  ).length;

  const completedCount = trips.filter(
    (trip) => trip.status === "Completed"
  ).length;

  const savedCount = trips.filter(
    (trip) => trip.status === "Saved"
  ).length;

      // Budget Overview

    const tripsWithBudget = trips.filter(
      (trip) =>
        typeof trip.budgetLimit === "number" &&
        Number.isFinite(trip.budgetLimit) &&
        Number.isFinite(trip.budget)
    );

    const totalEstimatedCost = tripsWithBudget.reduce(
      (total, trip) => total + trip.budget,
      0
    );

    const totalTravelBudget = tripsWithBudget.reduce(
      (total, trip) => total + (trip.budgetLimit ?? 0),
      0
    );

    const remainingBudget = totalTravelBudget - totalEstimatedCost;

    const budgetUsedPercentage =
      totalTravelBudget > 0
        ? Math.min(
            (totalEstimatedCost / totalTravelBudget) * 100,
            100
          )
        : 0;

  return (
    <div className="p-4 md:p-7">

      {/* Page Heading */}

      <PageHeader
        eyebrow="YOUR TRAVEL JOURNEY"
        title="My Trips"
        description="Manage your upcoming adventures, revisit your previous journeys and keep track of your saved travel plans."
      />

      {/* Trip Statistics */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">Upcoming Trips</p>
            <Plane size={20} className="text-sky-300" />
          </div>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {upcomingCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">Completed Trips</p>
            <CheckCircle2 size={20} className="text-emerald-300" />
          </div>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {completedCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">Saved Trips</p>
            <Bookmark size={20} className="text-orange-300" />
          </div>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {savedCount}
          </h2>
        </div>

      </div>
                {/* Budget Overview */}

          <section className="mb-8 rounded-[26px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl md:p-6">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Travel Budget Overview
                </h2>

                <p className="mt-1 text-xs text-white/50">
                  Your combined trip expenses and budget allocation
                </p>
              </div>

              <div className="rounded-xl bg-orange-500/15 p-3 text-orange-400">
                <Wallet size={22} />
              </div>

            </div>

            {tripsWithBudget.length > 0 ? (

              <>

                {/* Budget Statistics */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

                    <p className="text-xs text-white/50">
                      Estimated Trip Cost
                    </p>

                    <p className="mt-2 text-2xl font-bold text-white">
                      ₹{totalEstimatedCost.toLocaleString("en-IN")}
                    </p>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

                    <p className="text-xs text-white/50">
                      Total Travel Budget
                    </p>

                    <p className="mt-2 text-2xl font-bold text-orange-300">
                      ₹{totalTravelBudget.toLocaleString("en-IN")}
                    </p>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

                    <p className="text-xs text-white/50">
                      Remaining Budget
                    </p>

                    <p className={`mt-2 text-2xl font-bold ${
                      remainingBudget >= 0
                        ? "text-emerald-300"
                        : "text-red-300"
                    }`}>
                      ₹{Math.abs(remainingBudget).toLocaleString("en-IN")}
                    </p>

                    {remainingBudget < 0 && (
                      <p className="mt-1 text-xs text-red-300">
                        Amount exceeding your combined budget
                      </p>
                    )}

                  </div>

                </div>

                {/* Budget Utilization */}

                <div className="mt-7">

                  <div className="mb-3 flex items-center justify-between">

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Budget Utilization
                      </h3>

                      <p className="mt-1 text-xs text-white/50">
                        Estimated expenses compared with your total budget
                      </p>
                    </div>

                    <span className="rounded-full bg-orange-500/15 px-3 py-1.5 text-xs font-semibold text-orange-300">
                      {budgetUsedPercentage.toFixed(1)}%
                    </span>

                  </div>

                  <div
                    className="h-3 overflow-hidden rounded-full bg-white/15"
                    role="progressbar"
                    aria-label="Travel budget utilization"
                    aria-valuenow={Number(budgetUsedPercentage.toFixed(1))}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >

                    <div
                      className="h-full rounded-full bg-orange-400 transition-all duration-700"
                      style={{
                        width: `${budgetUsedPercentage}%`,
                      }}
                    />

                  </div>

                  <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-white/50">

                    <span>
                      {tripsWithBudget.length} trips with recorded budgets
                    </span>

                    <span>
                      {Math.max(0, 100 - budgetUsedPercentage).toFixed(1)}% budget remaining
                    </span>

                  </div>

                </div>

              </>

            ) : (

              <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center">

                <Wallet size={28} className="mx-auto text-orange-400" />

                <h3 className="mt-3 font-semibold text-white">
                  No Budget Information Yet
                </h3>

                <p className="mt-2 text-xs leading-5 text-white/50">
                  Add an original budget to your trips using Edit Trip
                  to see your combined travel expenses.
                </p>

              </div>

            )}

          </section>

      {/* Search */}

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3">

        <Search size={19} className="text-white/50" />

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search your trips or destinations..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        />

      </div>

      {/* Filters */}

      <div className="mb-6 flex flex-wrap gap-3">

        {filters.map((filter) => (

          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              activeFilter === filter
                ? "border-orange-400 bg-orange-500 text-white"
                : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {filter}
          </button>

        ))}

      </div>

      {/* Feedback */}

      {message && (
        <div
          role="status"
          className="mb-5 flex items-center justify-between rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
        >
          {message}

          <button
            type="button"
            aria-label="Dismiss message"
            onClick={() => setMessage("")}
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* Trip List Heading */}

      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">
          {activeFilter === "All Trips" ? "All Your Trips" : activeFilter}
        </h2>

        <p className="mt-1 text-xs text-white/50">
          {filteredTrips.length} trips found
        </p>
      </div>

      {/* Trip Cards */}

      {filteredTrips.length > 0 ? (

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {filteredTrips.map((trip) => {

            const isExpanded = expandedTrip === trip.id;

            return (

              <article
                key={trip.id}
                className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 transition hover:border-white/30"
              >

                {/* Destination Image */}

                <div className="relative h-48 overflow-hidden">

                  <img
                    src={trip.image}
                    alt={trip.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {(() => {
                      const status = getStatusConfig(trip.status);
                      const StatusIcon = status.icon;

                      return (
                        <span
                          className={`absolute left-4 top-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${status.style}`}
                        >
                          <StatusIcon size={14} />
                          {status.label}
                        </span>
                      );
                    })()}

                  <h3 className="absolute bottom-4 left-5 text-xl font-bold text-white">
                    {trip.name}
                  </h3>

                </div>

                {/* Trip Information */}

                <div className="p-5">

                  <div className="grid grid-cols-2 gap-5">

                    <div className="flex items-center gap-2">
                      <MapPin size={17} className="text-orange-400" />

                      <div>
                        <p className="text-[11px] text-white/45">
                          Destination
                        </p>

                        <p className="text-sm text-white">
                          {trip.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays size={17} className="text-orange-400" />

                      <div>
                        <p className="text-[11px] text-white/45">
                          Start Date
                        </p>

                        <p className="text-sm text-white">
                          {trip.startDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={17} className="text-orange-400" />

                      <div>
                        <p className="text-[11px] text-white/45">
                          Duration
                        </p>

                        <p className="text-sm text-white">
                          {trip.duration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={17} className="text-orange-400" />

                      <div>
                        <p className="text-[11px] text-white/45">
                          Travellers
                        </p>

                        <p className="text-sm text-white">
                          {trip.travelers} People
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Budget */}

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">

                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">

                        {/* Estimated Trip Cost */}

                        <div>
                          <p className="text-[11px] text-white/45">
                            Estimated Trip Cost
                          </p>

                          <p className="mt-1 font-semibold text-orange-300">
                            ₹{trip.budget.toLocaleString("en-IN")}
                          </p>
                        </div>

                        {/* Original Budget */}

                        <div>
                          <p className="text-[11px] text-white/45">
                            Your Budget
                          </p>

                          <p className="mt-1 font-semibold text-white">
                            {trip.budgetLimit !== undefined
                              ? `₹${trip.budgetLimit.toLocaleString("en-IN")}`
                              : "Not recorded"}
                          </p>
                        </div>

                        {/* Remaining Budget */}

                        {trip.budgetLimit !== undefined && (
                          <div className="col-span-2">

                            <p className="text-[11px] text-white/45">
                              Remaining Budget
                            </p>

                            <p className={`mt-1 font-semibold ${
                              trip.budgetLimit >= trip.budget
                                ? "text-emerald-300"
                                : "text-red-300"
                            }`}>
                              ₹{(trip.budgetLimit - trip.budget).toLocaleString("en-IN")}
                            </p>

                          </div>
                        )}

                      </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedTrip(isExpanded ? null : trip.id)
                      }
                      aria-expanded={isExpanded}
                      className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-xs text-white transition hover:border-orange-400 hover:text-orange-300"
                    >
                      {isExpanded ? "Hide Itinerary" : "View Itinerary"}

                      <ChevronDown
                        size={15}
                        className={`transition ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                  </div>

                  {/* Expanded Itinerary */}

                    {isExpanded && (

                      <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-5">

                        <div className="mb-5 flex items-center justify-between">

                          <div>
                            <h4 className="text-base font-semibold text-white">
                              Your Travel Itinerary
                            </h4>

                            <p className="mt-1 text-xs text-white/50">
                              {trip.duration} · {trip.itinerary.length} planned activities
                            </p>
                          </div>

                          <CalendarDays size={20} className="text-orange-400" />

                        </div>

                        {/* Timeline */}

                        <div className="relative space-y-5">

                          {trip.itinerary.map((activity, index) => (

                            <div key={`${trip.id}-${index}`} className="relative flex gap-4">

                              {/* Timeline Line */}

                              {index !== trip.itinerary.length - 1 && (
                                <div className="absolute left-[14px] top-8 h-full w-px bg-white/15" />
                              )}

                              {/* Day Indicator */}

                              <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-orange-400/40 bg-[#173B3B] text-xs font-semibold text-orange-300">
                                {index + 1}
                              </div>

                              {/* Activity Details */}

                              <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-3">

                                <p className="text-xs font-semibold text-orange-300">
                                  DAY {index + 1}
                                </p>

                                <p className="mt-2 text-sm leading-5 text-white/80">
                                  {activity.replace(/^Day \d+:\s*/, "")}
                                </p>

                              </div>

                            </div>

                          ))}

                        </div>

                        {/* Activities */}

                        <div className="mt-6 border-t border-white/10 pt-5">

                          <h5 className="mb-3 text-sm font-semibold text-white">
                            Trip Activities
                          </h5>

                          <div className="flex flex-wrap gap-2">

                            {trip.activities.map((activity) => (

                              <span
                                key={activity}
                                className="rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-2 text-xs text-orange-300"
                              >
                                {activity}
                              </span>

                            ))}

                          </div>

                        </div>

                      </div>

                    )}
                  {/* Actions */}

                  <div className="mt-5 flex flex-wrap gap-3">

                    {trip.status === "Upcoming" && (

                      <button
                        type="button"
                        onClick={() =>
                          updateTripStatus(trip.id, "Completed")
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-xs font-semibold text-white transition hover:bg-orange-400"
                      >
                        <CheckCircle2 size={15} />
                        Mark as Completed
                      </button>

                    )}

                    {trip.status === "Saved" && (

                      <button
                        type="button"
                        onClick={() =>
                          updateTripStatus(trip.id, "Upcoming")
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-xs font-semibold text-white transition hover:bg-orange-400"
                      >
                        <Plane size={15} />
                        Move to Upcoming
                      </button>

                    )}

                    {trip.status === "Completed" && (

                      <span className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-400/10 px-4 py-3 text-xs font-medium text-emerald-300">
                        <CheckCircle2 size={15} />
                        Journey Completed
                      </span>

                    )}

                    {trip.status === "Saved" && (

                      <button
                        type="button"
                        onClick={() => removeSavedTrip(trip.id)}
                        className="rounded-xl border border-red-400/30 px-4 py-3 text-xs text-red-300 transition hover:bg-red-400/10"
                      >
                        Remove
                      </button>

                    )}

                    <button
                      type="button"
                      aria-label={`View details for ${trip.name}`}
                      className="rounded-xl border border-white/20 px-4 py-3 text-white/70 transition hover:bg-white/10"
                    >
                      <ArrowUpRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTrip({ ...trip });
                        setEditError("");
                      }}
                      className="rounded-xl border border-white/20 px-4 py-3 text-xs text-white/80 transition hover:border-orange-400 hover:text-orange-300"
                    >
                      Edit Trip
                    </button>

                  </div>

                </div>

              </article>

            );
          })}

        </div>

      ) : (

        <div className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center">

          <Plane size={36} className="mx-auto text-orange-400" />

          <h3 className="mt-4 text-lg font-semibold text-white">
            No trips found
          </h3>

          <p className="mt-2 text-sm text-white/50">
            Try another search or select a different filter.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveFilter("All Trips");
            }}
            className="mt-5 text-sm font-semibold text-orange-400 hover:text-orange-300"
          >
            Clear Filters
          </button>

        </div>

      )}

      <p className="mt-6 text-xs text-white/40">
        All trips are illustrative demo data. Changes made here are
        stored only in the current frontend session and are not saved
        permanently.
      </p>

      {/* Edit Trip Modal */}

  {editingTrip && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/20 bg-[#173B3B] p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-white">
              Edit Trip Details
            </h2>

            <p className="mt-1 text-xs text-white/50">
              Update your travel information.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close edit form"
            onClick={() => {
              setEditingTrip(null);
              setEditError("");
            }}
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X size={19} />
          </button>

        </div>

        <div className="space-y-4">

          {/* Trip Name */}

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Trip Name
            </label>

            <input
              type="text"
              value={editingTrip.name}
              onChange={(event) =>
                setEditingTrip({
                  ...editingTrip,
                  name: event.target.value,
                })
              }
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
            />
          </div>

          {/* Country */}

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Country
            </label>

            <input
              type="text"
              value={editingTrip.country}
              onChange={(event) =>
                setEditingTrip({
                  ...editingTrip,
                  country: event.target.value,
                })
              }
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
            />
          </div>

          {/* Start Date */}

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Start Date
            </label>

            <input
              type="text"
              value={editingTrip.startDate}
              placeholder="e.g. 18 Nov 2026"
              onChange={(event) =>
                setEditingTrip({
                  ...editingTrip,
                  startDate: event.target.value,
                })
              }
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
            />
          </div>

          {/* Duration */}

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Duration
            </label>

            <input
              type="text"
              value={editingTrip.duration}
              onChange={(event) =>
                setEditingTrip({
                  ...editingTrip,
                  duration: event.target.value,
                })
              }
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
            />
          </div>

          {/* Travellers */}

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Number of Travellers
            </label>

            <input
              type="number"
              min="1"
              value={editingTrip.travelers}
              onChange={(event) =>
                setEditingTrip({
                  ...editingTrip,
                  travelers: Number(event.target.value),
                })
              }
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
            />
          </div>

          {/* Budget */}

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Estimated Budget (₹)
            </label>

            <input
              type="number"
              min="0"
              value={editingTrip.budget}
              onChange={(event) =>
                setEditingTrip({
                  ...editingTrip,
                  budget: Number(event.target.value),
                })
              }
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
            />
          </div>
          {/* Original Budget Limit */}

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Your Total Budget (₹)
              </label>

              <input
                type="number"
                min="0"
                value={editingTrip.budgetLimit ?? ""}
                onChange={(event) =>
                  setEditingTrip({
                    ...editingTrip,
                    budgetLimit:
                      event.target.value === ""
                        ? undefined
                        : Number(event.target.value),
                  })
                }
                placeholder="Enter your original budget"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
              />
            </div>

        </div>

        {/* Validation Error */}

        {editError && (
          <p className="mt-4 text-sm text-red-300" role="alert">
            {editError}
          </p>
        )}

        {/* Action Buttons */}

        <div className="mt-7 flex gap-3">

          <button
            type="button"
            onClick={() => {
              setEditingTrip(null);
              setEditError("");
            }}
            className="flex-1 rounded-xl border border-white/20 py-3 text-sm text-white/70 hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={saveTripEdits}
            className="flex-1 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  )}  
  {/* Delete Confirmation Modal */}

  {tripToDelete !== null && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-[#173B3B] p-7 shadow-2xl">

      {/* Delete Icon */}

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-red-400">
        <X size={26} />
      </div>

      {/* Heading */}

      <h2 className="mt-5 text-center text-xl font-bold text-white">
        Delete this trip?
      </h2>

      <p className="mt-3 text-center text-sm leading-6 text-white/60">
        Are you sure you want to remove this saved trip?
        This action cannot be undone.
      </p>

      {/* Action Buttons */}

      <div className="mt-7 flex gap-3">

        {/* Cancel */}

        <button
          type="button"
          onClick={() => setTripToDelete(null)}
          className="flex-1 rounded-xl border border-white/20 py-3 text-sm text-white/70 hover:bg-white/10"
        >
          Cancel
        </button>

        {/* Confirm Delete */}

        <button
          type="button"
          onClick={confirmRemoveSavedTrip}
          className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
        >
          Delete Trip
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}

export default MyTrips;