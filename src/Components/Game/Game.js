import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
// import axios from 'axios';
import Card from "./Card"
import sixteenCards from './CardTestData';


///EXAMPLE
const dataIn = {
  q: 'why though?',
  a: 'because reasons',
  qID: 1
}


class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Test: 'test',
      board: 1
    }
    this.boardPlusOne = this.boardPlusOne.bind(this)
  }


  boardPlusOne() {
    let newBoard = this.state.board + 1
    console.log("Ran boardPlusOne", this.state, newBoard, this.state.board)
    this.setState(
      {...this.state, board: newBoard}
    )
  }

  buildCardsFromAp(data) {
    let cards = []
    let cardNumber = 0
    for (let i = 0; i < data.length; i++) {
      cardNumber += 1
      cards.push({
        q: data[i].q,
        qID: data[i].qID,
        cardId: cardNumber,
        cardPosition: { x: 0, y: 0 }
      })
      cardNumber += 1
      cards.push({
        a: data[i].a,
        qID: data[i].qID,
        number: cardNumber,
        urlBackPhotos: '',
        cardId: cardNumber,
        cardPosition: { x: 0, y: 0 }
      })
    }
  }

  createCard(cardInfo) {
    console.log ("createCard:", cardInfo)
    return <Card textCardBack={cardInfo.textCardBack}
      textCardFront={cardInfo.textCardFront}
      key={cardInfo.cardId} // CHANGE LATER
      testFunc = {this.boardPlusOne}
      urlFront={(cardInfo.urlFront)
        ? cardInfo.urlFront
        : "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg"} />
  }

  mapToBoard(cardData, rows = 4, columns = 4) {
    let cardArray = []

    console.log("mapToBoard: ---------: ", cardData)

    for (let i = 0; i < cardData.length; i++) {
      let row = []
      for (let i = 0; i < columns; i++) {
        row.push(cardData.shift())
      }
      cardArray.push(row)
    }

    return (
      <div className='gameBoard'>
        { cardArray.map((row, index) => {
          return (<div className="row" key={index}>
            {row.map(card => this.createCard(card))}
          </div>)
        })}
      </div>
    )
  }




  
  render() {
    const mappedBoard = this.mapToBoard(sixteenCards)
    
    return (
    <div className="gameContainer" >
      <h2>board: {}</h2>
      <h2>{this.state.board}</h2>
      {mappedBoard}
      <div className="chatWindow" ></div>
    </div>
    )}
};

export default (withRouter(Game));