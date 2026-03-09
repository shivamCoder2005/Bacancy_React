import { useRef, useState } from "react";

export function useDebounce<T>(initVal: T, delay: number) {
  const [value, setValue] = useState<T>(initVal);
  const timerId = useRef<number | null>(null);

  function updateValue(newValue: T) {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => setValue(newValue),delay);
  }

  return [value, updateValue];
}


