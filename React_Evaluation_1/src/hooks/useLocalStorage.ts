import { useEffect, useState } from "react";


function useLocalStorage<T>(initVal: T, key: string): { data: T, setData: React.Dispatch<React.SetStateAction<T>> } {
    const [data, setData] = useState<T>(init)
    function init() {
        const result = localStorage.getItem(key)
        if (!result) {
            localStorage.setItem(key, JSON.stringify(initVal))
            return initVal
        }
        return JSON.parse(result)
    }
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data))
    }, [data])
    return { data, setData }
}

export default useLocalStorage