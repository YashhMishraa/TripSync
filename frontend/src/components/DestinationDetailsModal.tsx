import {
  X,
  MapPin,
  Star,
  CalendarDays,
  Wallet,
  Camera,
  Compass,
  Hotel,
  Utensils,
  Car,
} from "lucide-react";
import type { Destination } from "../data/destinations";



type Props = {
  destination: Destination | null;
  onClose: () => void;
};

function DestinationDetailsModal({ destination, onClose }: Props) {

  if (!destination) return null;

  const expenses = [
    {
      name: "Transportation",
      percentage: 35,
      icon: Car,
    },
    {
      name: "Accommodation",
      percentage: 30,
      icon: Hotel,
    },
    {
      name: "Food",
      percentage: 20,
      icon: Utensils,
    },
    {
      name: "Activities",
      percentage: 15,
      icon: Compass,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="destination-title"
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/20 bg-[#173B3B] shadow-2xl"
      >

        {/* Close Button */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close destination details"
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
        >
          <X size={20} />
        </button>

        {/* Destination Image */}

        <div className="relative h-64 md:h-80">

          <img
            src={destination.image}
            alt={destination.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

          <div className="absolute bottom-5 left-6">

            <span className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white">
              {destination.category}
            </span>

            <h2
              id="destination-title"
              className="mt-3 text-3xl font-bold text-white md:text-4xl"
            >
              {destination.name}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
              <MapPin size={16} />
              {destination.country}
            </p>

          </div>

        </div>

        <div className="space-y-7 p-5 md:p-7">

          {/* Destination Overview */}

          <section>

            <h3 className="text-lg font-semibold text-white">
              About This Destination
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/65">
              {destination.description}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">

              <div className="rounded-xl bg-white/5 p-3">

                <Wallet size={19} className="text-orange-400" />

                <p className="mt-3 text-[10px] text-white/50">
                  Estimated Budget
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  ₹{destination.budget.toLocaleString("en-IN")}
                </p>

              </div>

              <div className="rounded-xl bg-white/5 p-3">

                <CalendarDays size={19} className="text-orange-400" />

                <p className="mt-3 text-[10px] text-white/50">
                  Ideal Duration
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {destination.duration}
                </p>

              </div>

              <div className="rounded-xl bg-white/5 p-3">

                <Star size={19} className="text-orange-400" />

                <p className="mt-3 text-[10px] text-white/50">
                  Destination Rating
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {destination.rating}/5
                </p>

              </div>

            </div>

          </section>

          {/* Travel Highlights */}

          <section>

            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">

              <Camera size={19} className="text-orange-400" />

              Travel Highlights

            </h3>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

              {destination.highlights.map((highlight) => (

                <div
                  key={highlight}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/75"
                >
                  {highlight}
                </div>

              ))}

            </div>

          </section>

          {/* Popular Attractions */}

          <section>

            <h3 className="text-lg font-semibold text-white">
              Popular Attractions
            </h3>

            <div className="mt-4 space-y-3">

              {destination.attractions.map((attraction, index) => (

                <div
                  key={attraction}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-sm font-semibold text-orange-400">
                    {index + 1}
                  </div>

                  <p className="text-sm text-white/80">
                    {attraction}
                  </p>

                </div>

              ))}

            </div>

          </section>

          {/* Popular Activities */}

          <section>

            <h3 className="text-lg font-semibold text-white">
              Things To Do
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">

              {destination.activities.map((activity) => (

                <span
                  key={activity}
                  className="rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs text-orange-300"
                >
                  {activity}
                </span>

              ))}

            </div>

          </section>

          {/* Expense Breakdown */}

          <section>

            <div className="flex items-center justify-between">

              <h3 className="text-lg font-semibold text-white">
                Estimated Expense Breakdown
              </h3>

              <Wallet size={19} className="text-orange-400" />

            </div>

            <div className="mt-5 space-y-5">

              {expenses.map((expense) => {

                const Icon = expense.icon;

                const amount = Math.round(
                  destination.budget * expense.percentage / 100
                );

                return (

                  <div key={expense.name}>

                    <div className="mb-2 flex items-center justify-between">

                      <span className="flex items-center gap-2 text-xs text-white/70">

                        <Icon size={16} className="text-orange-400" />

                        {expense.name}

                      </span>

                      <span className="text-xs font-semibold text-white">
                        ₹{amount.toLocaleString("en-IN")}
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">

                      <div
                        className="h-full rounded-full bg-orange-400"
                        style={{ width: `${expense.percentage}%` }}
                      />

                    </div>

                  </div>

                );

              })}

            </div>

            <p className="mt-4 text-[10px] leading-4 text-white/40">
              Expense distribution is illustrative sample data.
              Actual expenses depend on travel preferences and conditions.
            </p>

          </section>

          {/* Close Button */}

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-400"
          >
            Close Destination Details
          </button>

        </div>

      </section>

    </div>
  );
}

export default DestinationDetailsModal;