import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Card from "./Card";
import GameChat from './GameChat';
import cardFront from '../../cardfront.png';
import { map } from 'lodash';
import { useSelector } from "react-redux";
// const reduxState = useSelector((reduxState) => reduxState.auth);


const _ = require('lodash');

let user1 = {
  correct: 0,
  email: "marty",
  questions: 0,
  score: 0,
  socketId: "A2jd5xDbxWGtygnlAAAA",
  user_id: 101,
  username: "mary"
}
let user2 = {
  correct: 0,
  email: "nascar",
  questions: 0,
  score: 0,
  socketId: "UBNG890351ijAOING2Pp",
  user_id: 100,
  username: "vroom"
}

const Game = (props) => {

  const [qArray, setQArray] = useState([])
  const [turn, setTurn] = useState([user2, user1])
  const [cardsFaceUp, setCardsFaceUp] = useState([])

  const [board, setBoard] = useState({
    deck: {},
    // turn: [user1, user2],
    cardsFaceUp: [],
    cardsReadyToMatch: [],
    forceFlip: [],
  })

  const me = { ...user1 }

  useEffect(() => {
    let result = getQuestions()
    console.log("**** use effect ran", result)
  }, []);



  const getQuestions = () => {
    let category = '';
    (props.location)
      ? category = `http://jservice.io/api/clues?category=17`
      : category = `http://jservice.io/api/clues?category=17`
    let newArr = []
    let newArrClean = []
    axios.get(category)
      .then((results) => {
        newArr = shuffleQuestions(results.data); //shuffles the questiosn received from api 
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].question === "" || newArr[i].answer === "") {
            newArr.splice(i, 1)
          }
        }
        newArrClean = _.uniqBy(newArr, 'answer')
        let tempQArray = [...newArrClean.slice(0, 8)]
        tempQArray = shuffleQuestions(cardData(tempQArray)) //shuffles slice of questions
        setQArray([...tempQArray]);

        const qArray = tempQArray

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

        setBoard({ deck: newDeck })
        return newDeck
      })
      .catch(err => { console.log(err) })

  }

  const shuffleQuestions = (qArray) => {
    let currentIndex = qArray.length, temporaryValue, randomIndex;

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

  const gameHandleClick = (cardState) => {
    console.log("**** gameHandleClick", cardState)
    let button = undefined
    button = cardState.button

    delete cardState.button

    const { deck } = board
    let newDeck = { ...deck }
    newDeck[cardState.cardId] = cardState
    let newCardsFaceUp = []
    console.log("**** board.turn in gameHandleClick", turn, "deck", deck)
    let newTurn = [...turn]
    Object.entries(newDeck).forEach(card => {
      // console.log("**** card", card)
      //console.log(card[0], card[1].faceUp)
      //if (card[1].faceUp) { newCardsFaceUp.push(card) }

      const [cardName, cardAttributes] = card
      if (cardAttributes.faceUp) { newCardsFaceUp.push(card) }
    })

    if (newCardsFaceUp.length === 2) {
      let msg = (button) ? `button is [${button}]` : "no button?"
      // alert(msg)
      console.log("**** newCardsFaceUp === 2", button)
      if (button === 'match') {
        if (checkIfMatch(newCardsFaceUp[0], newCardsFaceUp[1],)) {
          newCardsFaceUp.map(c => {
            newDeck[c[0]].isVisible = false
            newDeck[c[0]].faceUp = false
          })
          console.log("SUCCESS, CARDS MATCHED!")
          console.log("$$$$ newDeck:", newDeck)
          newCardsFaceUp = []
        }
        else {
          // alert("NO MATCH!")
          newCardsFaceUp.map(c => newDeck[c[0]].faceUp = false)
          nextPlayerTurn(newTurn)
          newCardsFaceUp = []
          // let forceFlip = [[newCardsFaceUp[0][0]], newCardsFaceUp[1][0]]
          // newState.forceFlip = forceFlip
        }
      }
      if (button === 'back') {
        newCardsFaceUp.map((c, index) => {
          // if (index + 1 !== map.newCardsFaceUp.length) {
          newDeck[c[0]].faceUp = false
          newCardsFaceUp = []
        }
          // }
        )
      }
    }

    // if (newCardsFaceUp.length > 2) {
    //   newCardsFaceUp.map(c => {
    //     newDeck[c[0]].faceUp = false
    //   })
    // }
    let newState = { ...board, deck: newDeck, turn: newTurn }
    // newState.cardsFaceUp = newCardsFaceUp
    setCardsFaceUp(newCardsFaceUp)
    console.log("**** newState for setBoard", newState)
    setTurn(newTurn)
    setBoard(newState)
  }

  const nextPlayerTurn = (turnState) => {
    // let newTurnState = [...turnState]
    turnState.push(turnState.shift()) //move front item to end
    return turnState
  }

  const cardData = (qArray) => {
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
        urlFront: "",
        matchId: obj.id,
        cardId: obj.id + "a",
        faceUp: false,
        isVisible: true,
      }
      return newObja
    })
    const combinedArr = qArr.concat(aArr)

    return (combinedArr)
  }

  const createCard = (cardInfo) => {
    const { deck } = board
    // console.log("$$$$", cardInfo)
    return <Card
      textCardBack={cardInfo.textCardBack}
      textCardFront={cardInfo.textCardFront}
      key={cardInfo.cardId}
      cardId={cardInfo.cardId}
      passedOnClickFunc={gameHandleClick}
      matchId={cardInfo.matchId}
      deck={deck}
      cardOrder={cardInfo.cardOrder}
      faceUp={cardInfo.faceUp}
      isVisible={cardInfo.isVisible}
      getCardsFaceUp={getCardsFaceUp}
      isItMyTurn={isItMyTurn}

      testFlip={Object.entries(deck).includes(cardInfo.cardId)}

      urlFront={(cardInfo.urlFront)
        ? cardInfo.urlFront
        : cardFront}>
    </Card>
  }

  const getCardsFaceUp = () => {
    let cards = Object.values(board.deck)
    let empty = cards.filter(c => c.faceUp)
    console.log("**** getCardsFaceUp", cards, empty)
    return empty
    return Object.values(board.cardsFaceUp).map(m => m[1].cardId)
  }

  const isItMyTurn = () => {
    return turn[0].username === me.username
  }

  const checkIfMatch = (c1, c2) => {
    return (c1[1].matchId === c2[1].matchId) ? true : false
  }

  const mapToBoard = (cardArrayIn, rows = 4, columns = 4) => {
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
            {row.map(card => createCard(card))}
          </div>)
        })}
      </div>
    )
  }

  const readOut = (deck) => {
    let entries = Object.entries(deck).map(obj => {
      let [key, val] = obj
      return <h2>{`${key}: ${JSON.stringify(val)}`}</h2>
    })
    return entries
  }

  const modal = () => {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
  }

  const close = () => {
    var modal = document.getElementById("modal");
    modal.style.display = "none"
  }
  let mappedBoard = mapToBoard(Object.values(board.deck))
  let currentPlayer = turn[0].username
  let turnText = (currentPlayer === me.username)
    ? "It's your turn!"
    : `${currentPlayer}'s turn!`
  let whoseTurn = (currentPlayer === me.username)
    ? " my-turn"
    : " not-my-turn"
  return (

    <div className={"gameContainer" + whoseTurn} >

      {/* {mappedBoard}
    </div>
    // <h1>Boop</h1> */}
      {mappedBoard}

      <div className="chatWindow" >
        <h1 className="player">{turnText}</h1>
        <h1>cardsFaceUp:
          {cardsFaceUp.map(c => c[1].matchId).toString()}
        </h1>
        <GameChat />
      </div>

      <button onClick={e => { modal() }}>MODAL</button>

      <div id="modal" className="endGameModal">
        <span onClick={e => { close() }} class="close">&times;</span>
        <div className="modalContent">GAME OVER</div>
      </div>

    </div>
  )
}

