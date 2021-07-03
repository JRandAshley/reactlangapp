import React, {useState} from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import Phoneme from './Phoneme';
import Consonant from './Phoneme';

function App() {
    const [phonemes, setPhonemes] = useState([
        {symbol: 'A', easyType: 'a', type: '', notes: 'It is a'},
        {symbol: 'B', easyType: 'b', type: 'C', notes: 'b letter',
        sol: 'state', poa: 'place', moa: 'manner'},
        {symbol: 'C', easyType: 'c', type: 'C', notes: 'a c'},
        {symbol: 'I', easyType: 'i', type: '', notes: 'an I'}
    ])
    const [consonants, setConsonants] = useState([
        {symbol: 'B', easyType: 'b', type: 'C', notes: 'b letter',
        sol: 'state', poa: 'place', moa: 'manner'},
        {symbol: 'C', easyType: 'c', type: 'C', notes: 'a c',
        sol: 'state c', poa: 'place c', moa: 'manner c'}
    ])

    return (
        <div className="app">
            <div>
                <h1 class="header">Phonemes</h1>
                <div class="float-container">
                    {phonemes.map(phoneme =>(
                        <Phoneme symbol={phoneme.symbol} easyType={phoneme.easyType} type={phoneme.type} notes={phoneme.notes}
                        sol={phoneme.sol} poa={phoneme.poa} moa={phoneme.moa}/>
                    ))}
                </div>

                <hr />

                <h1 class="header">Consonants</h1>
                <div class="float-container">
                    {consonants.map(consonant =>(
                        <Consonant symbol={consonant.symbol} easyType={consonant.easyType} type={consonant.type} notes={consonant.notes}
                        sol={consonant.sol} poa={consonant.poa} moa={consonant.moa}/>
                    ))}
                </div>

                <hr />

                <div class="float-container">
                    <Phoneme symbol={"K"} easyType={"k"}
                    type={"C"} notes={"notes"}
                        sol={"state"} poa={"place"} moa={"manner"}/>
                </div>
            </div>
        </div>
    );
}

export default App;