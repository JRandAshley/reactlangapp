import React from 'react';
import "./App.css";

class Phoneme extends React.Component {
    constructor(props){
        super(props);
        this.symbol = props.symbol; //phonetic symbol
        this.easyType = props.easyType; //Keyboard typeable alternative
        this.type = props.type; //Consonant or Vowel
        this.notes = props.notes;
        this.sol = props.sol; //State of the Larynx
        this.poa = props.poa; //Place of Articulation
        this.moa = props.moa; //Manner of Articulation
        this.height = props.height; //Height of the Tongue
        this.backness = props.backness; //Backness of the Tongue
        this.rounding = props.rounding; //Roundness of the Lips
        this.tenseness = props.tenseness; //Tenseness of the Tongue
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
                <div class="float-child" id="theme">
                    <h3>Symbol: {this.symbol}</h3>
                    <h3>Easy Type: {this.easyType}</h3>
                    <h3>Notes: {this.notes}</h3>
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
            <div class="float-child" id="theme">
                <h3>Symbol: {this.symbol}</h3>
                <h3>Easy Type: {this.easyType}</h3>
                <h3>State of the Larynx: {this.sol}</h3>
                <h3>Place of Articulation: {this.poa}</h3>
                <h3>Manner of Articulation: {this.moa}</h3>
                <h3>Notes: {this.notes}</h3>
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
            <div class="float-child" id="theme">
                <h3>Symbol: {this.symbol}</h3>
                <h3>Easy Type: {this.easyType}</h3>
                <h3>Height of Tongue: {this.height}</h3>
                <h3>Backness of Tongue: {this.backness}</h3>
                <h3>Rounding of Lips: {this.rounding}</h3>
                <h3>Tenseness of the Tongue: {this.tenseness}</h3>
                <h3>Notes: {this.notes}</h3>
            </div>
        );
    }
}
export default Phoneme;