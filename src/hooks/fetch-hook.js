import { useCallback, useEffect, useRef, useState } from 'react'

export const useHttpRequest = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const activeHttpRequests = useRef([])

    // Async function to send request using useCallback so the function is memoized
    // Function params are url, method, body and headers
    // Method is set to get by default
    const sendRequest = useCallback(async(url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        
        // This is for if for whatever reason, the request is aborted so it can stop the function cleanly
        // It can be modified to manually abort, set timeout and give concise reasons for abortion
        const httpAbortCtrl = new AbortController()
        activeHttpRequests.current.push(httpAbortCtrl)

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            })
            const data = await response.json()

            // Filter every other request controllers except the abort method
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl)

            if(!response.ok) {
                throw new Error(data.message)
            }

            setLoading(false)
            return data
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    // Empty dependency array to run function only once
    },[])

    // Function clear error
    const clearError = () => setError(null)

    // Clean up and abort after every request
    useEffect(() => {
        return () => activeHttpRequests.current.forEach(abortCtrl => {
            abortCtrl.abort()}
        )
    // Empty dependency array to run function only once
    },[])

    return { loading, error, clearError, sendRequest }
}