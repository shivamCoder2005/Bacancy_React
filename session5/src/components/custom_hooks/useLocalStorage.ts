import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initVal: string) {
  const [value, setValue] = useState<string>(() => initValFromLocalStorage());

  function initValFromLocalStorage() {
    return localStorage.getItem(key) ?? initVal;
  }

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  function setData(newVal: string) {
    setValue(newVal);
  }

  function clearData() {
    setValue("");
    localStorage.removeItem(key);
  }

  return [value, setData, clearData];
}