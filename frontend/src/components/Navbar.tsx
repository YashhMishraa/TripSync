import { useState, type FormEvent } from "react";

import {
  NavLink,
  useNavigate,
} from "react-router";

import {
  ArrowLeftRight,
  Bell,
  Briefcase,
  CalendarPlus,
  CheckCheck,
  ChevronDown,
  Compass,
  LayoutDashboard,
  Menu,
  Mountain,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Explore", icon: Compass, path: "/explore" },
  { name: "Plan Trip", icon: CalendarPlus, path: "/plan-trip" },
  { name: "Compare", icon: ArrowLeftRight, path: "/compare" },
  { name: "My Trips", icon: Briefcase, path: "/my-trips" },
];

const searchDestinations = [
  "Bali",
  "Manali",
  "Goa",
  "Kyoto",
  "Jaipur",
  "Cappadocia",
  "Swiss Alps",
  "Rishikesh",
];

type Panel = "notifications" | "profile" | "settings" | null;

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

type NavbarProps = {
  reduceMotion: boolean;
  onReduceMotionChange: (value: boolean) => void;
};
function Navbar({
  reduceMotion,
  onReduceMotionChange,
  }: NavbarProps) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePanel, setActivePanel] = useState<Panel>(null);



  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Explore new destinations",
      message: "Discover beautiful destinations for your next trip.",
      time: "Demo notification",
      read: false,
    },
    {
      id: 2,
      title: "Plan your next journey",
      message: "Create a personalized travel plan with TripSync.",
      time: "Demo notification",
      read: false,
    },
    {
      id: 3,
      title: "Welcome to TripSync",
      message: "Your travel planning experience starts here.",
      time: "Demo notification",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredSearchResults = searchDestinations.filter(
    (destination) =>
      destination.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Navigate to Explore with the search query

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/explore?search=${encodeURIComponent(query)}`);

    setSearchOpen(false);
    setSearchQuery("");
    setActivePanel(null);
  };

  // Search result selection

  const selectDestination = (destination: string) => {
    navigate(`/explore?search=${encodeURIComponent(destination)}`);

    setSearchQuery("");
    setSearchOpen(false);
    setActivePanel(null);
  };

  // Toggle dropdown panels

  const togglePanel = (panel: Panel) => {
    setActivePanel((previous) =>
      previous === panel ? null : panel
    );
  };

  // Mark all notifications as read

  const markAllRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Individual notification

  const markNotificationRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Appearance preference



  const closeMenus = () => {
    setActivePanel(null);
    setMenuOpen(false);
  };

  return (
    <header className="relative z-40 border-b border-white/15 px-5 py-4 text-white md:px-8">

      <div className="flex items-center justify-between gap-4">

        {/* Logo */}

        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-2"
          onClick={closeMenus}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500">
            <Mountain size={21} />
          </span>

          <span className="text-xl font-bold tracking-wide">
            Trip<span className="text-orange-400">Sync</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-2 xl:flex">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={closeMenus}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-3 py-2 text-sm transition hover:bg-white/10 ${
                    isActive
                      ? "bg-white/10 text-orange-300"
                      : "text-white/75"
                  }`
                }
              >
                <Icon size={16} />
                {item.name}
              </NavLink>
            );
          })}

        </nav>

        {/* Right Controls */}

        <div className="flex items-center gap-2">

          {/* Desktop Search */}

          <form
            onSubmit={handleSearch}
            className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 2xl:flex"
          >
            <Search size={16} className="text-white/60" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search destinations"
              className="w-36 bg-transparent text-sm text-white outline-none placeholder:text-white/50"
            />

            <button
              type="submit"
              aria-label="Search"
              className="text-white/60 transition hover:text-orange-400"
            >
              →
            </button>
          </form>

          {/* Mobile Search Toggle */}

          <button
            type="button"
            aria-label="Open search"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setActivePanel(null);
            }}
            className="rounded-full border border-white/20 bg-white/10 p-2 transition hover:bg-white/20 2xl:hidden"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          {/* Settings */}

          <div className="relative hidden sm:block">

            <button
              type="button"
              aria-label="Settings"
              aria-expanded={activePanel === "settings"}
              onClick={() => togglePanel("settings")}
              className="rounded-full border border-white/20 bg-white/10 p-2 transition hover:bg-white/20"
            >
              <Settings size={19} />
            </button>

            {activePanel === "settings" && (

              <div className="absolute right-0 top-full mt-3 w-72 rounded-2xl border border-white/20 bg-[#173B3B] p-5 shadow-2xl">

                <h3 className="font-semibold">
                  Appearance Settings
                </h3>

                <p className="mt-1 text-xs text-white/50">
                  Customize your browsing experience.
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium">
                      Reduce animations
                    </p>

                    <p className="mt-1 text-xs text-white/50">
                      Minimize motion effects.
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={reduceMotion}
                    onClick={() => onReduceMotionChange(!reduceMotion)}
                    className={`h-6 w-11 rounded-full p-1 transition ${
                      reduceMotion ? "bg-orange-500" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white transition ${
                        reduceMotion ? "translate-x-5" : ""
                      }`}
                    />
                  </button>

                </div>

                <div className="mt-4 rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-white/50">
                    Current appearance
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    Dark Teal Theme
                  </p>
                </div>

              </div>

            )}

          </div>

          {/* Notifications */}

          <div className="relative hidden sm:block">

            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={activePanel === "notifications"}
              onClick={() => togglePanel("notifications")}
              className="relative rounded-full border border-white/20 bg-white/10 p-2 transition hover:bg-white/20"
            >
              <Bell size={19} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold">
                  {unreadCount}
                </span>
              )}

            </button>

            {activePanel === "notifications" && (

              <div className="absolute right-0 top-full mt-3 w-80 max-w-[90vw] rounded-2xl border border-white/20 bg-[#173B3B] p-4 shadow-2xl">

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold">
                    Notifications
                  </h3>

                  <button
                    type="button"
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300"
                  >
                    <CheckCheck size={14} />
                    Mark all read
                  </button>

                </div>

                <div className="mt-4 space-y-2">

                  {notifications.map((notification) => (

                    <button
                      key={notification.id}
                      type="button"
                      onClick={() =>
                        markNotificationRead(notification.id)
                      }
                      className={`w-full rounded-xl p-3 text-left transition hover:bg-white/10 ${
                        notification.read
                          ? "bg-white/5"
                          : "border border-orange-400/20 bg-orange-500/10"
                      }`}
                    >

                      <div className="flex items-start gap-2">

                        <span
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                            notification.read
                              ? "bg-white/20"
                              : "bg-orange-400"
                          }`}
                        />

                        <div>
                          <p className="text-sm font-medium">
                            {notification.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-white/60">
                            {notification.message}
                          </p>

                          <p className="mt-2 text-[10px] text-white/40">
                            {notification.time}
                          </p>
                        </div>

                      </div>

                    </button>

                  ))}

                </div>

                <p className="mt-3 text-center text-[10px] text-white/35">
                  Demonstration notifications
                </p>

              </div>

            )}

          </div>

          {/* Profile */}

          <div className="relative hidden sm:block">

            <button
              type="button"
              aria-label="User profile"
              aria-expanded={activePanel === "profile"}
              onClick={() => togglePanel("profile")}
              className="flex items-center gap-2"
            >

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/20">
                <UserRound size={19} />
              </span>

              <ChevronDown size={16} />

            </button>

            {activePanel === "profile" && (

              <div className="absolute right-0 top-full mt-3 w-60 rounded-2xl border border-white/20 bg-[#173B3B] p-4 shadow-2xl">

                <div className="border-b border-white/10 pb-4">

                  <p className="font-semibold">
                    TripSync Traveler
                  </p>

                  <p className="mt-1 text-xs text-white/50">
                    Demo Profile
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/my-trips");
                    closeMenus();
                  }}
                  className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/80 transition hover:bg-white/10"
                >
                  <Briefcase size={17} />
                  My Trips
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/explore");
                    closeMenus();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/80 transition hover:bg-white/10"
                >
                  <Compass size={17} />
                  Explore Destinations
                </button>

                <button
                  type="button"
                  onClick={() => togglePanel("settings")}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/80 transition hover:bg-white/10"
                >
                  <Settings size={17} />
                  Settings
                </button>

              </div>

            )}

          </div>

          {/* Mobile Menu */}

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-white/20 bg-white/10 p-2 transition hover:bg-white/20 xl:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

      </div>

      {/* Mobile Search Panel */}

      {searchOpen && (

        <div className="mt-4 border-t border-white/15 pt-4 2xl:hidden">

          <form
            onSubmit={handleSearch}
            className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3"
          >

            <Search size={18} className="text-white/50" />

            <input
              type="search"
              autoFocus
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search destinations..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />

            <button
              type="submit"
              className="text-xs font-semibold text-orange-400"
            >
              Search
            </button>

          </form>

          {searchQuery.trim() && (

            <div className="mt-2 rounded-xl border border-white/15 bg-[#173B3B] p-2">

              {filteredSearchResults.length > 0 ? (

                filteredSearchResults.map((destination) => (

                  <button
                    key={destination}
                    type="button"
                    onClick={() => selectDestination(destination)}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10"
                  >
                    {destination}
                  </button>

                ))

              ) : (

                <p className="p-3 text-xs text-white/50">
                  No matching suggestions. Press Search to view results.
                </p>

              )}

            </div>

          )}

        </div>

      )}

      {/* Mobile Navigation */}

      {menuOpen && (

        <nav className="mt-4 grid gap-2 border-t border-white/15 pt-4 xl:hidden">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={closeMenus}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-white/15 text-orange-300"
                      : "text-white/80 hover:bg-white/10"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}

        </nav>

      )}

    </header>
  );
}

export default Navbar;