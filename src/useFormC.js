import { useState, useEffect } from "react";

/*

THIS COMPONENT IS NOT CURRENTLY IN USE

*/

const useFormC = () => {
    const [values, setValues] = useState({
        symbol: "",
        easyType: "",
        type: "C",
        notes: "",
        sol: "",
        poa: "",
        moa: ""
    })

    //const [errors, setErrors] = useState({})

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return {handleChange}
};

export default useFormC;