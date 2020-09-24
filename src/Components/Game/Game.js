import React from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Card from "./Card"
import sixteenCards from './CardTestData';
import { compareSync } from 'bcrypt';


///EXAMPLE
const dataIn = {
  q: 'why though?',
  a: 'because reasons',
  qID: 1
}




class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: 1,
      mappedBoard: [], //required
      qArray: [],
      deck: {},
      cardsFaceUp: [],
      cardsReadyToMatch: [],

    }
    this.handleCardClick = this.handleCardClick.bind(this)
    this.getQuestions = this.getQuestions.bind(this)
    this.readOut = this.readOut.bind(this)
  }

  componentDidMount() {
    this.getQuestions()
    const mappedBoard = this.mapToBoard(sixteenCards)
    this.setState({ mappedBoard })
  }


  shuffleQuestions(qArray) {
    var currentIndex = qArray.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = qArray[currentIndex];
      qArray[currentIndex] = qArray[randomIndex];
      qArray[randomIndex] = temporaryValue;
    }

    return qArray;
  }

  getQuestions() {
    let newArr = []
    axios.get(`http://jservice.io/api/clues?category=17`)
      .then((results) => { newArr = this.shuffleQuestions(results.data); this.setState({ qArray: newArr.slice(0, 8) }) })
      .catch(err => console.log(err))
  }

  handleCardClick(cardState) {
    compareSync.log("cardState", cardState)
    const { deck, cardsFaceUp, cardsReadyToMatch } = this.state
    // const myDeck = deck.map( n => n)
    let newDeck = { ...deck, ...cardState }
    let newState = { ...this.state, deck: newDeck }
    let newCardsFaceUp = []
    Object.entries(newDeck).forEach( card=> {
      console.log(card[0], card[1].faceUp)
      if (!card[1].faceUp) newCardsFaceUp.push(card[0])
    })

    // alert(`card: ${newCardsFaceUp}`)
    newState.cardsFaceUp = newCardsFaceUp
    // let currentCards = 

    // let newCardsFaceUp = Object.entries(deck).filter(card => {
    //   const [key, val] = card
    //     (card[key] === false) ? true : false
    // })
    // newState['cardsFaceUp'] = newCardsFaceUp
    // alert(`${typeof Object.entries(deck)}, ${typeof Object.entries(deck).filter}`)
    // alert(`${typeof deck}, ${typeof deck.filter}`)

    // alert(`current cards: ${typeof currentCards}, ${currentCards.join(" , ")} !`)

    this.setState(newState)
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

    // cardOrder: 1,
    // textCardFront: "The US Constitution",
    // urlFront: "https://www.signmart.com/assets/images/handheldstopsigns/handheldstopsigncropped.jpg",
    // // matchId is going to come from the question ID from the API. 
    // matchId: 123,
    // cardId: "card" + 1,

  createCard(cardInfo) {

    return <Card textCardBack={cardInfo.textCardBack}
      textCardFront={cardInfo.textCardFront}
      key={cardInfo.cardId}
      cardId={cardInfo.cardId}
      passedOnClickFunc={this.handleCardClick}
      matchId={cardInfo.matchId}
      urlFront={(cardInfo.urlFront)
        ? cardInfo.urlFront
        : "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg"} />
  }

  mapToBoard(cardData, rows = 4, columns = 4) {
    console.log('game mapToBoard func hit')
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

  text = `
  // Game Flow //
  step 1 generateCardDeck

  step 2 ...?

  step 3 Game End



  functions needed:
  generateCardDeck
  renderBoard
  turnOverCard
  checkIfMatched_IMG
  checkIfMatched_QnA  
  adjustPlayerScore
  shuffleDeck
  endGame 

  state objects needed:


  
  `

  shuffleDeck = (cards) => {
    return cards
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1])
  }



  readOut = (deck) => {
    let entries = Object.entries(deck).map(obj => {
      let [key, val] = obj
      return <h2>{`${key}: ${val}`}</h2>
    })
    return entries
  }

  render() {
    return (
      <div className="gameContainer" >
        {console.log('qArray', this.state.qArray)}
        <h2>{this.state.board}</h2>
        {this.state.mappedBoard}
        <div className="chatWindow" >
          <h1>deck:</h1>
          {this.readOut(this.state.deck)}
          <h1>cardsFaceUp: {this.state.cardsFaceUp.length}</h1>
          {/* {this.readOut(this.state.cardsFaceUp)} */}
        </div>
      </div>
    )
  }
};

export default (withRouter(Game));