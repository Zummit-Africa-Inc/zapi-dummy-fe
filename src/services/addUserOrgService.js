import { useState } from 'react'


const base_url = process.env.REACT_APP_BASE_URL


export const useAddUserOrgService = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const orgUserAdd = async(payload, profileID, orgId ) => {
        setLoading(true)
        
        try {
            const res = await fetch(`${base_url}/organisation/${profileID}/addUser/${orgId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await res.json()
            if(!res.ok) {
                throw new Error(data.message)
            }
            setLoading(false)
            return data
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    const clearError = () => {
        setError(null)
    }
    return { error, loading, orgUserAdd, clearError }
}
