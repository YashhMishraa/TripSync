import {
  Plane,
  CalendarDays,
  Clock,
  ArrowRight,
} from "lucide-react";
import Card from "./ui/Card";

function FlightCard() {
  return (
    <Card
        variant="glass"
        padding="none"
        className="rounded-[26px] bg-[#F0DDE2] p-5 text-[#30252A] shadow-lg"
      >

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-[#30252A] p-2 text-white">
            <Plane size={19} />
          </div>

          <h2 className="text-xl font-bold tracking-wide">
            FLIGHT
          </h2>

        </div>

        <span className="text-2xl font-bold">···</span>

      </div>

      {/* Flight Details */}

      <div className="mt-5 space-y-5">

        {/* Flight One */}

        <div className="flex items-center justify-between">

          <div>

            <p className="flex items-center gap-2 text-xs text-gray-600">
              <CalendarDays size={13} />
              21 May, 6:30 AM
            </p>

            <p className="mt-1 text-sm font-semibold">
              Delhi, India
            </p>

          </div>

          <div className="flex items-center gap-2">

            <ArrowRight size={15} />

            <p className="text-sm font-semibold">
              Tokyo
            </p>

            <Plane size={18} />

          </div>

        </div>

        <div className="border-t border-black/10" />

        {/* Flight Two */}

        <div className="flex items-center justify-between">

          <div>

            <p className="flex items-center gap-2 text-xs text-gray-600">
              <Clock size={13} />
              28 May, 9:30 PM
            </p>

            <p className="mt-1 text-sm font-semibold">
              Tokyo, Japan
            </p>

          </div>

          <div className="flex items-center gap-2">

            <ArrowRight size={15} />

            <p className="text-sm font-semibold">
              Delhi
            </p>

            <Plane size={18} />

          </div>

        </div>

      </div>

      <p className="mt-4 text-[10px] text-gray-500">
        Illustrative itinerary · Not a live flight booking
      </p>

    </Card>
  );
}

export default FlightCard;