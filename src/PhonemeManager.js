import React, {useState, useEffect} from 'react';
import Phoneme from './Phoneme';
import "./App.scss";

function PhonemeManager() { //default phonemes for development
    const [phonemes, setPhonemes] = useState([
        {symbol: 'A', easyType: 'a', type: 'V', notes: 'It is a',
        height:'low', backness:'front', rounding:'unrounded', tenseness:'lax'},
        {symbol: 'B', easyType: 'b', type: 'C', notes: 'b letter',
        sol: 'Voiced', poa: 'Bilabial', moa: 'Plosive'},
        {symbol: 'D', easyType: 'd', type: 'C', notes: '',
        sol: 'Voiced', poa: 'Alveolar', moa: 'Plosive'},
        {symbol: 'F', easyType: 'f', type: 'C', notes: '',
        sol: 'Unvoiced', poa: 'Labiodental', moa: 'Fricative'},
        {symbol: 'K', easyType: 'k', type: 'C', notes: '',
        sol: 'Unvoiced', poa: 'Velar', moa: 'Plosive'},
        {symbol: 'R', easyType: 'r', type: 'C', notes: '',
        sol: 'Voiced', poa: 'Alveolar', moa: 'Trill'},
        {symbol: 'S', easyType: 's', type: 'C', notes: '',
        sol: 'Unvoiced', poa: 'Alveolar', moa: 'Fricative'},
        {symbol: 'C', easyType: 'c', type: 'C', notes: 'a c',
        sol: 'Unvoiced', poa: 'Palatal', moa: 'Plosive'},
        {symbol: 'I', easyType: 'i', type: 'V', notes: 'an I',
        height:'mid', backness:'mid', rounding:'rounded', tenseness:'lax'},
        {symbol:'O', easyType:'o', type:'V', notes:'notes',
        height:'high', backness:'back', rounding:'rounded', tenseness:'tense'}
    ])

    const [formC, setFormC] = useState({//consonant form contents
        symbol: "", easyType: "", type: "C", notes: "",
        sol: "Select One", poa: "Select One", moa: "Select One"
    })

    const [errors, setErrors] = useState({
        /*symbol: "", easyType: "", notes: "",
        sol: "", poa: "", moa: ""*/
    })

    const updateConsonantForm = (d) => {
        console.log(d)
        //setCurrentConsonant(d)
        setFormC(prevState => ({
            ...prevState,
            symbol: d.symbol,
            easyType: d.easyType,
            notes: d.notes,
            sol: d.sol,
            poa: d.poa,
            moa: d.moa
        }))
        console.log(formC)
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormC(prevState => ({
            ...prevState,
            [name]: value
        }))
        //props.formCallback(form);
    }

    const handleSubmit = (event) => {
        event.preventDefault() //prevents the page from automatically reloading

        const validatedErrors = validateInfo(formC)
        console.log(validatedErrors)

        /*
        function updateErrors(validatedErrors) {
            return new Promise(resolve => {
                setErrors(
                    validatedErrors, () => resolve()
                );
            });
        }
        async function callUpdateErrors(){
            await updateErrors(validatedErrors);
        }
        callUpdateErrors()
        */
        
        setErrors(//delayed due to being asyncronous
            validatedErrors
        )
        

        let errorsFound = Object.keys(errors).length === 0 && errors.constructor === Object

        console.log(errors)

        errorsFound = true
        console.log(errorsFound)
        
        if(errorsFound){
            setPhonemes(prevState => ([
                ...prevState,
                formC
            ]))
        }
    }

    const validateInfo = (values) => {
        let infoErrors = {}

        if(!values.symbol.trim()){
            infoErrors.symbol = "Symbol is required"
        }
        if(!values.easyType.trim()){
            infoErrors.easyType = "Easy Type is required"
        }
        if(values.sol === "Select One"){
            infoErrors.sol = "State of the Larynx is required"
        }
        if(values.poa === "Select One"){
            infoErrors.poa = "Place of Articulation is required"
        }
        if(values.moa === "Select One"){
            infoErrors.moa = "Manner of Articulation is required"
        }

        phonemes.forEach(phoneme => {
            if(values.symbol === phoneme.symbol){
                infoErrors.uniqueSymbol = "Symbol must be unique"
            }
            if(values.easyType === phoneme.easyType){
                infoErrors.uniqueEasyType = "Easy Type must be unique"
            }
            if(values.sol === phoneme.sol && values.moa === phoneme.moa && values.poa === phoneme.poa){
                infoErrors.inUse = "Phoneme must not already be in use"
            }
        });
        return infoErrors;
    }

    //headers for consonants table
    const [headersPOA, setHeadersPOA] = useState([]);
    const [headersMOA, setHeadersMOA] = useState([]);

    function getRowContent(moaToTest){// get consonant table row contents
        //let row = [...new Set(Object.values(phonemes)
        //    .filter(phoneme => phoneme.moa === moaToTest))]

        let row = Object.values(phonemes)
            .filter(phoneme => phoneme.moa === moaToTest)
        return row;
    }

    function addRowSpaces(rowPhonemes) {// add spacing to consonant table rows
        let result = []

        headersPOA.forEach(element => { //check what phoneme to put in each column
            var foundUnvoiced = false; //no unvoiced phonemes fit in this column yet
            var foundVoiced = false; //no voiced phonemes fit in this column yet
            var phonemesInColumn = [] //both voiced and unvoiced phonemes in that column
            for(var i = 0; i < rowPhonemes.length; i++) { //check if any of the phoneme in that row matches the column
                if(rowPhonemes[i].poa === element) { //the phoneme has that poa
                    phonemesInColumn.push(rowPhonemes[i])
                    rowPhonemes.splice(i, 1)

                    /*
                    result.push(rowPhonemes[i])
                    rowPhonemes.splice(i, 1)
                    found = true;
                    break;
                    */
                }
            }
            for(var i = 0; i < phonemesInColumn.length; i++){//check if unvoiced of unvoiced
                if(phonemesInColumn[i].sol === "Unvoiced"){
                    result.push(phonemesInColumn[i])
                    phonemesInColumn.splice(i, 1)
                    foundUnvoiced = true
                }
            }
            if(foundUnvoiced === false){
                result.push("")
            }

            for(var i = 0; i < phonemesInColumn.length; i++){//check if voiced of unvoiced
                if(phonemesInColumn[i].sol === "Voiced"){
                    result.push(phonemesInColumn[i])
                    phonemesInColumn.splice(i, 1)
                    foundVoiced = true
                }
            }
            if(foundVoiced === false){
                result.push("")
            }
        });
        return result;
    }

    function getConsonantHeadersPOA() {//get unique POA
        let uniquePOA = [...new Set(Object.values(phonemes)
            .filter(phoneme => phoneme.type === "C")
            .map(phoneme => (phoneme.poa)))];

        return uniquePOA;
    }

    function getConsonantHeadersMOA() {//get unique MOA
        let uniqueMOA = [...new Set(Object.values(phonemes)
            .filter(phoneme => phoneme.type === "C")
            .map(phoneme => (phoneme.moa)))];

        return uniqueMOA;
    }

    useEffect(() => {

    }, [formC])

    useEffect(() => {//update consonant table headers when phonemes change
        const poaHeader = getConsonantHeadersPOA;
        setHeadersPOA(poaHeader);

        const moaHeader = getConsonantHeadersMOA;
        setHeadersMOA(moaHeader);
    }, [phonemes]);

    return (
        <div> {/* The form to add consonants */}
            {/*}
            <ConsonantForm formCallback = {consonantFormCallback}
            formData = {currentConsonant}/>
            */}

            {/* The form to add consonants */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Phonetic Symbol</label>
                    <input
                        type="text"
                        value={formC.symbol}
                        onChange={handleChange}
                        name="symbol"
                    />
                    <p style={{color: 'red'}}>{errors.symbol}</p>
                </div>
                <div>
                    <label>Easy Type</label>
                    <input
                        type="text"
                        value={formC.easyType}
                        onChange={handleChange}
                        name="easyType"
                    />
                    <p style={{color: 'red'}}>{errors.easyType}</p>
                </div>
                <div>
                    <label>State of the Larynx</label>
                    <select value={formC.sol} onChange={handleChange} name="sol">
                        <option value="Select One">Select One</option>
                        <option value="Voiced">Voiced</option>
                        <option value="Unvoiced">Unvoiced</option>
                    </select>
                    <p style={{color: 'red'}}>{errors.sol}</p>
                </div>
                <div>
                    <label>Place of Articulation</label>
                    <select value={formC.poa} onChange={handleChange} name="poa">
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
                    <p style={{color: 'red'}}>{errors.poa}</p>
                </div>
                <div>
                    <label>Manner of Articulation</label>
                    <select value={formC.moa} onChange={handleChange} name="moa">
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
                    <p style={{color: 'red'}}>{errors.moa}</p>
                </div>
                <div>
                    <label>Notes</label>
                    <textarea
                        value={formC.notes}
                        onChange={handleChange}
                        name="notes"
                    />
                </div>
                <p style={{color: 'red'}}>{errors.uniqueSymbol}</p>
                <p style={{color: 'red'}}>{errors.uniqueEasyType}</p>
                <p style={{color: 'red'}}>{errors.inUse}</p>
                <button type="submit">Submit</button>
            </form>

            <hr />
            {/*
            <IPAConsonants array = {phonemes}/>
            */}
            <table class="table"> {/* Consonant Table */}
                <tr>
                    <th colSpan="2">---</th>
                    {headersPOA.map( e => //headers for POA
                        <th colSpan="2">{e}</th>)}
                </tr>

                {headersMOA.map(c => //headers for MOA
                <tr>
                    <th colSpan="2">{c}</th>
                    {addRowSpaces(getRowContent(c)).map(d => //row content with spaces
                        <td align= "center" width= "60px" height= "40px">
                            <button>{d.symbol}</button>
                        </td>
                            
                        )}

                        {/*
                        (d.sol === "Voiced")
                        ? <td align = "right">
                        <button onClick={() => updateConsonantForm(d)}>{d.symbol}</button>
                        </td>
                        : <td align = "left">
                            <button onClick={() => updateConsonantForm(d)}>{d.symbol}</button>
                        </td>)}
                        */}
                </tr>)}
            </table>



            <hr /> {/* List of Consonants */}
            <h1 class="header">Consonants</h1>
            <div class="float-container"> 
                {Object.values(phonemes).filter(phoneme => phoneme.type === "C").map(phoneme =>(
                    <Phoneme symbol={phoneme.symbol} easyType={phoneme.easyType} type={phoneme.type} notes={phoneme.notes}
                    sol={phoneme.sol} poa={phoneme.poa} moa={phoneme.moa}/>
                ))}
            </div>

            <hr /> {/* List of Vowels */}
            <h1 class="header">Vowels</h1>
            <div class="float-container">
                {Object.values(phonemes).filter(phoneme => phoneme.type === "V").map(phoneme =>(
                    <Phoneme symbol={phoneme.symbol} easyType={phoneme.easyType} type={phoneme.type} notes={phoneme.notes}
                    height={phoneme.height} backness={phoneme.backness} rounding={phoneme.rounding} tenseness={phoneme.tenseness}/>
                ))}
            </div>
        </div>
    );
}
export default PhonemeManager;