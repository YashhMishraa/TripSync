import { useState } from "react";

import {
  MapPin,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Card from "./ui/Card";

import { destinations } from "../data/destinations";
import { useFavorites } from "../hooks/useFavorites";

// Featured destinations for the dashboard carousel

const featuredDestinationIds = [
  "kamikochi",
  "bali",
  "swiss-alps",
  "jaipur",
];

function FeaturedDestination() {

  const [activeIndex, setActiveIndex] = useState(0);

  const { isFavorite, toggleFavorite } = useFavorites();

  // Retrieve destinations from the shared catalogue

  const featuredDestinations = featuredDestinationIds.flatMap(
    (favoriteId) => {
      const destination = destinations.find(
        (item) => item.favoriteId === favoriteId
      );

      return destination ? [destination] : [];
    }
  );

  const currentDestination = featuredDestinations[activeIndex];

  if (!currentDestination) return null;

  const destinationIsFavorite = isFavorite(
    currentDestination.favoriteId
  );

  // Next destination

  const nextDestination = () => {
    setActiveIndex(
      (previous) =>
        (previous + 1) % featuredDestinations.length
    );
  };

  // Previous destination

  const previousDestination = () => {
    setActiveIndex(
      (previous) =>
        (previous - 1 + featuredDestinations.length) %
        featuredDestinations.length
    );
  };

  return (

    <Card
        variant="glass"
        padding="none"
        className="relative overflow-hidden"
      >

      {/* Destination Image */}

      <img
        key={currentDestination.favoriteId}
        src={currentDestination.image}
        alt={currentDestination.name}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />

      {/* Location Badge */}

      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm backdrop-blur-md md:left-6 md:top-6">

        <MapPin size={16} className="text-orange-400" />

        {currentDestination.name}, {currentDestination.country}

      </div>

      {/* Carousel Navigation */}

      <div className="absolute right-5 top-5 flex gap-2 md:right-6 md:top-6">

        <button
          type="button"
          onClick={previousDestination}
          aria-label="Previous destination"
          className="rounded-full border border-white/30 bg-black/30 p-2 backdrop-blur-md transition hover:bg-white/20"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={nextDestination}
          aria-label="Next destination"
          className="rounded-full border border-white/30 bg-black/30 p-2 backdrop-blur-md transition hover:bg-white/20"
        >
          <ChevronRight size={20} />
        </button>

      </div>

      {/* Destination Information */}

      <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-between gap-5 p-5 md:flex-row md:items-end md:p-8">

        <div className="max-w-2xl">

          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">

            <span className="flex items-center gap-2 text-orange-300">
              <Star size={16} fill="currentColor" />
              Featured Destination
            </span>

            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
              {currentDestination.bestFor}
            </span>

          </div>

          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            {currentDestination.name}
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 md:text-base">
            {currentDestination.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm">

            <Star
              size={16}
              fill="#FFB347"
              color="#FFB347"
            />

            <span className="font-semibold">
              {currentDestination.rating}
            </span>

            <span className="text-white/60">
              Destination rating
            </span>

          </div>

        </div>

        {/* Favorite Button */}

        <button
          type="button"
          onClick={() =>
            toggleFavorite(currentDestination.favoriteId)
          }
          aria-label={
            destinationIsFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          aria-pressed={destinationIsFavorite}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/30 backdrop-blur-md transition ${
            destinationIsFavorite
              ? "bg-orange-500 text-white"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >

          <Heart
            size={22}
            fill={
              destinationIsFavorite
                ? "currentColor"
                : "none"
            }
          />

        </button>

      </div>

      {/* Carousel Indicators */}

      <div className="absolute bottom-6 right-20 flex items-center gap-2 md:right-28">

        {featuredDestinations.map((destination, index) => (

          <button
            key={destination.favoriteId}
            type="button"
            aria-label={`Show ${destination.name}`}
            aria-current={
              index === activeIndex ? "true" : undefined
            }
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-orange-400"
                : "w-2 bg-white/50 hover:bg-white"
            }`}
          />

        ))}

      </div>

    </Card>
  );
}

export default FeaturedDestination;