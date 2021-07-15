import React, {useEffect, useState} from 'react'

/*

THIS COMPONENT IS NOT CURRENTLY IN USE

*/

function ConsonantForm(props) {
    const [form, setForm] = useState({
        symbol: "", easyType: "", type: "C", notes: "",
        sol: "", poa: "", moa: ""
    })

    useEffect(() => { //update form data
        setForm(props.formData)
    }, []);
    
    const formCallback = () => {
        props.formCallback(form);
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
        //props.formCallback(form);
    }

    const handleSubmit = (event) => {
        //alert(`${form.symbol} ${form.easyType} ${form.sol} ${form.moa} ${form.poa} ${form.notes}`)
        event.preventDefault() //prevents the page from automatically reloading
        formCallback()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Phonetic Symbol</label>
                <input
                    type="text"
                    value={form.symbol}
                    onChange={handleChange}
                    name="symbol"
                />
            </div>
            <div>
                <label>Easy Type</label>
                <input
                    type="text"
                    value={form.easyType}
                    onChange={handleChange}
                    name="easyType"
                />
            </div>
            <div>
                <label>State of the Larynx</label>
                <select value={form.sol} onChange={handleChange} name="sol">
                    <option value="Select One">Select One</option>
                    <option value="Voiced">Voiced</option>
                    <option value="Unvoiced">Unvoiced</option>
                </select>
            </div>
            <div>
                <label>Place of Articulation</label>
                <select value={form.poa} onChange={handleChange} name="poa">
                    <option value="Select One">Select One</option>
                    <option value="Bilabial">Bilabial</option>
                    <option value="Labiodental">Labiodental</option>
                    <option value="Dental">Dental</option>
                    <option value="Alveolar">Alveolar</option>
                    <option value="Postalveolar">Postalveolar</option>
                    <option value="Retroflex">Retroflex</option>
                    <option value="Palatal">Palatal</option>
                    <option value="Velar">Velar</option>
                    <option value="Uvular">Uvular</option>
                    <option value="Pharyngeal">Pharyngeal</option>
                    <option value="Glottal">Glottal</option>
                </select>
            </div>
            <div>
                <label>Manner of Articulation</label>
                <select value={form.moa} onChange={handleChange} name="moa">
                    <option value="Select One">Select One</option>
                    <option value="Plosive">Plosive</option>
                    <option value="Nasal">Nasal</option>
                    <option value="Trill">Trill</option>
                    <option value="Tap or Flap">Tap or Flap</option>
                    <option value="Fricative">Fricative</option>
                    <option value="Lateral fricative">Lateral fricative</option>
                    <option value="Approximant">Approximant</option>
                    <option value="Lateral approximant">Lateral approximant</option>
                </select>
            </div>
            <div>
                <label>Notes</label>
                <textarea
                    value={form.notes}
                    onChange={handleChange}
                    name="notes"
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}


export default ConsonantForm;