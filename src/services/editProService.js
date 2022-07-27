import { useState }  from 'react'
import  Cookies  from 'universal-cookie'


const identity_url = process.env.REACT_APP_IDENTITY_URL

export const useEditService = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const cookies = new Cookies()
    const userId = cookies.get('userId')

    const editUser = async(payload) => {
        setLoading(true)

        try{
            const res = await fetch(`${identity_url}/user/${userId}`, {
                method: 'PATCH',
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
        }catch(err) {
            setLoading(false)
            setError(err.message)
        }

    }

    const clearError = () => setError(null)

    return { error, loading, editUser, clearError };
}
