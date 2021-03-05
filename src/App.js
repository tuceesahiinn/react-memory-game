import React, {Component} from 'react'
import './App.scss';
import { useState } from 'react';

class Game extends Component{

  constructor(props){
      super(props)
      this.state={
        cards: ['burger','coffee','cookie', 'hot-dog', 'noodle', 'pizza'],
        dublicatedCards: [],
        randomizeCards: [],
        finalCards: [],
        openedCards: [] }

      this.start()
  }
      

  handleClick(name, index){
      if(this.state.openedCards.length === 2){
          setTimeout(()=>{
              this.check()
          }, 650)
      }
      else{
          let card = { name, index }
          let finalCards = this.state.finalCards;
          let cards = this.state.openedCards;
          finalCards[index].close = false;
          cards.push(card);

          this.setState({
              openedCards: cards,
              finalCards: finalCards
          })

          if(this.state.openedCards.length === 2){
              setTimeout(()=>{
                  this.check()
              },650)
          }
      }
  }

  check(){
      let finalCards = this.state.finalCards;
      if((this.state.openedCards[0].name === this.state.openedCards[1].name) &&
      (this.state.openedCards[0].index !== this.state.openedCards[1].index)){

          finalCards[this.state.openedCards[0].index].complete = true;
          finalCards[this.state.openedCards[1].index].complete = true;
      }
      else{
          finalCards[this.state.openedCards[0].index].close = true;
          finalCards[this.state.openedCards[1].index].close = true; 
      }
      this.setState({
          finalCards,
          openedCards: []
      });
  }

  start(){
      let finalCards =[];
      this.state.dublicatedCards = this.state.cards.concat(this.state.cards);
      this.state.randomizeCards = this.suffle(this.state.dublicatedCards)

      this.state.randomizeCards.map((name,index)=>{
          finalCards.push({
              name,
              close: true,
              complete: false,
              fail: false
          });
      });

      this.state.finalCards = finalCards
  }

  suffle(arr){
      let currIndex = arr.length, temp, randomIndex;
      while(0 !== currIndex){
          randomIndex = Math.floor(Math.random() * currIndex);
          currIndex -= 1;
          temp = arr[currIndex];
          arr[currIndex] = arr[randomIndex];
          arr[randomIndex] = temp;
      }
      return arr;
  }

  render(){
      return(
          <div className="ground"> 
              
              {
                  this.state.finalCards.map((card, index)=>{
                      return <Card card = {card.name} 
                      click = {()=>{this.handleClick(card.name, index)}}
                      close = {card.close}
                      complete = {card.complete}/>
                  })
               }
          </div>
      )
  }

}
class Card extends Component{

  constructor(props){
      super(props)
      this.state ={}
  }

  clicked(card){
      this.props.click(card)
  }
  render(){
      return(
          <div className= {"card" + (!this.props.close ? 'opened' : '') + (this.props.complete ? 'matched': '')}
               onClick = {() => this.clicked(this.props.card)}>
                <>
                   <div className="front">
                       
                   </div>
                   <div className = "back">
                         <img src={"/img/"+this.props.card+".jpg"} alt={this.props.card} className="foto"/>
         
                   </div>

                </>

          </div>
      );
  }
}


function App() {
  const f_cards = useState(true);
  return (
    <div className="App" id="app">
        <Game/>
    </div>
  );
}

export default App;