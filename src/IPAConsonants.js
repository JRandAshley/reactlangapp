import React, {useState, useEffect} from 'react';
import "./App.scss";

/*

THIS COMPONENT IS NOT CURRENTLY IN USE

*/

function IPAConsonants(props) {
    const phonemes = props.array;
    const [headersPOA, setHeadersPOA] = useState([]);
    const [headersMOA, setHeadersMOA] = useState([]);

    function getRowContent(moaToTest){
        let row = [...new Set(Object.values(phonemes)
            .filter(phoneme => phoneme.moa === moaToTest))]

        return row;
    }

    function addRowSpaces(rowPhonemes) {
        let result = []

        headersPOA.forEach(element => { //check what phoneme to put in each column
            var found = false; //no phonemes fit in this column yet
            for(var i = 0; i < rowPhonemes.length; i++) { //check if any of the phoneme in that row matches the column
                
                if(rowPhonemes[i].poa === element) {
                    result.push(rowPhonemes[i].symbol)
                    rowPhonemes.shift()
                    found = true;
                    break;
                }
            }
            if(found === false){
                result.push("")
            }
        });
        return result;
    }

    function getConsonantHeadersPOA() {
        let uniquePOA = [...new Set(Object.values(phonemes)
            .filter(phoneme => phoneme.type === "C")
            .map(phoneme => (phoneme.poa)))];

        return uniquePOA;
    }

    function getConsonantHeadersMOA() {
        let uniqueMOA = [...new Set(Object.values(phonemes)
            .filter(phoneme => phoneme.type === "C")
            .map(phoneme => (phoneme.moa)))];

        return uniqueMOA;
    }

    useEffect(() => {
        const poaHeader = getConsonantHeadersPOA;
        setHeadersPOA(poaHeader);

        const moaHeader = getConsonantHeadersMOA;
        setHeadersMOA(moaHeader);
    }, [phonemes]);

    return (
        <div>
            <table class="table">
                <tr>
                    <th>---</th>
                    {headersPOA.map( e =>
                        <th>{e}</th>)}
                </tr>

                {headersMOA.map(c =>
                <tr>
                    <th>{c}</th>
                    {addRowSpaces(getRowContent(c)).map(d => 
                        <td>
                            <button>{d}</button>
                        </td>)}
                </tr>)}
            </table>
        </div>
    );
}
export default IPAConsonants;