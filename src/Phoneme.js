import React from 'react';
import "./App.scss";

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
        this.height = props.height; //Height of the Tongue  Mid-Vowels are Lax
        this.backness = props.backness; //Backness of the Tongue
        this.rounding = props.rounding; //Roundness of the Lips
    }
    
    render() {
       
        if(this.type === "C"){ //render consonant
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
        else if(this.type === "V"){ //render vowel
            return(
                <div>
                    <Vowel symbol={this.symbol}
                    easyType={this.easyType}
                    type={this.type}
                    notes={this.notes}
                    height={this.height}
                    backness={this.backness}
                    rounding={this.rounding}/>
                </div>
            );
        }
        else{ //render default
            return(
                <div class="flexbox-item-display">
                    <h3>{this.symbol}</h3>
                    <p>Easy Type: {this.easyType}</p>
                    <p>Notes: {this.notes}</p>
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
            <div class="flexbox-item-display">
                <h3>{this.symbol}</h3>
                <p>Easy Type: {this.easyType}</p>
                <p>State of the Larynx: {this.sol}</p>
                <p>Place of Articulation: {this.poa}</p>
                <p>Manner of Articulation: {this.moa}</p>
                <p>Notes: {this.notes}</p>
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
    }
    render(){ //render vowel
        return(
            <div class="flexbox-item-display">
                <h3>{this.symbol}</h3>
                <p>Easy Type: {this.easyType}</p>
                <p>Height of Tongue: {this.height}</p>
                <p>Backness of Tongue: {this.backness}</p>
                <p>Rounding of Lips: {this.rounding}</p>
                <p>Notes: {this.notes}</p>
            </div>
        );
    }
}
export default Phoneme;