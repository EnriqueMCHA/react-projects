import { useEffect, useState } from "react";

export function useSimpleDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    }; // <----
  }, [value, delay]);

  return debouncedValue;
}
