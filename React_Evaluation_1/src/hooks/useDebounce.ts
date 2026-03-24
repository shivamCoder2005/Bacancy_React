import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): { debouncedState: T } {
    const [debouncedState, setDebouncedState] = useState<T>(value);


    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedState(value)
            console.log("debounced value is changed now.....",value)
        }, delay)
        return () => clearTimeout(timerId)
    }, [value])

    return { debouncedState }
}

export default useDebounce