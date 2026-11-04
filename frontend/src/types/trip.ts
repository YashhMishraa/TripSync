export type TripStatus = "Upcoming" | "Completed" | "Saved";

export type Trip = {
  id: number;
  name: string;
  country: string;
  status: TripStatus;
  startDate: string;
  duration: string;
  travelers: number;
  budget: number;
  budgetLimit?: number;
  image: string;
  activities: string[];
  itinerary: string[];
};

export const TRIPS_STORAGE_KEY = "tripsync-my-trips";