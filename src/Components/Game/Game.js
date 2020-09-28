import React from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Card from "./Card";
import GameChat from './GameChat';
import cardFront from '../../cardfront.png';

const _ = require('lodash');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mappedBoard: [], //required
      qArray: [],
      deck: {},
      cardsFaceUp: [],
      cardsReadyToMatch: [],
      forceFlip: [],
      count: 0,

    }
    this.handleCardClick = this.handleCardClick.bind(this)
    this.getQuestions = this.getQuestions.bind(this)
    this.readOut = this.readOut.bind(this)
    this.checkIfMatch = this.checkIfMatch.bind(this)
    this.mapToBoard = this.mapToBoard.bind(this)
  }

  componentDidMount() {
    this.getQuestions()
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
    const { shuffleQuestions, mapToBoard, cardData } = this
    //     const {state: } = this.props.location
    let category = '';
    !this.props.location.state ? category = `http://jservice.io/api/clues?category=17` : category = this.props.location.state.name
    let newArr = []
    let newArrClean = []
    axios.get(category)
      .then((results) => {
        newArr = this.shuffleQuestions(results.data);
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].question === "" || newArr[i].answer === "") {
            newArr.splice(i, 1)
          }
        }
        newArrClean = _.uniqBy(newArr, 'answer')
        this.setState({ qArray: newArrClean.slice(0, 8) });
        this.setState({ qArray: shuffleQuestions(cardData(this.state.qArray)) });
        const qArray = this.state.qArray

        let newDeck = {}
        qArray.forEach( (card, index) => {
          let cardStatus = {}
          cardStatus.cardId = card.cardId
          cardStatus.cardOrder = card.cardOrder
          cardStatus.faceUp = card.faceUp
          cardStatus.matchId = card.matchId
          cardStatus.textCardFront = card.textCardFront
          cardStatus.urlFront = card.urlFront

          newDeck[card.cardId] = cardStatus
        })
                
        const mappedBoard = mapToBoard(qArray)



        // this.setState({ deck: newDeck })

        
        this.setState({ mappedBoard, deck: newDeck })
      })
      .catch(err => console.log(err))
  }

  handleCardClick(cardState) {
    console.log(`cardState: `, cardState)
    const { deck, cardsFaceUp, cardsReadyToMatch } = this.state
    // const myDeck = deck.map( n => n)
    let newDeck = { ...deck, ...cardState }
    let newState = { ...this.state, deck: newDeck }
    let newCardsFaceUp = []
    Object.entries(newDeck).forEach(card => {
      console.log(card[0], card[1].faceUp)
      if (card[1].faceUp) { newCardsFaceUp.push(card) }
    })

    if (newCardsFaceUp.length === 2) {
      if (this.checkIfMatch(newCardsFaceUp[0], newCardsFaceUp[1],)) {
        //  alert("MATCH!") 
      }
      else {
        // alert("NO MATCH!") 
        let forceFlip = [[newCardsFaceUp[0][0]], newCardsFaceUp[1][0]]
        newState.forceFlip = forceFlip
      }
    }
    newState.cardsFaceUp = newCardsFaceUp
    newState.count = this.state.count + 1

    console.log("newDeck:", Object.entries(newDeck).length, Object.values(newDeck))

    this.setState(newState)
  }

  checkIfMatch(c1, c2) {
    return (c1[1].matchId === c2[1].matchId) ? true : false
  }

  cardData(qArray) {
    const qArr = qArray.map((obj, index) => {
      const newObjq = {
        cardOrder: index,
        textCardFront: obj.question,
        urlFront: "",
        matchId: obj.id,
        cardId: obj.id + "q",
        faceUp: false,
      }
      return newObjq
    })
    const aArr = qArray.map((obj, index) => {
      const newObja = {
        cardOrder: index + 8,
        textCardFront: obj.answer,
        urlFront: "", matchId: obj.id,
        cardId: obj.id + "a",
        faceUp: false,
      }
      return newObja
    })
    const combinedArr = qArr.concat(aArr)

    return (combinedArr)
  }

  //   buildCardsFromApi(data) {
  //     let cards = []
  //     let cardNumber = 0
  //     for (let i = 0; i < data.length; i++) {
  //       cardNumber += 1
  //       cards.push({
  //         q: data[i].q,
  //         qID: data[i].qID,
  //         cardId: cardNumber,
  //         cardPosition: { x: 0, y: 0 }
  //       })
  //       cardNumber += 1
  //       cards.push({
  //         a: data[i].a,
  //         qID: data[i].qID,
  //         number: cardNumber,
  //         urlBackPhotos: '',
  //         cardId: cardNumber,
  //         cardPosition: { x: 0, y: 0 }
  //       })
  //     }
  //   }

  createCard(cardInfo) {
    let forceFlip = (this.state.forceFlip.includes(cardInfo.cardId))
      ? true
      : false
    // alert(forceFlip)


    return <Card textCardBack={cardInfo.textCardBack}
      textCardFront={cardInfo.textCardFront}
      key={cardInfo.cardId}
      cardId={cardInfo.cardId}
      passedOnClickFunc={this.handleCardClick}
      matchId={cardInfo.matchId}
      deck={this.state.deck}
      cardOrder={cardInfo.cardOrder}
      faceUp = {cardInfo.faceUp}
      count = {this.state.count}

      testFlip={Object.entries(this.state.deck).includes(cardInfo.cardId)}
      // forceFlip={(this.state.forceFlip.includes(cardInfo.cardId))
      forceFlip={(this.state.forceFlip.includes(cardInfo.cardId) ? true : false)


      }
      urlFront={(cardInfo.urlFront)
        ? cardInfo.urlFront
        : cardFront}>
      {/* {alert("SPECIAL: "+ Object.entries(this.state.deck).includes(cardInfo.cardId))} */}
    </Card>
  }

  mapToBoard(cardArrayIn, rows = 4, columns = 4) {
    let cardArray = []

    for (let i = 0; i < cardArrayIn.length; i++) {
      let row = []
      for (let i = 0; i < columns; i++) {
        row.push(cardArrayIn.shift())
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

  readOut = (deck) => {
    let entries = Object.entries(deck).map(obj => {
      let [key, val] = obj
      return <h2>{`${key}: ${JSON.stringify(val)}`}</h2>
    })
    return entries
  }

  render() {
    console.log("Deck in render:", this.state.deck)

    return (
      <div className="gameContainer" >
        {console.log('qArray', this.state.qArray)}
        {/* {this.state.mappedBoard} */}
        {this.mapToBoard(Object.values(this.state.deck))}

        <div className="chatWindow" >
          <h1>deck:</h1>
          {this.readOut(this.state.deck)}
          <h1>cardsFaceUp: {this.state.cardsFaceUp.toString()}</h1>
          <h1>forceFlip: {this.state.forceFlip.toString()}</h1>
          {/* {this.readOut(this.state.cardsFaceUp)} */}
          <GameChat />
        </div>
      </div>
    )
  }

};

export default (withRouter(Game));