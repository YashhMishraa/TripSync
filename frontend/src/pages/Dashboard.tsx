import FeaturedDestination from "../components/FeaturedDestination";
import WeatherCard from "../components/WeatherCard";
import FlightCard from "../components/FlightCard";
import DestinationMap from "../components/DestinationMap";
import FavoriteDestinations from "../components/FavoriteDestinations";
import TravelAnalytics from "../components/TravelAnalytics";

function Dashboard() {
  return (
    <section className="grid min-w-0 grid-cols-1 gap-5 p-4 md:p-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">

      {/* Left Column */}

      <div className="flex min-w-0 flex-col gap-6">

        <FeaturedDestination />

        <FavoriteDestinations />

      </div>

      {/* Right Column */}

      <div className="flex min-w-0 flex-col gap-5">

        {/* Weather and Flight */}

        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 [&>*]:min-w-0">

          <WeatherCard />

          <FlightCard />

        </div>

        {/* Destination Map */}

        <DestinationMap />

        {/* Travel Analytics */}

        <TravelAnalytics />

      </div>

    </section>
  );
}

export default Dashboard;