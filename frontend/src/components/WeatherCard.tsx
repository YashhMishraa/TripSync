import {
  MapPin,
  ThermometerSun,
  CloudRain,
  CloudSun,
  Sun,
  Cloud,
  Droplets,
  Wind,
  Umbrella,
} from "lucide-react";
import Card from "./ui/Card";

const forecast = [
  {
    day: "Today",
    icon: CloudRain,
    temperature: "18°",
  },
  {
    day: "Wed",
    icon: CloudSun,
    temperature: "21°",
  },
  {
    day: "Thu",
    icon: Sun,
    temperature: "24°",
  },
  {
    day: "Fri",
    icon: Cloud,
    temperature: "20°",
  },
  {
    day: "Sat",
    icon: CloudSun,
    temperature: "22°",
  },
];

function WeatherCard() {
  return (
    <Card
        variant="glass"
        padding="none"
        className="rounded-[26px] bg-[#EAEBD6] p-5 text-[#263638] shadow-lg"
      >

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-orange-400 p-2 text-white">
            <MapPin size={19} />
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-wider">
              KYOTO, JAPAN
            </h2>

            <p className="mt-0.5 text-[10px] text-gray-500">
              Destination Weather
            </p>
          </div>

        </div>

        <span className="rounded-full bg-white/60 px-3 py-1 text-[10px] font-medium">
          Sample Data
        </span>

      </div>

      {/* Main Weather */}

      <div className="mt-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <CloudRain
            size={55}
            strokeWidth={1.4}
            className="text-sky-600"
          />

          <div>
            <p className="text-4xl font-semibold tracking-tight">
              18°
            </p>

            <p className="mt-1 text-xs font-medium text-gray-600">
              Light Rain
            </p>

          </div>

        </div>

        <div className="text-right">

          <p className="text-xs text-gray-500">
            High / Low
          </p>

          <p className="mt-1 text-lg font-semibold">
            22° / 12°C
          </p>

          <p className="mt-1 text-[10px] text-gray-500">
            Feels like 17°C
          </p>

        </div>

      </div>

      {/* Weather Statistics */}

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-black/10 pt-4">

        <div className="flex items-center gap-2">

          <Droplets size={17} className="text-sky-700" />

          <div>
            <p className="text-[10px] text-gray-500">
              Humidity
            </p>

            <p className="text-xs font-semibold">
              75%
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2">

          <Wind size={17} className="text-sky-700" />

          <div>
            <p className="text-[10px] text-gray-500">
              Wind
            </p>

            <p className="text-xs font-semibold">
              8 km/h
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2">

          <Umbrella size={17} className="text-sky-700" />

          <div>
            <p className="text-[10px] text-gray-500">
              Rain
            </p>

            <p className="text-xs font-semibold">
              30%
            </p>
          </div>

        </div>

      </div>

      {/* Five-Day Forecast */}

      <div className="mt-5 border-t border-black/10 pt-4">

        <div className="mb-4 flex items-center justify-between">

          <h3 className="text-xs font-bold tracking-wide">
            5-DAY FORECAST
          </h3>

          <ThermometerSun
            size={17}
            className="text-orange-500"
          />

        </div>

        <div className="grid grid-cols-5 gap-1">

          {forecast.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.day}
                className="flex flex-col items-center gap-2 rounded-xl px-1 py-3 transition hover:bg-white/70"
              >

                <span className="text-[10px] font-medium text-gray-500">
                  {item.day}
                </span>

                <Icon
                  size={21}
                  strokeWidth={1.7}
                  className="text-sky-700"
                />

                <span className="text-sm font-semibold">
                  {item.temperature}
                </span>

              </div>

            );

          })}

        </div>

      </div>

      <p className="mt-3 text-[9px] text-gray-400">
        Illustrative weather information, not a live forecast.
      </p>

    </Card>
  );
}

export default WeatherCard;