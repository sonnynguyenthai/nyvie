import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, debounce: number) => {
    const [debounceValue, setDebounceValue] = useState<T>()
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, debounce)
        return () => {
            clearTimeout(handler)
        }
    }, [value, debounce])
    return debounceValue
}

export default useDebounce;