class GameBackup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qArray: [],
      deck: {},
      turn: [user1, user2],
      cardsFaceUp: [],
      cardsReadyToMatch: [],
      forceFlip: [],
      me: { ...user1 }
    }

    this.gameHandleClick = this.gameHandleClick.bind(this)
    this.getQuestions = this.getQuestions.bind(this)
    this.checkIfMatch = this.checkIfMatch.bind(this)
    this.mapToBoard = this.mapToBoard.bind(this)
    this.makeCardInvisible = this.makeCardInvisible.bind(this)
    this.getCardsFaceUp = this.getCardsFaceUp.bind(this)
    this.nextPlayerTurn = this.nextPlayerTurn.bind(this)
    this.isItMyTurn = this.isItMyTurn.bind(this)
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
    (this.props.location.state)
      ? category = `http://jservice.io/api/clues?category=17`
      // : category = this.props.location.state.name
      : category = `http://jservice.io/api/clues?category=17`
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
    // if (button) { alert("game: " + button) }

    delete cardState[cardState.name].button

    const { deck, cardsFaceUp, cardsReadyToMatch } = this.state
    let newDeck = { ...deck, ...cardState }
    let newCardsFaceUp = []
    let newTurn = [...this.state.turn]
    Object.entries(newDeck).forEach(card => {

      //console.log("card", card)
      //console.log(card[0], card[1].faceUp)
      //if (card[1].faceUp) { newCardsFaceUp.push(card) }

      const [cardName, cardAttributes] = card
      if (cardAttributes.faceUp) { newCardsFaceUp.push(card) }

    })

    if (newCardsFaceUp.length === 2) {
      console.log("#### newCardsFaceUp === 2")
      if (button === 'match') {
        if (this.checkIfMatch(newCardsFaceUp[0], newCardsFaceUp[1],)) {
          newCardsFaceUp.map(c => {
            newDeck[c[0]].isVisible = false
            newDeck[c[0]].faceUp = false
          })
          console.log("SUCCESS, CARDS MATCHED!")
          console.log("$$$$ newDeck:", newDeck)
          newCardsFaceUp = []
        }
        else {
          // alert("NO MATCH!")
          newCardsFaceUp.map(c => newDeck[c[0]].faceUp = false)
          this.nextPlayerTurn(newTurn)
          newCardsFaceUp = []
          // let forceFlip = [[newCardsFaceUp[0][0]], newCardsFaceUp[1][0]]
          // newState.forceFlip = forceFlip
        }
      }
      if (button === 'back') {
        newCardsFaceUp.map((c, index) => {
          // if (index + 1 !== map.newCardsFaceUp.length) {
          newDeck[c[0]].faceUp = false
          newCardsFaceUp = []
        }
          // }
        )
      }
    }

    // if (newCardsFaceUp.length > 2) {
    //   newCardsFaceUp.map(c => {
    //     newDeck[c[0]].faceUp = false
    //   })
    // }
    let newState = { ...this.state, deck: newDeck, turn: newTurn }
    newState.cardsFaceUp = newCardsFaceUp
    this.setState(newState)
  }

  getCardsFaceUp() {
    return Object.values(this.state.cardsFaceUp).map(m => m[1].cardId)
  }

  checkIfMatch(c1, c2) {
    return (c1[1].matchId === c2[1].matchId) ? true : false
  }

  // nextPlayerTurn() {
  //   let newTurn = [this.state.turn]
  //   return newTurn.push(newTurn.shift())
  // }

  nextPlayerTurn(turnState) {
    // let newTurnState = [...turnState]
    turnState.push(turnState.shift()) //move front item to end
    return turnState
  }

  isItMyTurn() {
    return this.state.turn[0].username === this.state.me.username
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
    const { gameHandleClick, getCardsFaceUp, isItMyTurn } = this
    const { deck } = this.state
    // console.log("$$$$", cardInfo)
    return <Card
      textCardBack={cardInfo.textCardBack}
      textCardFront={cardInfo.textCardFront}
      key={cardInfo.cardId}
      cardId={cardInfo.cardId}
      passedOnClickFunc={gameHandleClick}
      matchId={cardInfo.matchId}
      deck={deck}
      cardOrder={cardInfo.cardOrder}
      faceUp={cardInfo.faceUp}
      isVisible={cardInfo.isVisible}
      getCardsFaceUp={getCardsFaceUp}
      isItMyTurn={isItMyTurn}

      testFlip={Object.entries(deck).includes(cardInfo.cardId)}

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

    let currentPlayer = this.state.turn[0].username
    let turnText = (currentPlayer === this.state.me.username)
      ? "It's your turn!"
      : `${currentPlayer}'s turn!`
    let isItMyTurn = (currentPlayer === this.state.me.username)
      ? " my-turn"
      : " not-my-turn"

    return (
      // <div className={"gameContainer" + isItMyTurn} >
      //   {mappedBoard}

      //   <div className="chatWindow" >
      //     <h1 className="player">{turnText}</h1>
      //     <Game2></Game2>
      //     <h1>cardsFaceUp: {this.state.cardsFaceUp.map(c => c[1].matchId).toString()}</h1>
      //     <GameChat />
      //   </div>

      //   <button onClick={e => { this.modal() }}>MODAL</button>

      //   <div id="modal" className="endGameModal">
      //     <span onClick={e => { this.close() }} class="close">&times;</span>
      //     <div className="modalContent">GAME OVER</div>
      //   </div>

      // </div>


      // <Game2></Game2>
      <div className=""></div>
    )
  }

};

export default (withRouter(Game));