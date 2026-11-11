import { useState } from "react";

import {
  MapPin,
  MoreHorizontal,
  Wallet,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import { destinations } from "../data/destinations";
import Card from "./ui/Card";

// Destinations displayed on the dashboard map

const mapDestinationIds = [
  "manali",
  "goa",
  "bali",
  "kyoto",
];

// Decorative marker positions

const markerPositions: Record<
  string,
  { x: string; y: string }
> = {
  manali: { x: "28%", y: "38%" },
  goa: { x: "36%", y: "62%" },
  bali: { x: "72%", y: "72%" },
  kyoto: { x: "82%", y: "38%" },
};

function DestinationMap() {

  // Retrieve destinations from shared catalogue

  const mapDestinations = mapDestinationIds.flatMap(
    (favoriteId) => {
      const destination = destinations.find(
        (item) => item.favoriteId === favoriteId
      );

      return destination ? [destination] : [];
    }
  );

  const [selectedDestination, setSelectedDestination] =
    useState(
      destinations.find((item) => item.favoriteId === "bali") ??
      destinations[0]
    );

  if (!selectedDestination) return null;

  return (
    <Card
        variant="glass"
        padding="md"
        className="h-full"
      >

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-[#172C2C] p-3 text-orange-400">
            <MapPin size={19} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Destinations
            </h2>

            <p className="text-xs text-white/50">
              Explore popular travel locations
            </p>
          </div>

        </div>

        <button
          type="button"
          aria-label="More map options"
          className="rounded-full p-2 transition hover:bg-white/10"
        >
          <MoreHorizontal size={22} />
        </button>

      </div>

      {/* Map Area */}

      <div className="relative h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#193B3D]/70">

        <svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Decorative world map illustration"
        >

          <defs>
            <pattern
              id="map-dots"
              width="13"
              height="13"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="4"
                cy="4"
                r="2.8"
                fill="#D9E8E2"
                opacity="0.85"
              />
            </pattern>
          </defs>

          {/* North America */}

          <path
            d="M70 105 C110 55 190 65 255 110 L290 160 L260 205 L205 220 L175 265 L120 225 L85 180 Z"
            fill="url(#map-dots)"
          />

          {/* South America */}

          <path
            d="M235 255 C275 260 285 300 270 350 L250 415 L225 450 L205 390 L210 320 Z"
            fill="url(#map-dots)"
          />

          {/* Europe */}

          <path
            d="M435 105 L485 95 L515 125 L490 165 L445 155 L420 130 Z"
            fill="url(#map-dots)"
          />

          {/* Africa */}

          <path
            d="M445 175 C495 150 535 190 530 250 L505 340 L470 380 L430 300 L415 225 Z"
            fill="url(#map-dots)"
          />

          {/* Asia */}

          <path
            d="M520 95 C590 55 710 75 810 105 L900 150 L870 205 L800 225 L735 200 L680 235 L620 195 L550 175 Z"
            fill="url(#map-dots)"
          />

          {/* Australia */}

          <path
            d="M755 330 C790 300 845 315 865 355 L835 395 L780 390 L745 360 Z"
            fill="url(#map-dots)"
          />

          {/* Decorative Travel Routes */}

          <path
            d="M280 140 Q500 30 800 180"
            fill="none"
            stroke="#FF9654"
            strokeWidth="2"
            strokeDasharray="6 9"
            opacity="0.5"
          />

          <path
            d="M450 285 Q600 350 770 350"
            fill="none"
            stroke="#FF9654"
            strokeWidth="2"
            strokeDasharray="6 9"
            opacity="0.5"
          />

        </svg>

        {/* Destination Markers */}

        {mapDestinations.map((destination) => {

          const isSelected =
            selectedDestination.favoriteId === destination.favoriteId;

          const position =
            markerPositions[destination.favoriteId];

          if (!position) return null;

          return (

            <button
              key={destination.favoriteId}
              type="button"
              aria-label={`Select ${destination.name}`}
              aria-pressed={isSelected}
              title={destination.name}
              onClick={() => setSelectedDestination(destination)}
              style={{
                left: position.x,
                top: position.y,
              }}
              className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white p-2 text-white shadow-lg transition duration-200 hover:scale-125 ${
                isSelected
                  ? "scale-125 bg-orange-500 ring-4 ring-orange-400/30"
                  : "bg-[#244F4F] hover:bg-orange-500"
              }`}
            >
              <MapPin size={17} />

            </button>

          );

        })}

      </div>

      {/* Selected Destination Details */}

      <div className="mt-4 rounded-2xl border border-white/15 bg-black/10 p-4">

        <div className="flex items-start justify-between gap-3">

          <div>

            <p className="text-[10px] font-semibold tracking-wider text-orange-400">
              SELECTED DESTINATION
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {selectedDestination.name}
            </h3>

            <p className="mt-1 flex items-center gap-1 text-xs text-white/50">
              <MapPin size={13} />
              {selectedDestination.country}
            </p>

          </div>

          <span className="rounded-full bg-orange-500/15 px-3 py-1.5 text-xs text-orange-300">
            {selectedDestination.category}
          </span>

        </div>

        <p className="mt-3 text-xs leading-5 text-white/65">
          {selectedDestination.description}
        </p>

        {/* Budget and Duration */}

        <div className="mt-4 flex flex-wrap gap-5 border-t border-white/10 pt-4">

          <div className="flex items-center gap-2">

            <Wallet size={17} className="text-orange-400" />

            <div>
              <p className="text-[10px] text-white/45">
                Estimated Budget
              </p>

              <p className="text-sm font-semibold">
                ₹{selectedDestination.budget.toLocaleString("en-IN")}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2">

            <CalendarDays size={17} className="text-orange-400" />

            <div>
              <p className="text-[10px] text-white/45">
                Duration
              </p>

              <p className="text-sm font-semibold">
                {selectedDestination.duration}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between text-xs text-white/50">

        <span>
          {mapDestinations.length} featured locations
        </span>

        <a
          href="/explore"
          className="flex items-center gap-1 font-medium text-orange-400 transition hover:text-orange-300"
        >
          Explore destinations
          <ArrowUpRight size={14} />
        </a>

      </div>

      <p className="mt-3 text-[10px] leading-4 text-white/35">
        Schematic map illustration. Marker positions are approximate
        and are not geographically accurate.
      </p>

    </Card>
  );
}

export default DestinationMap;