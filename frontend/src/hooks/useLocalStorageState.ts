import { useEffect, useState } from "react";

function useLocalStorageState<T>(
  key: string,
  initialValue: T
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue !== null
        ? (JSON.parse(savedValue) as T)
        : initialValue;

    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error("Unable to save data to localStorage.");
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorageState;