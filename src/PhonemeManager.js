import React, {useState, useEffect} from 'react';
import Phoneme from './Phoneme';
import "./App.scss";

function PhonemeManager() { //default phonemes for development
    const initialData = [
        {symbol: 'A', easyType: 'a', type: 'V', notes: 'It is a',
        height:'Low', backness:'Front', rounding:'Unrounded'},
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
        height:'Mid', backness:'Central', rounding:'Rounded'},
        {symbol:'O', easyType:'o', type:'V', notes:'notes',
        height:'High', backness:'Back', rounding:'Rounded'},
        {symbol: 'U', easyType: 'u', type: 'V', notes: 'It is a',
        height:'Low', backness:'Front', rounding:'Rounded'},
        {symbol: 'E', easyType: 'e', type: 'V', notes: 'It is a',
        height:'Low', backness:'Central', rounding:'Unrounded'}
    ]
    
    const [phonemes, setPhonemes] = useState(initialData)

    const [formC, setFormC] = useState({//consonant form contents
        symbol: "", easyType: "", type: "C", notes: "",
        sol: "Select One", poa: "Select One", moa: "Select One"
    })
    const [formV, setFormV] = useState({//consonant form contents
        symbol: "", easyType: "", type: "V", notes: "",
        height: "Select One", backness: "Select One", rounding: "Select One"
    })

    const [somethingChanged, setSomethingChanged] = useState(false)

    let errors = {}

    const forceUpdate = () => {
        setSomethingChanged(prevState => !prevState);
    }

    const Delete = (phonemeToDelete) => {
        var index = phonemes.indexOf(phonemeToDelete);
        if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
            var abc = phonemes;
            abc.splice(index, 1);
            setPhonemes(abc);
            forceUpdate();
        }
    }

    const handleChange = (event) => {
        const {name, value, id} = event.target

        if(id === "C"){
            setFormC(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
        if(id === "V"){
            setFormV(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault() //prevents the page from automatically reloading

        const whichForm = event.target.name;

        const validatedErrors = validateInfo(eval(whichForm), whichForm)

        errors = validatedErrors;
        console.log(errors)
        

        let errorsFound = !(Object.keys(errors).length === 0 && errors.constructor === Object)
        
        if(!errorsFound){
            setPhonemes(prevState => ([
                ...prevState,
                eval(whichForm)
            ]))
        }

        if (typeof errors.symbol != 'undefined'){document.getElementById(`symbol${whichForm}`).innerHTML = errors.symbol;}
        else{document.getElementById(`symbol${whichForm}`).innerHTML = "";}
        if (typeof errors.easyType != 'undefined'){document.getElementById(`easyType${whichForm}`).innerHTML = errors.easyType;}
        else{document.getElementById(`easyType${whichForm}`).innerHTML = "";}

        if(whichForm === "formC"){
            if (typeof errors.sol != 'undefined'){document.getElementById("sol").innerHTML = errors.sol;}
            else{document.getElementById("sol").innerHTML = "";}
            if (typeof errors.poa != 'undefined'){document.getElementById("poa").innerHTML = errors.poa;}
            else{document.getElementById("poa").innerHTML = "";}
            if (typeof errors.moa != 'undefined'){document.getElementById("moa").innerHTML = errors.moa;}
            else{document.getElementById("moa").innerHTML = "";}
        }
        if(whichForm === "formV"){
            if (typeof errors.rounding != 'undefined'){document.getElementById("rounding").innerHTML = errors.rounding;}
            else{document.getElementById("rounding").innerHTML = "";}
            if (typeof errors.height != 'undefined'){document.getElementById("height").innerHTML = errors.height;}
            else{document.getElementById("height").innerHTML = "";}
            if (typeof errors.backness != 'undefined'){document.getElementById("backness").innerHTML = errors.backness;}
            else{document.getElementById("backness").innerHTML = "";}
        }

        if (typeof errors.uniqueSymbol != 'undefined'){document.getElementById(`uniqueSymbol${whichForm}`).innerHTML = errors.uniqueSymbol;}
        else{document.getElementById(`uniqueSymbol${whichForm}`).innerHTML = "";}
        if (typeof errors.uniqueEasyType != 'undefined'){document.getElementById(`uniqueEasyType${whichForm}`).innerHTML = errors.uniqueEasyType;}
        else{document.getElementById(`uniqueEasyType${whichForm}`).innerHTML = "";}
        if (typeof errors.inUse != 'undefined'){document.getElementById(`inUse${whichForm}`).innerHTML = errors.inUse;}
        else{document.getElementById(`inUse${whichForm}`).innerHTML = "";}
    }

    const validateInfo = (values, whichForm) => {
        let infoErrors = {}

        if(!values.symbol.trim()){
            infoErrors.symbol = "Symbol is required"
        }
        if(!values.easyType.trim()){
            infoErrors.easyType = "Easy Type is required"
        }

        if(whichForm === "formC"){
            if(values.sol === "Select One"){
                infoErrors.sol = "State of the Larynx is required"
            }
            if(values.poa === "Select One"){
                infoErrors.poa = "Place of Articulation is required"
            }
            if(values.moa === "Select One"){
                infoErrors.moa = "Manner of Articulation is required"
            }
        }
        if(whichForm === "formV"){
            if(values.rounding === "Select One"){
                infoErrors.rounding = "Rounding is required"
            }
            if(values.height === "Select One"){
                infoErrors.height = "Height is required"
            }
            if(values.backness === "Select One"){
                infoErrors.backness = "Backness is required"
            }
        }

        phonemes.forEach(phoneme => {
            if(values.symbol === phoneme.symbol){
                infoErrors.uniqueSymbol = "Symbol must be unique"
            }
            if(values.easyType === phoneme.easyType){
                infoErrors.uniqueEasyType = "Easy Type must be unique"
            }

            if(whichForm === "formC"){
                if(values.sol === phoneme.sol && values.moa === phoneme.moa && values.poa === phoneme.poa){
                    infoErrors.inUse = "Phoneme must not already be in use"
                }
            }
            if(whichForm === "formV"){
                if(values.rounding === phoneme.rounding && values.height === phoneme.height && values.backness === phoneme.backness){
                    infoErrors.inUse = "Phoneme must not already be in use"
                }
            }
        });
        return infoErrors;
    }

    /////////////////////////////////////////////////////////////////

    //headers for consonants table
    const [headersPOA, setHeadersPOA] = useState([]);
    const [headersMOA, setHeadersMOA] = useState([]);

    //headers for vowel table
    const [headersBackness, setHeadersBackness] = useState([]);
    const [headersHeight, setHeadersHeight] = useState([]);

    ///////////////////////////////////////////////////////////////

    function getRowContentC(moaToTest){// get consonant table row contents
        let row = Object.values(phonemes)
            .filter(phoneme => phoneme.moa === moaToTest)
        return row;
    }

    function addRowSpacesC(rowPhonemes) {// add spacing to consonant table rows
        var result = [];
        result.splice(0, result.length)

        headersPOA.forEach(element => { //check what phoneme to put in each column
            var foundUnvoiced = false; //no unvoiced phonemes fit in this column yet
            var foundVoiced = false; //no voiced phonemes fit in this column yet
            var phonemesInColumn = [] //both voiced and unvoiced phonemes in that column
            for(var i = 0; i < rowPhonemes.length; i++) { //check if any of the phoneme in that row matches the column
                if(rowPhonemes[i].poa === element) { //the phoneme has that poa
                    phonemesInColumn.push(rowPhonemes[i])
                }
            }
            for(var i = 0; i < phonemesInColumn.length; i++){//check if unvoiced
                if(phonemesInColumn[i].sol === "Unvoiced"){
                    result.push(phonemesInColumn[i])
                    phonemesInColumn.splice(i, 1)
                    foundUnvoiced = true
                }
            }
            if(foundUnvoiced === false){
                result.push("")
            }

            for(var i = 0; i < phonemesInColumn.length; i++){//check if voiced
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



    function getRowContentV(heightToTest){// get vowel table row contents
        let row = Object.values(phonemes)
            .filter(phoneme => phoneme.height === heightToTest)
        return row;
    }

    function addRowSpacesV(rowPhonemes) {// add spacing to vowel table rows
        let resultV = []

        headersBackness.forEach(element => { //check what phoneme to put in each column
            var foundUnrounded = false; //no unrounded phonemes fit in this column yet
            var foundRounded = false; //no rounded phonemes fit in this column yet
            var phonemesInColumn = [] //both rounded and unrounded phonemes in that column
            for(var i = 0; i < rowPhonemes.length; i++) { //check if any of the phoneme in that row matches the column
                if(rowPhonemes[i].backness === element) { //the phoneme has that backness
                    phonemesInColumn.push(rowPhonemes[i])
                }
            }

            for(var i = 0; i < phonemesInColumn.length; i++){//check if unrounded
                if(phonemesInColumn[i].rounding === "Unrounded"){
                    resultV.push(phonemesInColumn[i])
                    phonemesInColumn.splice(i, 1)
                    foundUnrounded = true
                }
            }

            if(foundUnrounded === false){
                resultV.push("")
            }

            for(var i = 0; i < phonemesInColumn.length; i++){//check if rounded
                if(phonemesInColumn[i].rounding === "Rounded"){
                    resultV.push(phonemesInColumn[i])
                    phonemesInColumn.splice(i, 1)
                    foundRounded = true
                }
            }

            if(foundRounded === false){
                resultV.push("")
            }
        });
        return resultV;
    }

    //////////////////////////////////////////////////////////////////////////

    function getConsonantHeadersPOA() {//get unique POA
        let uniquePOA = [...new Set(Object.values(phonemes)
            .filter(phoneme => phoneme.type === "C")
            .map(phoneme => (phoneme.poa)))];

            var order = ["Bilabial", "Labiodental", "Dental", "Alveolar", 
            "Postalveolar", "Retroflex", "Palatal", "Velar", "Uvular", 
            "Pharyngeal", "Glottal"];

            uniquePOA.sort(function (a,b){
                return order.indexOf(a) - order.indexOf(b)
            });

        return uniquePOA;
    }

    function getConsonantHeadersMOA() {//get unique MOA
        let uniqueMOA = [...new Set(Object.values(phonemes)
            .filter(phoneme => phoneme.type === "C")
            .map(phoneme => (phoneme.moa)))];

            var order = ["Plosive", "Nasal", "Trill", "Tap or Flap", 
            "Fricative", "Lateral fricative", "Approximant", "Lateral approximant"];

            uniqueMOA.sort(function (a,b){
                return order.indexOf(a) - order.indexOf(b)
            });

        return uniqueMOA;
    }

    function getConsonantHeadersBackness() {//get unique Backness
        let uniqueBackness = [...new Set(Object.values(phonemes)
            .filter(phoneme => phoneme.type === "V")
            .map(phoneme => (phoneme.backness)))];

            var order = ["Front", "Near-front", "Central", "Near-back", 
            "Back"];

            uniqueBackness.sort(function (a,b){
                return order.indexOf(a) - order.indexOf(b)
            });

        return uniqueBackness;
    }

    function getConsonantHeadersHeight() {//get unique Height
        let uniqueHeight = [...new Set(Object.values(phonemes)
            .filter(phoneme => phoneme.type === "V")
            .map(phoneme => (phoneme.height)))];

            var order = ["High", "Near-high", "High-mid", "Mid", 
            "Low-mid", "Low"];

            uniqueHeight.sort(function (a,b){
                return order.indexOf(a) - order.indexOf(b)
            });

        return uniqueHeight;
    }

    ////////////////////////////////////////////////////////////////////////

    useEffect(() => {//update consonant table headers when phonemes change
        const poaHeader = getConsonantHeadersPOA;
        setHeadersPOA(poaHeader);

        const moaHeader = getConsonantHeadersMOA;
        setHeadersMOA(moaHeader);

        const backnessHeader = getConsonantHeadersBackness;
        setHeadersBackness(backnessHeader);

        const heightHeader = getConsonantHeadersHeight;
        setHeadersHeight(heightHeader);
    }, [phonemes, somethingChanged]);

    return (
        <div class="flexbox-container"> {/* The form to add consonants */}

            <div class="flexbox-row-container">
                {/* The form to add consonants */}
                <div class="flexbox-item">
                    <h1>Consonant Editor</h1>
                    <form name="formC" onSubmit={handleSubmit}>
                        <div>
                            <label>Phonetic Symbol</label>
                            <input
                                type="text"
                                value={formC.symbol}
                                onChange={handleChange}
                                name="symbol"
                                id="C"
                            />
                            <p id="symbolformC" style={{color: 'red'}}></p>
                        </div>
                        <div>
                            <label>Easy Type</label>
                            <input
                                type="text"
                                value={formC.easyType}
                                onChange={handleChange}
                                name="easyType"
                                id="C"
                            />
                            <p id="easyTypeformC" style={{color: 'red'}}></p>
                        </div>
                        <div>
                            <label class="tooltip">State of the Larynx
                                <span class="tooltiptext">As the vocal folds vibrate, the resulting vibration produces a "buzzing" quality to the speech, called voice or voicing or pronunciation.
                                </span>
                            </label>
                            <select value={formC.sol} onChange={handleChange} name="sol" id="C">
                                <option value="Select One">Select One</option>
                                <option value="Voiced">Voiced</option>
                                <option value="Unvoiced">Unvoiced</option>
                            </select>
                            <p id="sol" style={{color: 'red'}}></p>
                        </div>
                        <div>
                            <label class="tooltip">Place of Articulation
                                <span class="tooltiptext">The place of articulation is the point of contact where an obstruction occurs in the vocal tract.
                                </span>
                            </label>

                            <select value={formC.poa} onChange={handleChange} name="poa" id="C">
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
                            <p id="poa" style={{color: 'red'}}></p>
                        </div>
                        <div>
                            <label class="tooltip">Manner of Articulation
                                <span class="tooltiptext">The manner of articulation is the configuration and interaction of the articulators (speech organs such as the tongue, lips, and palate) when making a speech sound.
                                </span>
                            </label>
                            <select value={formC.moa} onChange={handleChange} name="moa" id="C">
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
                            <p id="moa" style={{color: 'red'}}></p>
                        </div>
                        <div>
                            <label>Notes</label>
                            <textarea
                                value={formC.notes}
                                onChange={handleChange}
                                name="notes"
                                id="C"
                            />
                        </div>
                        <p id="uniqueSymbolformC" style={{color: 'red'}}></p>
                        <p id="uniqueEasyTypeformC" style={{color: 'red'}}></p>
                        <p id="inUseformC" style={{color: 'red'}}></p>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                


                <div class="flexbox-item">
                    <table class="table"> {/* Consonant Table */}
                        <tr>
                            <th colSpan="2">---</th>
                            {headersPOA.map( e => //headers for POA
                                <th colSpan="2">{e}</th>)}
                        </tr>

                        {headersMOA.map(c => //headers for MOA
                        <tr>
                            <th colSpan="2">{c}</th>
                            {addRowSpacesC(getRowContentC(c)).map(d => //row content with spaces
                                <td align= "center" key={d.symbol} width= "60px" height= "40px">
                                    {d.symbol !== undefined ? <div><p>{d.symbol}</p>
                                    <button onClick={() => Delete(d)}>X</button></div>
                                    : <p></p>}
                                </td>    
                                )}
                        </tr>)}
                    </table>
                </div>
            </div>

            <div class="flexbox-row-container">
                {/* The form to add vowels */}
                <div class="flexbox-item" overflow-y="hidden">
                    <h1>Vowel Editor</h1>
                    <form name="formV" onSubmit={handleSubmit}>
                        <div>
                            <label>Phonetic Symbol</label>
                            <input
                                type="text"
                                value={formV.symbol}
                                onChange={handleChange}
                                name="symbol"
                                id="V"
                            />
                            <p id="symbolformV" style={{color: 'red'}}></p>
                        </div>
                        <div>
                            <label>Easy Type</label>
                            <input
                                type="text"
                                value={formV.easyType}
                                onChange={handleChange}
                                name="easyType"
                                id="V"
                            />
                            <p id="easyTypeformV" style={{color: 'red'}}></p>
                        </div>
                        <div>
                            <label class="tooltip">Rounding
                                <span class="tooltiptext">ADD DESCRIPTION
                                </span>
                            </label>
                            <select value={formV.rounding} onChange={handleChange} name="rounding" id="V">
                                <option value="Select One">Select One</option>
                                <option value="Rounded">Rounded</option>
                                <option value="Unrounded">Unrounded</option>
                            </select>
                            <p id="rounding" style={{color: 'red'}}></p>
                        </div>
                        <div>
                            <label class="tooltip">Height
                                <span class="tooltiptext">ADD DESCRIPTION
                                </span>
                            </label>
                            <select value={formV.height} onChange={handleChange} name="height" id="V">
                                <option value="Select One">Select One</option>
                                <option value="High">High</option>
                                <option value="Near-high">Near-high</option>
                                <option value="High-mid">High-mid</option>
                                <option value="Mid">Mid</option>
                                <option value="Low-mid">Low-mid</option>
                                <option value="Low">Low</option>
                            </select>
                            <p id="height" style={{color: 'red'}}></p>
                        </div>
                        <div>
                            <label class="tooltip">Backness
                                <span class="tooltiptext">ADD DESCRIPTION
                                </span>
                            </label>
                            <select value={formV.backness} onChange={handleChange} name="backness" id="V">
                                <option value="Select One">Select One</option>
                                <option value="Front">Front</option>
                                <option value="Near-front">Near-front</option>
                                <option value="Central">Central</option>
                                <option value="Near-back">Near-back</option>
                                <option value="Back">Back</option>
                            </select>
                            <p id="backness" style={{color: 'red'}}></p>
                        </div>
                        <div>
                            <label>Notes</label>
                            <textarea
                                value={formV.notes}
                                onChange={handleChange}
                                name="notes"
                                id="V"
                            />
                        </div>
                        <p id="uniqueSymbolformV" style={{color: 'red'}}></p>
                        <p id="uniqueEasyTypeformV" style={{color: 'red'}}></p>
                        <p id="inUseformV" style={{color: 'red'}}></p>
                        <button type="submit">Submit</button>
                    </form>
                </div>


                <div class="flexbox-item">
                    <table class="table"> {/* Vowel Table */}
                        <tr>
                            <th colSpan="2">---</th>
                            {headersBackness.map( e => //headers Backness
                                <th colSpan="2">{e}</th>)}
                        </tr>

                        {headersHeight.map(c => //headers for Height
                        <tr>
                            <th colSpan="2">{c}</th>
                            {addRowSpacesV(getRowContentV(c)).map(d => //row content with spaces
                                <td align= "center" width= "60px" height= "40px">
                                    {d.symbol !== undefined ? <div><p>{d.symbol}</p>
                                    <button onClick={() => Delete(d)}>X</button></div>
                                    : <p></p>}
                                </td>    
                                )}
                        </tr>)}
                    </table>
                </div>
            </div>


            <div class="flexbox-row-container">
                <div class="flexbox-container">
                    <h1 class="header">Consonants</h1>
                    <div class="flexbox-scroller">
                    {/* List of Consonants */}
                        {Object.values(phonemes).filter(phoneme => phoneme.type === "C").map(phoneme =>(
                            <Phoneme symbol={phoneme.symbol} easyType={phoneme.easyType} type={phoneme.type} notes={phoneme.notes}
                            sol={phoneme.sol} poa={phoneme.poa} moa={phoneme.moa}/>
                        ))}
                    </div>
                </div>

                <div class="flexbox-container">
                    <h1 class="header">Vowels</h1>
                    <div class="flexbox-scroller">
                        {/* List of Vowels */}
                        {Object.values(phonemes).filter(phoneme => phoneme.type === "V").map(phoneme =>(
                            <Phoneme symbol={phoneme.symbol} easyType={phoneme.easyType} type={phoneme.type} notes={phoneme.notes}
                            height={phoneme.height} backness={phoneme.backness} rounding={phoneme.rounding} tenseness={phoneme.tenseness}/>
                        ))}
                    </div>
                </div>
            </div>

            <div class="circle1"></div>
            <div class="circle2"></div>
        </div>
    );
}
export default PhonemeManager;