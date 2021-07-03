import React from 'react';
import "./App.css";

class Phoneme extends React.Component {
    constructor(props){
        super(props);
        this.symbol = props.symbol; //phonetic symbol
        this.easyType = props.easyType; //Keyboard typeable alternative
        this.type = props.type; //Consonant or Vowel
        this.notes = props.notes;
        this.sol = props.sol;
        this.poa = props.poa;
        this.moa = props.moa;
        this.height = props.height;
        this.backness = props.backness;
        this.rounding = props.rounding;
        this.tenseness = props.tenseness;
    }
    
    render() {
       
        if(this.type == "C"){ //render consonant
            return(
                <div>
                    <Consonant symbol={this.symbol}
                    easyType={this.easyType}
                    type={this.type}
                    notes={this.notes}
                    sol={this.sol}
                    poa={this.poa}
                    moa={this.moa}/>
                </div>
            );
        }
        else if(this.type == "V"){ //render vowel
            return(
                <div>
                    <Vowel symbol={this.symbol}
                    easyType={this.easyType}
                    type={this.type}
                    notes={this.notes}
                    height={this.height}
                    backness={this.backness}
                    rounding={this.rounding}
                    tenseness={this.tenseness}/>
                </div>
            );
        }
        else{ //render default
            return(
                <div class="float-child">
                    <h3>{this.symbol}</h3>
                    <h3>{this.easyType}</h3>
                    <p>{this.notes}</p>
                </div>
            );
        }
        
    }
    
}
class Consonant extends Phoneme {
    constructor(props){
        super(props);
		this.sol = props.sol; //state of the larynx
		this.poa = props.poa; //place of articulation
		this.moa = props.moa; //manner of articulation
    }
    render(){ //render consonant
        return(
            <div class="float-child">
                <h3>{this.symbol}</h3>
                <h3>{this.easyType}</h3>
                <h3>{this.type}</h3>
                <h3>{this.sol}</h3>
                <h3>{this.poa}</h3>
                <h3>{this.moa}</h3>
                <p>{this.notes}</p>
            </div>
        );
    }
}
class Vowel extends Phoneme {
    constructor(props){
        super(props);
        this.height = props.height;
        this.backness = props.backness;
        this.rounding = props.rounding;
        this.tenseness = props.tenseness;
    }
    render(){ //render vowel
        return(
            <div class="float-child">
                <h3>{this.symbol}</h3>
                <h3>{this.easyType}</h3>
                <h3>{this.type}</h3>
                <h3>{this.height}</h3>
                <h3>{this.backness}</h3>
                <h3>{this.rounding}</h3>
                <h3>{this.tenseness}</h3>
                <p>{this.notes}</p>
            </div>
        );
    }
}
export default Phoneme;