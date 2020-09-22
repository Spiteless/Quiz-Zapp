import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
// import axios from 'axios';
import Card from "./Card"

const sixteenCards = [
  {
    textCardBack: "Car",
    textCardFront: "vroom",
    urlFront: ""
  },
  {
    textCardBack: "Bus",
    textCardFront: "beep",
    urlFront: "https://upload.wikimedia.org/wikipedia/commons/1/15/Transmetro_en_Ciudad_de_Guatemala.jpg"
  },

  {
    textCardBack: "Truck",
    textCardFront: "honk",
    urlFront: "data:image/jpeg;base64,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"
  },

  {
    textCardBack: "Bike",
    textCardFront: "dingding",
    urlFront: ""
  },

  {
    textCardBack: "Cat",
    textCardFront: "meow",
    urlFront: ""
  },

  {
    textCardBack: "Goat",
    textCardFront: "baaah",
    urlFront: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg"
  },

  {
    textCardBack: "Dog",
    textCardFront: "bark",
    urlFront: ""
  },

  {
    textCardBack: "Bird",
    textCardFront: "chirp",
    urlFront: ""
  },

  {
    textCardBack: "Ball",
    textCardFront: "boing",
    urlFront: ""
  },

  {
    textCardBack: "Mouse",
    textCardFront: "click",
    urlFront: ""
  },

  {
    textCardBack: "Keyboard",
    textCardFront: "tap",
    urlFront: ""
  },

  {
    textCardBack: "A",
    textCardFront: "1",
    urlFront: ""
  },

  {
    textCardBack: "B",
    textCardFront: "2",
    urlFront: ""
  },

  {
    textCardBack: "C",
    textCardFront: "3",
    urlFront: ""
  },

  {
    textCardBack: "D",
    textCardFront: "4",
    urlFront: ""
  },

  {
    textCardBack: "E",
    textCardFront: "5",
    urlFront: ""
  },
]

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