import { Routes, Route, Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FavoritesProvider } from "./hooks/useFavorites";

import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import PlanTrip from "./pages/PlanTrip";
import CompareDestinations from "./pages/CompareDestinations";
import MyTrips from "./pages/MyTrips";

function App() {
  const [reduceMotion, setReduceMotion] = useState(
  () => localStorage.getItem("tripsync-reduce-motion") === "true"
  );

  useEffect(() => {
  if (reduceMotion) {
    document.documentElement.dataset.reduceMotion = "true";
  } else {
    delete document.documentElement.dataset.reduceMotion;
  }

  localStorage.setItem(
    "tripsync-reduce-motion",
    String(reduceMotion)
  );
  }, [reduceMotion]);
  const location = useLocation();
  return (
    <FavoritesProvider>
    <main
      className="min-h-screen bg-cover bg-center bg-fixed p-3 md:p-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(4,25,25,0.55), rgba(4,25,25,0.65)), url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=2000&q=85')",
      }}
    >

      <div className="mx-auto min-h-screen max-w-[1600px] overflow-hidden rounded-[28px] border border-white/25 bg-[#173B3B]/45 shadow-2xl backdrop-blur-xl">

        <Navbar
        reduceMotion={reduceMotion}
        onReduceMotionChange={setReduceMotion}
         />
        <div key={location.pathname} className="page-enter">
        <Routes>

          <Route path="/" element={<Dashboard />} />

          <Route path="/explore" element={<Explore />} />

          <Route path="/plan-trip" element={<PlanTrip />} />

          <Route
            path="/compare"
            element={<CompareDestinations />}
          />

          <Route 
          path="/my-trips" element={<MyTrips />} />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
        </div>

      </div>

    </main>
    </FavoritesProvider>
  );
}

export default App;