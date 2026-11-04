export type Destination = {
  id: number;
  favoriteId: string;
  name: string;
  country: string;
  category: string;
  budget: number;
  duration: string;
  rating: number;
  image: string;
  description: string;
  bestFor: string;
  highlights: string[];
  attractions: string[];
  activities: string[];
};

export const destinations: Destination[] = [

    {
  id: 9,
  favoriteId: "kamikochi",
  name: "Kamikochi Alpine Valley",
  country: "Japan",
  category: "Nature",
  budget: 72000,
  duration: "4-5 days",
  rating: 4.9,
  image:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=85",
  description:
    "Explore a breathtaking alpine valley surrounded by crystal-clear rivers, lush forests and dramatic mountain peaks.",
  bestFor: "Mountain Escape",
  highlights: [
    "Alpine Mountains",
    "Crystal-Clear Rivers",
    "Lush Forests",
  ],
  attractions: [
    "Kappa Bridge",
    "Taisho Pond",
    "Myojin Pond",
  ],
  activities: [
    "Mountain Trekking",
    "Nature Photography",
    "Scenic Walks",
  ],
},

  {
    id: 4,
    favoriteId: "bali",
    name: "Bali",
    country: "Indonesia",
    category: "Beach",
    budget: 45000,
    duration: "5-7 days",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85",
    description: "Discover tropical beaches, ancient temples and beautiful green landscapes.",
    bestFor: "Tropical Adventures",
    highlights: ["Tropical Beaches", "Ancient Temples", "Rice Terraces"],
    attractions: ["Uluwatu Temple", "Tegallalang Rice Terraces", "Ubud Monkey Forest"],
    activities: ["Snorkeling", "Temple Tours", "Waterfall Visits"],
  },

  {
    id: 7,
    favoriteId: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    category: "Nature",
    budget: 85000,
    duration: "6-8 days",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85",
    description: "Experience breathtaking mountains, scenic villages and alpine lakes.",
    bestFor: "Mountains & Nature",
    highlights: ["Snow-Capped Mountains", "Alpine Villages", "Scenic Lakes"],
    attractions: ["Jungfraujoch", "Lauterbrunnen Valley", "Lake Oeschinen"],
    activities: ["Mountain Trekking", "Cable Car Rides", "Skiing"],
  },

  {
    id: 5,
    favoriteId: "kyoto",
    name: "Kyoto",
    country: "Japan",
    category: "Culture",
    budget: 65000,
    duration: "5-6 days",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=85",
    description: "Discover traditional Japanese architecture, temples and gardens.",
    bestFor: "History & Culture",
    highlights: ["Traditional Architecture", "Japanese Gardens", "Cultural Heritage"],
    attractions: ["Fushimi Inari Shrine", "Kinkaku-ji Temple", "Arashiyama Bamboo Grove"],
    activities: ["Temple Visits", "Tea Ceremonies", "Cultural Walks"],
  },

  {
    id: 8,
    favoriteId: "cappadocia",
    name: "Cappadocia",
    country: "Turkey",
    category: "Adventure",
    budget: 55000,
    duration: "4-5 days",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1591448764624-d7973a442bff?auto=format&fit=crop&w=900&q=85",
    description: "Explore spectacular valleys, unique rock formations and famous hot-air balloons.",
    bestFor: "Adventure & Landscapes",
    highlights: ["Hot Air Balloons", "Unique Rock Formations", "Scenic Valleys"],
    attractions: ["Goreme Open-Air Museum", "Love Valley", "Uchisar Castle"],
    activities: ["Hot Air Balloon Viewing", "Valley Hiking", "Photography"],
  },

  {
    id: 2,
    favoriteId: "goa",
    name: "Goa",
    country: "India",
    category: "Beach",
    budget: 15000,
    duration: "3-4 days",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=85",
    description: "Relax on beautiful beaches and experience vibrant coastal culture.",
    bestFor: "Beaches & Relaxation",
    highlights: ["Beautiful Beaches", "Portuguese Heritage", "Coastal Culture"],
    attractions: ["Baga Beach", "Fort Aguada", "Dudhsagar Falls"],
    activities: ["Water Sports", "Beach Exploration", "Local Food Tours"],
  },

  {
    id: 1,
    favoriteId: "manali",
    name: "Manali",
    country: "India",
    category: "Nature",
    budget: 12000,
    duration: "4-5 days",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=85",
    description: "Explore mountain landscapes, peaceful valleys and adventure trails.",
    bestFor: "Mountains & Nature",
    highlights: ["Mountain Landscapes", "Adventure Trails", "Peaceful Valleys"],
    attractions: ["Solang Valley", "Hadimba Temple", "Atal Tunnel"],
    activities: ["Trekking", "Paragliding", "Local Sightseeing"],
  },

  {
    id: 3,
    favoriteId: "jaipur",
    name: "Jaipur",
    country: "India",
    category: "Culture",
    budget: 10000,
    duration: "2-3 days",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=900&q=85",
    description: "Discover royal palaces, historic forts and colourful markets.",
    bestFor: "Heritage & Culture",
    highlights: ["Royal Palaces", "Historic Architecture", "Local Markets"],
    attractions: ["Amber Fort", "Hawa Mahal", "City Palace"],
    activities: ["Fort Tours", "Shopping", "Local Food"],
  },

  {
    id: 6,
    favoriteId: "rishikesh",
    name: "Rishikesh",
    country: "India",
    category: "Adventure",
    budget: 9000,
    duration: "2-3 days",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=900&q=85",
    description: "Experience river rafting, adventure sports and peaceful surroundings.",
    bestFor: "Adventure & Wellness",
    highlights: ["River Adventures", "Mountain Views", "Peaceful Retreats"],
    attractions: ["Lakshman Jhula", "Triveni Ghat", "Neer Garh Waterfall"],
    activities: ["River Rafting", "Yoga", "Camping"],
  },

];