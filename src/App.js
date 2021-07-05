import React, {useState, useEffect} from 'react';
import "./App.css";
import PhonemeManager from './PhonemeManager';
import Testing from './Testing';
import Nav from './Nav';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
    const [phonemes, setPhonemes] = useState([
        {symbol: 'A', easyType: 'a', type: '', notes: 'It is a'},
        {symbol: 'B', easyType: 'b', type: 'C', notes: 'b letter',
        sol: 'state', poa: 'place', moa: 'manner'},
        {symbol: 'C', easyType: 'c', type: 'C', notes: 'a c',
        sol: 'state c', poa: 'place c', moa: 'manner c'},
        {symbol: 'I', easyType: 'i', type: '', notes: 'an I'},
        {symbol:'O', easyType:'o', type:'V', notes:'notes',
        height:'high', backness:'back', rounding:'round', tenseness:'tense'}
    ])
    const [consonants, setConsonants] = useState([
        {symbol: 'B', easyType: 'b', type: 'C', notes: 'b letter',
        sol: 'state', poa: 'place', moa: 'manner'},
        {symbol: 'C', easyType: 'c', type: 'C', notes: 'a c',
        sol: 'state c', poa: 'place c', moa: 'manner c'}
    ])

    const [theme, setTheme] = useState("light") //default page theme

    {/*
    function toggleTheme(){ //light of dark mode
        if(theme == "light"){
            setTheme("dark")
        }
        else if(theme == "dark"){
            setTheme("light")
        }
        else{
            setTheme("light")
        }
    }

    useEffect(() => {
        console.log('useEffect - Updating document title')
        document.title = `The theme is ${theme}.`
    }, [theme])
    */}


    return (
        <Router>
            <div className="./app" id={theme}>
                <Nav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/phonemes" component={PhonemeManager}/>
                    <Route path="/testing" component={Testing}/>
                </Switch>
                <hr />
            </div>
        </Router>
    );
}

const Home = () => (
    <div>
        <h1>Home Page</h1>
    </div>
)

export default App;