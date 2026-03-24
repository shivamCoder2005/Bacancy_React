import { useEffect, useState } from "react";

function useFetch<T>(url: string, initVal: T): { data: T, isLoading: boolean, error: string } {
    const [data, setData] = useState<T>(initVal)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    
    async function handleFetch(url: string) {
        try {
            setError("")
            setIsLoading(true)
            const response = await fetch(url)
            if (!response.ok) {
                setError(`HTTP Error :- ${response.status}`)
            }
            const result: T = await response.json()
            setData(result)
            setIsLoading(false)
        } catch (error) {
            if (error instanceof Error)
                setError(error.message)
            else
                setError(`Error while fetching data ${error}`)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleFetch(url)
    }, [url])

    return { data, isLoading, error }
}

export default useFetch;