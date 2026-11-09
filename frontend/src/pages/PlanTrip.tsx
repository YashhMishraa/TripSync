import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import type { Trip } from "../types/trip";
import { addTrip } from "../utils/tripStorage";
import PageHeader from "../components/PageHeader";
import {
  destinations,
  type Destination,
} from "../data/destinations";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";


import {
  CalendarDays,
  MapPin,
  Users,
  Wallet,
  Compass,
  Sparkles,
  CheckCircle2,
  Plane,
  Hotel,
  Utensils,
  Car,
  Clock,
} from "lucide-react";

const activityOptions = [
  "Sightseeing",
  "Adventure Sports",
  "Food & Culture",
  "Nature & Wildlife",
  "Shopping",
  "Relaxation",
];


const itineraryActivities = [
  "Arrival and local exploration",
  "Explore popular attractions",
  "Experience local activities",
  "Explore local markets and food",
  "Leisure activities and departure",
  "Explore nearby attractions",
  "Enjoy a relaxing day",
];

const budgetCategories = [
  { name: "Transportation", percentage: 35, icon: Car },
  { name: "Accommodation", percentage: 30, icon: Hotel },
  { name: "Food", percentage: 20, icon: Utensils },
  { name: "Activities", percentage: 15, icon: Compass },
];


type GeneratedPlan = {
  destination: Destination;
  estimatedBudget: number;
  userBudget: number;
  travelers: number;
  days: number;
  itinerary: string[];
};

