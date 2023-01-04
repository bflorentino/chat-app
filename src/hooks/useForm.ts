import { useState, useCallback } from "react"

export const useForm = (initialState:any) => {

    const [formValues, setFormValues] = useState({...initialState})
    
    const handleInputChanges = ({ target }: any) =>{
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        })
    }
    
    const reset = useCallback(() => {
        setFormValues({...initialState})
    }, [initialState])
    
    return [formValues, handleInputChanges, reset]
}