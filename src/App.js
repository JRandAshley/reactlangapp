import React, {useEffect, useState} from 'react';
import "./App.scss";
import PhonemeManager from './PhonemeManager';
import Testing from './Testing';
import Nav from './Nav';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MorphemeManager from './MorphemeManager';


/*class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {apiResponse:""}
    }
    callAPI(){
        fetch("http:localhost:9000/testAPI")
        .then(res => res.test())
        .then(res => this.setState({apiResponse: res}));
    }
    componentWillMount(){
        this.callAPI();
    }
}*/
function App(){
    return(
        <Router>
            <div className="./app" class="background">
                <Nav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/phonemes" component={PhonemeManager}/>
                    <Route path="/morphemes" component={MorphemeManager}/>
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