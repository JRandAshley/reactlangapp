import React, {useState, useEffect} from 'react';
import Phoneme from './Phoneme';
import IPAConsonants from './IPAConsonants';
import "./App.css";

function PhonemeManager() {
    const [phonemes, setPhonemes] = useState([
        {symbol: 'A', easyType: 'a', type: 'V', notes: 'It is a',
        height:'low', backness:'front', rounding:'unrounded', tenseness:'lax'},
        {symbol: 'B', easyType: 'b', type: 'C', notes: 'b letter',
        sol: 'state', poa: 'place', moa: 'manner'},
        {symbol: 'C', easyType: 'c', type: 'C', notes: 'a c',
        sol: 'state c', poa: 'place c', moa: 'manner c'},
        {symbol: 'I', easyType: 'i', type: 'V', notes: 'an I',
        height:'mid', backness:'mid', rounding:'rounded', tenseness:'lax'},
        {symbol:'O', easyType:'o', type:'V', notes:'notes',
        height:'high', backness:'back', rounding:'rounded', tenseness:'tense'}
    ])

    return (
        <div>
            <IPAConsonants />
            <hr />

            <h1 class="header">Consonants</h1>
            <div class="float-container">
                {phonemes.filter(phoneme => phoneme.type === "C").map(phoneme =>(
                    <Phoneme symbol={phoneme.symbol} easyType={phoneme.easyType} type={phoneme.type} notes={phoneme.notes}
                    sol={phoneme.sol} poa={phoneme.poa} moa={phoneme.moa}/>
                ))}
            </div>

            <hr />

            <h1 class="header">Vowels</h1>
            <div class="float-container">
                {phonemes.filter(phoneme => phoneme.type === "V").map(phoneme =>(
                    <Phoneme symbol={phoneme.symbol} easyType={phoneme.easyType} type={phoneme.type} notes={phoneme.notes}
                    height={phoneme.height} backness={phoneme.backness} rounding={phoneme.rounding} tenseness={phoneme.tenseness}/>
                ))}
            </div>
        </div>
    );
}
export default PhonemeManager;