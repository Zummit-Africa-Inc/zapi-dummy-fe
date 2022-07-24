import { useReducer } from 'react'

// Hook to handle form state
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'text':
            return {
                ...state,
                [action.key]: action.value,
            }
        case 'check':
            return {
                ...state,
                [action.key]: !action.value
            }
            default:
                return state
            }
        }


// @param {Object} initialState - Initial state of the form
export const useFormInputs = (initialState) => {
    // useReducer is stores data better than useState
    // The data persists even when the component is unmounted
    const [inputs, dispatch] = useReducer(inputReducer, initialState)

    // This function is used to update the state
    // It takes in the key and value of the input
    const handleInputChange = (e) => {
        dispatch({type: 'text', key:[e.target.name], value: e.target.value})
    }

    //This function handles checkbox switches
    const handleCheckChange = (e) => {
        dispatch({type: 'check', key:[e.target.name], value: e.target.check})
    }

    return { inputs, handleInputChange, handleCheckChange }
}