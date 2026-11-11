import { useState } from "react";
import { MoreHorizontal, Plane, Target } from "lucide-react";
import Card from "./ui/Card";

const statistics = [
  {
    title: "Destinations",
    value: "116",
    progress: 75,
  },
  {
    title: "Countries",
    value: "43",
    progress: 60,
  },
  {
    title: "Continents",
    value: "5",
    progress: 72,
  },
];

function TravelAnalytics() {
  const [travelProgress, setTravelProgress] = useState(72);

  return (
    <Card
        variant="glass"
        padding="md"
        className="h-full"
      >

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-orange-500/20 p-3 text-orange-400">
            <Plane size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Travel Analytics
            </h2>

            <p className="text-xs text-white/50">
              Your travel statistics
            </p>
          </div>

        </div>

        <button
          type="button"
          aria-label="More analytics options"
          className="rounded-full p-2 transition hover:bg-white/10"
        >
          <MoreHorizontal size={22} />
        </button>

      </div>

      {/* Circular Statistics */}

      <div className="grid grid-cols-3 gap-2">

        {statistics.map((statistic) => (

          <div
            key={statistic.title}
            className="flex flex-col items-center text-center"
          >

            <div
              className="relative flex h-24 w-24 items-center justify-center rounded-full p-[8px] sm:h-28 sm:w-28"
              style={{
                background: `conic-gradient(#FF9654 ${statistic.progress}%, #DCEBE5 ${statistic.progress}% 100%)`,
              }}
            >

              <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#29494A]">

                <span className="text-2xl font-bold sm:text-3xl">
                  {statistic.value}
                </span>

                <span className="mt-1 text-[10px] text-white/60 sm:text-xs">
                  {statistic.title}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Travel Goal Progress */}

      <div className="mt-7 border-t border-white/15 pt-5">

        <div className="mb-4 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Target size={19} className="text-orange-400" />

            <h3 className="text-sm font-medium">
              Your Travel Goal
            </h3>

          </div>

          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#263F40]">
            {travelProgress}%
          </span>

        </div>

        {/* Progress Bar */}

        <div
          className="h-3 overflow-hidden rounded-full bg-white/20"
          role="progressbar"
          aria-label="Travel goal progress"
          aria-valuenow={travelProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        >

          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${travelProgress}%`,
              background:
                "repeating-linear-gradient(135deg, #DCEBE5 0px, #DCEBE5 6px, #B4C8BE 6px, #B4C8BE 10px)",
            }}
          />

        </div>

        <p className="mt-3 text-xs text-white/60">
          You've completed {travelProgress}% of your yearly travel goal.
        </p>

        <button
          type="button"
          onClick={() =>
            setTravelProgress((previous) =>
              previous >= 100 ? 0 : Math.min(previous + 5, 100)
            )
          }
          className="mt-4 text-xs font-semibold text-orange-400 transition hover:text-orange-300"
        >
          Update demo progress →
        </button>

      </div>

    </Card>
  );
}

export default TravelAnalytics;