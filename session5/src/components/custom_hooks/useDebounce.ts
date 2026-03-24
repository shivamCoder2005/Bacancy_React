import { useEffect, useState } from "react";

export function useDebounceState(cb: Function, delay: number): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [debouncedValue, setDebouncedValue] = useState<string>("")

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (debouncedValue) cb()
        }, delay)
        return () => clearTimeout(timerId)
    }, [debouncedValue])


    return [debouncedValue, setDebouncedValue]
}