// import { useEffect, useRef, useState } from "react"

// export default function useThrottle(cb: Function, delay: number): [string, React.Dispatch<React.SetStateAction<string>>] {
//     const [throttleValue, setthrottleValue] = useState<string>("")
//     const timerId = useRef<number>(-1)

//     useEffect(() => {
//         if (timerId.current != -1) return
//         cb()
//         timerId.current = setTimeout(() => {
//             timerId.current = -1
//         }, delay)
//     }, [throttleValue])


//     return [throttleValue, setthrottleValue]
// }


export default function useThrottle(cb: Function, delay: number) {
    let timerId = -1;
    return function throttle(...args:any[]) {
        if (timerId != -1) return
        cb(...args)
        timerId = setTimeout(() => {
            timerId = -1
        }, delay)
    }
}