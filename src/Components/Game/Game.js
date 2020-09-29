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
      qArray: [],
      deck: {},
      cardsFaceUp: [],
      cardsReadyToMatch: [],
      forceFlip: [],
    }

    this.gameHandleClick = this.gameHandleClick.bind(this)
    this.getQuestions = this.getQuestions.bind(this)
    this.checkIfMatch = this.checkIfMatch.bind(this)
    this.mapToBoard = this.mapToBoard.bind(this)
    this.makeCardInvisible = this.makeCardInvisible.bind(this)
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
        newArr = this.shuffleQuestions(results.data); //shuffles the questiosn received from api 
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].question === "" || newArr[i].answer === "") {
            newArr.splice(i, 1)
          }
        }
        newArrClean = _.uniqBy(newArr, 'answer')
        this.setState({ qArray: newArrClean.slice(0, 8) });
        this.setState({ qArray: shuffleQuestions(cardData(this.state.qArray)) }); //shuffles slice of questions
        const qArray = this.state.qArray

        let newDeck = {}
        qArray.forEach((card, index) => {
          let cardStatus = {}
          cardStatus.cardId = card.cardId
          cardStatus.cardOrder = card.cardOrder
          cardStatus.faceUp = card.faceUp
          cardStatus.matchId = card.matchId
          cardStatus.textCardFront = card.textCardFront
          cardStatus.urlFront = card.urlFront
          cardStatus.isVisible = card.isVisible

          newDeck[card.cardId] = cardStatus
        })

        this.setState({ deck: newDeck })
      })
      .catch(err => console.log(err))
  }

  gameHandleClick(cardState) {
    console.log("####game", cardState)
    let button = undefined
    button = cardState[cardState.name].button

    delete cardState[cardState.name].button

    const { deck, cardsFaceUp, cardsReadyToMatch } = this.state
    let newDeck = { ...deck, ...cardState }
    let newCardsFaceUp = []
    Object.entries(newDeck).forEach(card => {

      //console.log("card", card)
      //console.log(card[0], card[1].faceUp)
      //if (card[1].faceUp) { newCardsFaceUp.push(card) }

      const [cardName, cardAttributes] = card
      if (cardAttributes.faceUp) { newCardsFaceUp.push(card) }

    })

    if (newCardsFaceUp.length === 2) {
      if (button === 'match') {
        if (this.checkIfMatch(newCardsFaceUp[0], newCardsFaceUp[1],)) {
          newCardsFaceUp.map(c => {
            newDeck[c[0]].isVisible = false
            newDeck[c[0]].faceUp = false
          })
          console.log("SUCCESS, CARDS MATCHED!")
          console.log("$$$$ newDeck:", newDeck)
        }
        else {
          alert("NO MATCH!") 
          // let forceFlip = [[newCardsFaceUp[0][0]], newCardsFaceUp[1][0]]
          // newState.forceFlip = forceFlip
        }
      if (button === 'back') {
        alert("BACK!")
        newCardsFaceUp.map(c => {
          newDeck[c[0]].faceUp = false
        })
      }
      }
    }
    let newState = { ...this.state, deck: newDeck }
    newState.cardsFaceUp = newCardsFaceUp
    this.setState(newState)
  }

  checkIfMatch(c1, c2) {
    return (c1[1].matchId === c2[1].matchId) ? true : false
  }

  checkPlayerTurnOver() {

  }

  emitGameState() {

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
        isVisible: true,
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
        isVisible: true,
      }
      return newObja
    })
    const combinedArr = qArr.concat(aArr)

    return (combinedArr)
  }



  createCard(cardInfo) {
    // console.log("$$$$", cardInfo)
    return <Card
      textCardBack={cardInfo.textCardBack}
      textCardFront={cardInfo.textCardFront}
      key={cardInfo.cardId}
      cardId={cardInfo.cardId}
      passedOnClickFunc={this.gameHandleClick}
      matchId={cardInfo.matchId}
      deck={this.state.deck}
      cardOrder={cardInfo.cardOrder}
      faceUp={cardInfo.faceUp}
      isVisible={cardInfo.isVisible}

      testFlip={Object.entries(this.state.deck).includes(cardInfo.cardId)}

      urlFront={(cardInfo.urlFront)
        ? cardInfo.urlFront
        : cardFront}>
    </Card>
  }

  makeCardInvisible(card) {
    card.isVisible = false
    console.log("$$$$", "invisCard?", card, typeof card)
    return card
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
    console.log("$$$$", cardArray)
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

  modal = () => {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
  }

  close = () => {
    var modal = document.getElementById("modal");
    modal.style.display = "none"
  }

  render() {
    let mappedBoard = this.mapToBoard(Object.values(this.state.deck))
    return (
      <div className="gameContainer" >
        {mappedBoard}

        <div className="chatWindow" >
          <h1>cardsFaceUp: {this.state.cardsFaceUp.map(c => c[1].cardOrder).toString()}</h1>
          <h1>forceFlip: {this.state.forceFlip.toString()}</h1>
          <GameChat />
        </div>

        <button onClick={e => { this.modal() }}>MODAL</button>

        <div id="modal" className="endGameModal">
          <span onClick={e => { this.close() }} class="close">&times;</span>
          <div className="modalContent">GAME OVER</div>
        </div>

      </div>
    )
  }

};

export default (withRouter(Game));