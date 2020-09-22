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

const buildCardsFromApi = (data) => {
  let cards = []
  let cardNumber = 0
  for (let i = 0;i<data.length;i++){
      cardNumber += 1
      cards.push( {
          q: data[i].q,
          qID: data[i].qID,
          cardId: cardNumber,   
          cardPosition: { x: 0, y: 0 }           
      })
      cardNumber += 1
      cards.push( {
          a: data[i].a,
          qID: data[i].qID,
          number: cardNumber,   
          urlBackPhotos: '',
          cardId: cardNumber,
          cardPosition: { x: 0, y: 0 }           
      })
  }
}

const createCard = (cardInfo) => {
  return <Card textCardBack={cardInfo.textCardBack}
    textCardFront={cardInfo.textCardFront}
    key={cardInfo.textCardBack} // CHANGE LATER
    urlFront={(cardInfo.urlFront)
      ? cardInfo.urlFront
      : "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg"} />
}

const mapToBoard = (cardData, rows = 4, columns = 4) => {
  let cardArray = []

  for (let i = 0; i < cardData.length; i++) {
    let row = []
    for (let i = 0; i < columns; i++) {
      row.push(cardData.shift())
    }
    cardArray.push(row)
  }

  return (
    <div className='gameBoard'>
      { cardArray.map(row => {
          return (<div className="row">
                    {row.map(card => createCard(card))}
                  </div>)
      })}
    </div>
)}

const mappedBoard = mapToBoard(sixteenCards)

const Game = (props) => {

  return (
    <div className="gameContainer" >
      {mappedBoard}
      <div className="chatWindow" ></div>
    </div>)
};

export default (withRouter(Game));