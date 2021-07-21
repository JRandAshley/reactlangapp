import React from 'react';
import "./App.scss";
import PhonemeManager from './PhonemeManager';
import Testing from './Testing';
import Nav from './Nav';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
    //const [theme, setTheme] = useState("light") //default page theme

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
            <div className="./app" id="light">
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
        <h1>Language Tracker</h1>
        <p>The purpose of this application is to aid 
            linguists and constructed language builders to be able to easily 
            record and reference sounds, words, grammer, and meaning.</p>
    </div>
)

export default App;