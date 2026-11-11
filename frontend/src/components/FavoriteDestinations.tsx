import {
  Heart,
  Star,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router";
import Card from "./ui/Card";
import { destinations } from "../data/destinations";
import { useFavorites } from "../hooks/useFavorites";
import SectionHeading from "./SectionHeading";

// Destinations displayed in the dashboard

const favoriteDestinationIds = [
  "cappadocia",
  "bali",
  "kyoto",
];

function FavoriteDestinations() {

  const { isFavorite, toggleFavorite } = useFavorites();

  const featuredDestinations = favoriteDestinationIds.flatMap(
    (favoriteId) => {
      const destination = destinations.find(
        (item) => item.favoriteId === favoriteId
      );

      return destination ? [destination] : [];
    }
  );

  return (
    <section className="text-white">

      {/* Section Header */}

          <SectionHeading
            title="Favorite Destinations"
            subtitle="Discover places worth exploring"
            action={
              <Link
                to="/explore"
                className="rounded-full border border-white/30 px-4 py-2 text-sm transition hover:bg-white/10"
              >
                Explore all →
              </Link>
            }
          />

      {/* Destination Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {featuredDestinations.map((destination) => {

          const destinationIsFavorite = isFavorite(
            destination.favoriteId
          );

          return (

            <Card
              variant="glass"
              padding="none"
              className="group overflow-hidden transition duration-300 hover:-translate-y-1"
            >

              {/* Image */}

              <div className="relative h-48 overflow-hidden">

                <img
                  src={destination.image}
                  alt={destination.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Location */}

                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-md">

                  <MapPin
                    size={13}
                    className="text-orange-400"
                  />

                  {destination.name}, {destination.country}

                </div>

                {/* Favorite Button */}

                <button
                  type="button"
                  aria-label={
                    destinationIsFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  aria-pressed={destinationIsFavorite}
                  onClick={() =>
                    toggleFavorite(destination.favoriteId)
                  }
                  className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition hover:bg-black/70"
                >

                  <Heart
                    size={18}
                    fill={
                      destinationIsFavorite
                        ? "#FF9654"
                        : "none"
                    }
                    color={
                      destinationIsFavorite
                        ? "#FF9654"
                        : "white"
                    }
                  />

                </button>

              </div>

              {/* Destination Information */}

              <div className="p-4">

                <h3 className="text-base font-semibold">
                  {destination.name} Escape
                </h3>

                <p className="mt-2 min-h-10 text-xs leading-5 text-white/60">
                  {destination.description}
                </p>

                {/* Budget and Rating */}

                <div className="mt-4 flex items-center justify-between">

                  <div>

                    <p className="text-[11px] text-white/50">
                      Estimated budget
                    </p>

                    <p className="mt-1 font-semibold text-orange-300">
                      ₹{destination.budget.toLocaleString("en-IN")}
                    </p>

                  </div>

                  <div className="flex items-center gap-1 text-sm">

                    <Star
                      size={15}
                      fill="#FFB347"
                      color="#FFB347"
                    />

                    <span className="font-semibold">
                      {destination.rating}
                    </span>

                  </div>

                </div>

                {/* View Destination */}

                <Link
                  to={`/explore?search=${encodeURIComponent(destination.name)}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 py-2.5 text-sm transition hover:border-orange-400 hover:bg-orange-500/10 hover:text-orange-300"
                >
                  View Destination

                  <ArrowUpRight size={16} />

                </Link>

              </div>

            </Card>

          );
        })}

      </div>

      <p className="mt-3 text-xs text-white/40">
        Destination budgets and ratings are illustrative sample data.
      </p>

    </section>
  );
}

export default FavoriteDestinations;