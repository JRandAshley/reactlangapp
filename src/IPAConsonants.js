import React, {useState, useEffect} from 'react';
import "./App.css";

function IPAConsonants(props) {
    const phonemes = props.array;
    const [headersPOA, setHeadersPOA] = useState([]);
    const [headersMOA, setHeadersMOA] = useState([]);

    function getRowContent(moaToTest){
        let row = [...new Set(phonemes
            .filter(phoneme => phoneme.moa === moaToTest))]

            console.log(moaToTest)
        return row;
    }

    function addRowSpaces(rowPhonemes) {
        let result = []
        headersPOA.forEach(element => { //check what phoneme to put in each column
            for(var i = 0; i < rowPhonemes.length; i++) { //check if each phoneme in that row matches the column
                if (rowPhonemes[i].poa == element) {
                    result.push(rowPhonemes[i].symbol)
                    break;
                }
                result.push("")
            }
        });
        console.log(result)
        return result;
    }

    function getConsonantHeadersPOA() {
        let uniquePOA = [...new Set(phonemes
            .filter(phoneme => phoneme.type === "C")
            .map(phoneme => (phoneme.poa)))];

        console.log(uniquePOA);

        return uniquePOA;
    }

    function getConsonantHeadersMOA() {
        let uniqueMOA = [...new Set(phonemes
            .filter(phoneme => phoneme.type === "C")
            .map(phoneme => (phoneme.moa)))];

        console.log(uniqueMOA)

        return uniqueMOA;
    }

    useEffect(() => {
        const poaHeader = getConsonantHeadersPOA;
        setHeadersPOA(poaHeader);
        console.log(headersPOA);

        const moaHeader = getConsonantHeadersMOA;
        setHeadersMOA(moaHeader);
        console.log(headersMOA);

        console.log(phonemes);
    }, []);

    return (
        <div>
            <button onClick={getConsonantHeadersPOA}>POA</button>
            <button onClick={getConsonantHeadersMOA}>MOA</button>

            <table>
                <tr>
                    <th>---</th>
                    {headersPOA.map( e =>
                        <th>{e}</th>)}
                </tr>

                {headersMOA.map(c =>
                <tr>
                    <th>{c}</th>
                    {addRowSpaces(getRowContent(c)).map(d => 
                        <td>{d}</td>)}
                </tr>)}
            </table>
        </div>
    );
}
export default IPAConsonants;