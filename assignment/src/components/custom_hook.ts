import { useRef, useState,useEffect } from "react";

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


export function useLocalStorage(key: string, initVal: string) {
  const [value, setValue] = useState<string | null>(() => initValFromLocalStorage());

  function initValFromLocalStorage() {
    return localStorage.getItem(key) ?? initVal;
  }

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  function updateData(newVal: string):void {
    setValue(newVal);
  }

  function clearData():void {
    setValue(null);
    localStorage.removeItem(key);
  }

  return [value, updateData, clearData];
}