function PlanTrip() {

  const [departureCity, setDepartureCity] = useState("");
  const [destinationType, setDestinationType] = useState("Any");
  const [budget, setBudget] = useState("30000");
  const [duration, setDuration] = useState("3-5 days");
  const [travelers, setTravelers] = useState("2");
  const [startDate, setStartDate] = useState("");
  const [activities, setActivities] = useState<string[]>([]);

  const [generatedPlan, setGeneratedPlan] =
    useState<GeneratedPlan | null>(null);

  const [error, setError] = useState("");
  const resetGeneratedPlan = () => {
  setGeneratedPlan(null);
  setSavedPlanKey("");
  setSaveMessage("");
  setError("");
};
  const [saveMessage, setSaveMessage] = useState("");

const [savedPlanKey, setSavedPlanKey] = useState("");

  const toggleActivity = (activity: string) => {
  setActivities((previous) =>
    previous.includes(activity)
      ? previous.filter((item) => item !== activity)
      : [...previous, activity]
  );

  resetGeneratedPlan();
};

  const getDayCount = () => {
    if (duration === "More than 10 days") return 11;

    return Number(duration.split("-")[0]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setGeneratedPlan(null);

    const totalBudget = Number(budget);
    const travelerCount = Number(travelers);

    if (!departureCity.trim()) {
      setError("Please enter your departure city.");
      return;
    }

    if (!Number.isFinite(totalBudget) || totalBudget < 1000) {
      setError("Please enter a valid budget of at least ₹1,000.");
      return;
    }

    if (!Number.isInteger(travelerCount) ||
        travelerCount < 1 ||
        travelerCount > 20) {
      setError("Please enter between 1 and 20 travellers.");
      return;
    }

    if (startDate) {
      const selectedDate = new Date(`${startDate}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        setError("Please select today or a future travel date.");
        return;
      }
    }

    let availableDestinations = destinations;

    if (destinationType !== "Any") {
  availableDestinations = destinations.filter(
    (destination: Destination) =>
      destination.category === destinationType
  );
}

if (availableDestinations.length === 0) {
  availableDestinations = destinations;
}

    const affordableDestinations = availableDestinations.filter(
      (destination) =>
        destination.budget * travelerCount <= totalBudget
    );

    const destination =
      affordableDestinations[0] ?? availableDestinations[0];

    const estimatedBudget = destination.budget * travelerCount;

    const days = getDayCount();

    const itinerary = Array.from(
      { length: days },
      (_, index) =>
        `Day ${index + 1}: ${
          index === 0
            ? "Arrival and local exploration"
            : itineraryActivities[index % itineraryActivities.length]
        }`
    );

    setGeneratedPlan({
      destination,
      estimatedBudget,
      userBudget: totalBudget,
      travelers: travelerCount,
      days,
      itinerary,
    });
  };
  const saveGeneratedPlan = () => {
    if (!generatedPlan) return;

    const planKey = [
    generatedPlan.destination.name,
    startDate,
    generatedPlan.travelers,
    generatedPlan.userBudget,
    duration,
    ].join("-");

    if (savedPlanKey === planKey) {
      return;
    }

    const newTrip: Trip = {
      id: Date.now(),

      name: `${generatedPlan.destination.name} Trip`,

      country: generatedPlan.destination.country,

      status: startDate ? "Upcoming" : "Saved",

      startDate: startDate
        ? new Date(`${startDate}T00:00:00`).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Date not selected",

      duration: duration,

      travelers: generatedPlan.travelers,

      budget: generatedPlan.estimatedBudget,

      budgetLimit: generatedPlan.userBudget,

      
        image: generatedPlan.destination.image,

      activities: generatedPlan.destination.activities,

      itinerary: generatedPlan.itinerary,
    };

    try {
  addTrip(newTrip);

  setSavedPlanKey(planKey);

  setSaveMessage("Your trip has been saved successfully!");

} catch {
  setSaveMessage("Unable to save your trip. Please try again.");
}
  };

  return (
    <div className="p-4 md:p-7">

      <PageHeader
        eyebrow="YOUR NEXT ADVENTURE"
        title="Plan Your Trip"
        description="Tell us about your travel preferences and create a trip that matches your budget and interests."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">

        {/* Planning Form */}

        <form
          onSubmit={handleSubmit}
          className="rounded-[26px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl md:p-7"
        >

          <div className="mb-7 flex items-center gap-3">

            <div className="rounded-xl bg-orange-500/20 p-3 text-orange-400">
              <Compass size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Trip Preferences
              </h2>

              <p className="text-xs text-white/50">
                Customize your travel experience
              </p>
            </div>

          </div>

          {/* Departure City */}

          <div className="mb-6">

            <label className="mb-2 block text-sm font-medium text-white">
              Departure City
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3">

              <MapPin size={19} className="text-orange-400" />

              <input
                type="text"
                required
                value={departureCity}
                onChange={(event) => {
                  setDepartureCity(event.target.value);
                  resetGeneratedPlan();
                }}
                placeholder="Enter your departure city"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />

            </div>

          </div>

          {/* Destination Type */}

          <div className="mb-6">

            <label className="mb-3 block text-sm font-medium text-white">
              Preferred Destination
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

              {["Any", "Nature", "Beach", "Adventure", "Culture", "City"].map(
                (type) => (

                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setDestinationType(type);
                      resetGeneratedPlan();
                    }}
                    className={`rounded-xl border px-3 py-3 text-sm transition ${
                      destinationType === type
                        ? "border-orange-400 bg-orange-500/20 text-orange-300"
                        : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {type}
                  </button>

                )
              )}

            </div>

          </div>

          {/* Budget and Travellers */}

          <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-white">
                Total Group Budget (₹)
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3">

                <Wallet size={19} className="text-orange-400" />

                <input
                  type="number"
                  min="1000"
                  required
                  value={budget}
                  onChange={(event) => {
                    setBudget(event.target.value);
                    resetGeneratedPlan();
                  }}
                  className="w-full bg-transparent text-sm text-white outline-none"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-white">
                Number of Travellers
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3">

                <Users size={19} className="text-orange-400" />

                <input
                  type="number"
                  min="1"
                  max="20"
                  required
                  value={travelers}
                  onChange={(event) => {
                    setTravelers(event.target.value);
                    resetGeneratedPlan();
                  }}
                  className="w-full bg-transparent text-sm text-white outline-none"
                />

              </div>

            </div>

          </div>

          {/* Duration and Date */}

          <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-white">
                Travel Duration
              </label>

              <select
                value={duration}
                onChange={(event) => {
                  setDuration(event.target.value);
                  resetGeneratedPlan();
                }}
                className="w-full rounded-xl border border-white/15 bg-[#173B3B] px-4 py-3 text-sm text-white outline-none"
              >
                <option>1-2 days</option>
                <option>3-5 days</option>
                <option>5-7 days</option>
                <option>7-10 days</option>
                <option>More than 10 days</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-white">
                Preferred Start Date
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3">

                <CalendarDays size={19} className="text-orange-400" />

                <input
                  type="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={startDate}
                  onChange={(event) => {
                      setStartDate(event.target.value);
                      resetGeneratedPlan();
                    }}
                  className="w-full min-w-0 bg-transparent text-sm text-white outline-none"
                />

              </div>

            </div>

          </div>

          {/* Activities */}

          <div className="mb-7">

            <label className="mb-3 block text-sm font-medium text-white">
              Preferred Activities
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

              {activityOptions.map((activity) => {

                const selected = activities.includes(activity);

                return (
                  <button
                    key={activity}
                    type="button"
                    onClick={() => toggleActivity(activity)}
                    aria-pressed={selected}
                    className={`rounded-xl border px-3 py-3 text-xs transition ${
                      selected
                        ? "border-orange-400 bg-orange-500/20 text-orange-300"
                        : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >

                    <span className="flex items-center justify-center gap-2">

                      {selected && <CheckCircle2 size={14} />}

                      {activity}

                    </span>

                  </button>
                );

              })}

            </div>

          </div>

          {/* Validation Error */}

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          {/* Generate Button */}

          <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Generate Trip
            </Button>

        </form>

        {/* Right Side */}

        <aside className="flex flex-col gap-5">

          {/* Preference Summary */}

          <div className="rounded-[26px] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-orange-500/20 p-3 text-orange-400">
                <Plane size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  Trip Snapshot
                </h2>

                <p className="text-xs text-white/50">
                  Your current preferences
                </p>
              </div>

            </div>

            <div className="space-y-5">

              <div>
                <p className="text-xs text-white/50">Departure City</p>
                <p className="mt-1 font-medium text-white">
                  {departureCity || "Not selected"}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/50">Destination Type</p>
                <p className="mt-1 font-medium text-white">
                  {destinationType}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/50">Group Budget</p>
                <p className="mt-1 text-2xl font-bold text-orange-300">
                  ₹{Number(budget || 0).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-white/50">Travellers</p>
                  <p className="mt-1 font-semibold text-white">
                    {travelers || "0"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/50">Duration</p>
                  <p className="mt-1 font-semibold text-white">
                    {duration}
                  </p>
                </div>

              </div>

              <div>
                <p className="text-xs text-white/50">Activities</p>

                <div className="mt-2 flex flex-wrap gap-2">

                  {activities.length ? activities.map((activity) => (
                    <span
                      key={activity}
                      className="rounded-full bg-orange-500/15 px-3 py-1.5 text-xs text-orange-300"
                    >
                      {activity}
                    </span>
                  )) : (
                    <span className="text-sm text-white/50">
                      No activities selected
                    </span>
                  )}

                </div>
              </div>

            </div>

          </div>

          {/* Generated Trip Plan */}

          {generatedPlan && (

            <Card
              variant="glass"
              padding="md"
              className="h-full rounded-[26px] border-orange-400/30"
            >
              {/* Destination Cover Image */}

                  <div className="relative mb-5 h-44 overflow-hidden rounded-2xl">

                    <img
                      src={generatedPlan.destination.image}
                      alt={generatedPlan.destination.name}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-4 left-4">

                      <span className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white">
                        {generatedPlan.destination.category}
                      </span>

                      <p className="mt-2 text-sm font-medium text-white/80">
                        {generatedPlan.destination.country}
                      </p>

                    </div>

                  </div>

              <div className="flex items-center gap-3">

                <Sparkles size={21} className="text-orange-400" />

                <h2 className="font-semibold text-white">
                  Your Suggested Trip
                </h2>

              </div>

              <h3 className="mt-5 text-2xl font-bold text-orange-300">
                {generatedPlan.destination.name}
              </h3>

              <p className="mt-1 text-xs text-white/50">
                {generatedPlan.destination.country}
              </p>

              <p className="mt-3 text-sm leading-6 text-white/65">
                {generatedPlan.destination.description}
              </p>

              {/* Budget Summary */}

              <div className="mt-5 rounded-xl bg-white/5 p-4">

                <div className="flex justify-between text-sm">

                  <span className="text-white/60">
                    Estimated trip cost
                  </span>

                  <span className="font-semibold text-white">
                    ₹{generatedPlan.estimatedBudget.toLocaleString("en-IN")}
                  </span>

                </div>

                <div className="mt-3 flex justify-between text-sm">

                  <span className="text-white/60">
                    Your budget
                  </span>

                  <span className="font-semibold text-white">
                    ₹{generatedPlan.userBudget.toLocaleString("en-IN")}
                  </span>

                </div>

                <div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-sm">

                  <span className="text-white/60">
                    Remaining budget
                  </span>

                  <span className={`font-semibold ${
                    generatedPlan.userBudget >= generatedPlan.estimatedBudget
                      ? "text-emerald-300"
                      : "text-red-300"
                  }`}>
                    ₹{(generatedPlan.userBudget - generatedPlan.estimatedBudget).toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

              {/* Expense Breakdown */}

              <h4 className="mb-3 mt-6 text-sm font-semibold text-white">
                Estimated Expense Breakdown
              </h4>

              <div className="space-y-4">

                {budgetCategories.map((item) => {

                  const Icon = item.icon;

                  const amount = Math.round(
                    generatedPlan.estimatedBudget *
                    item.percentage / 100
                  );

                  return (

                    <div key={item.name}>

                      <div className="mb-2 flex items-center justify-between">

                        <span className="flex items-center gap-2 text-xs text-white/70">
                          <Icon size={15} className="text-orange-400" />
                          {item.name}
                        </span>

                        <span className="text-xs font-medium text-white">
                          ₹{amount.toLocaleString("en-IN")}
                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/10">

                        <div
                          className="h-full rounded-full bg-orange-400"
                          style={{ width: `${item.percentage}%` }}
                        />

                      </div>

                    </div>

                  );

                })}

              </div>

              {/* Itinerary */}

              <h4 className="mb-4 mt-7 text-sm font-semibold text-white">
                Sample Day-wise Itinerary
              </h4>

              <div className="space-y-4">

                {generatedPlan.itinerary.map((item, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-xs font-semibold text-orange-300">
                      {index + 1}
                    </div>

                    <p className="pt-1 text-xs leading-5 text-white/70">
                      {item.replace(
                        itineraryActivities[index % itineraryActivities.length],
                        generatedPlan.destination.activities[
                          index % generatedPlan.destination.activities.length
                        ]
                      )}
                    </p>

                  </div>

                ))}

              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">

                <p className="flex items-center gap-2 text-xs text-orange-300">
                  <Clock size={15} />
                  Estimated duration: {generatedPlan.days} days
                </p>

              </div>
                {/* Save Trip Button */}

              <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={saveGeneratedPlan}
                >
                  Save to My Trips
                </Button>

              {/* Save Confirmation */}

              {saveMessage && (
                <div
                  role="status"
                  className="mt-3 text-center text-xs text-emerald-300"
                >
                  {saveMessage}
                </div>
              )}

              {/* Navigate to My Trips */}

              {savedPlanKey && (
                <Link
                  to="/my-trips"
                  className="mt-3 block text-center text-sm text-orange-300 hover:text-orange-200"
                >
                  View My Trips →
                </Link>
              )}
            </Card>

          )}

          {!generatedPlan && (

            <div className="rounded-[26px] border border-white/15 bg-white/5 p-6">

              <div className="flex items-center gap-3">

                <Sparkles size={22} className="text-orange-400" />

                <h3 className="font-semibold text-white">
                  Your Journey Starts Here
                </h3>

              </div>

              <p className="mt-3 text-sm leading-6 text-white/60">
                Complete your travel preferences and generate a
                personalized sample trip preview.
              </p>

            </div>

          )}

        </aside>

      </div>

      <p className="mt-6 text-xs leading-5 text-white/40">
        All recommendations, itineraries and budget estimates are
        illustrative sample data. They are not live travel quotes
        or confirmed bookings.
      </p>

    </div>
  );
}

export default PlanTrip;