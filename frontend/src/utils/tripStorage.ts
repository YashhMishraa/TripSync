import type { Trip } from "../types/trip";
import { TRIPS_STORAGE_KEY } from "../types/trip";

// Read saved trips

export function readTrips(fallback: Trip[] = []): Trip[] {
  try {
    const saved = localStorage.getItem(TRIPS_STORAGE_KEY);

    if (saved === null) {
      return fallback;
    }

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return fallback;
    }

    return parsed as Trip[];

  } catch {
    return fallback;
  }
}

// Save trips

export function saveTrips(trips: Trip[]): void {
  localStorage.setItem(
    TRIPS_STORAGE_KEY,
    JSON.stringify(trips)
  );
}

// Add a new trip

export function addTrip(newTrip: Trip): void {
  const existingTrips = readTrips([]);

  saveTrips([...existingTrips, newTrip]);
}