import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type ReactElement,
} from "react";

const STORAGE_KEY = "tripsync-favorites";

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);

function getSavedFavorites(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed.filter(
          (item): item is string => typeof item === "string"
        )
      : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {

  const [favorites, setFavorites] = useState<string[]>(
    getSavedFavorites
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch {
      console.error("Unable to save favorites.");
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  // Important: Return the Context Provider JSX

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}