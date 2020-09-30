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
  username: "vroomie"
}

const Game = (props) => {

  const [playerScores, setPlayerScores] = useState({

  })
  const [turn, setTurn] = useState([user2, user1])
  const [cardsFaceUp, setCardsFaceUp] = useState([])

  // let playerScores1 = { ...playerScores }
  // playerScores1[user1.user_id] = user1
  // setPlayerScores(playerScores1)
  // let playerScores2 = { ...playerScores }
  // playerScores2[user2.user_id] = user2
  // setPlayerScores(playerScores2)

  const [board, setBoard] = useState({
    deck: {},
    turn: [user1, user2],
    cardsFaceUp: [],
    cardsReadyToMatch: [],
    forceFlip: [],
  })

  const me = { ...user1 }

  // useEffect(() => {
  //   let newPlayer = () => {
  //     return  { //test data
  //       correct: 0,       
  //       email: "marty",
  //       questions: 0,
  //       score: 0,
  //       socketId: "NJFNFpo24oiuNfopm35M",
  //       user_id: 102,
  //       username: "Scooby"
  //     }
  //     return newPlayer}
  //   console.log(`${newPlayer.username} has joined the game!`, newPlayer)
  //   let newPlayerScores = {...playerScores }
  //   newPlayerScores[newPlayer.user_id] = newPlayer
  // }, []);

  //Player listener, when player joins, set the array larger
  useEffect(() => {
    let newPlayerScores = { ...playerScores }
    newPlayerScores[user1.user_id] = user1
    newPlayerScores[user2.user_id] = user2
    setPlayerScores( newPlayerScores )
    let result = getQuestions()
    console.log("**** use effect ran", result)
  }, []);


  const getQuestions = () => {
    let category = '';
    (props.location)
      ? category = `http://jservice.io/api/clues?category=17`
      // : category = this.props.location.state.name
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
        // setQArray([...tempQArray]);

        const qArray = tempQArray
        // setQArray((qArray) => tempQArray)

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
    let currentPlayer = turn[0]
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
      if (button === 'match') {
        if (checkIfMatch(newCardsFaceUp[0], newCardsFaceUp[1],)) {
          newCardsFaceUp.map(c => {
            newDeck[c[0]].isVisible = false
            newDeck[c[0]].faceUp = false
          })
          console.log("SUCCESS, CARDS MATCHED!")
          console.log("$$$$ newDeck:", newDeck)
          newCardsFaceUp = []
          correctAnswer(currentPlayer)
          let newScore = correctAnswer(currentPlayer)
          let newPlayerScores = { ...playerScores }
          newPlayerScores[currentPlayer.user_id] = newScore
          setPlayerScores(newPlayerScores)
        }
        else {
          // alert("NO MATCH!")

          newCardsFaceUp.map(c => newDeck[c[0]].faceUp = false)
          nextPlayerTurn(newTurn)
          newCardsFaceUp = []
          let newScore = wrongAnswer(currentPlayer)
          let newPlayerScores = { ...playerScores }
          newPlayerScores[currentPlayer.user_id] = newScore
          setPlayerScores(newPlayerScores)
          // let forceFlip = [[newCardsFaceUp[0][0]], newCardsFaceUp[1][0]]
          // newState.forceFlip = forceFlip
        }
      }
      if (button === 'back') {
        newCardsFaceUp.map((c, index) => {
          // if (index + 1 !== map.newCardsFaceUp.length) {
          newDeck[c[0]].faceUp = false
        }

          // }
        )
        nextPlayerTurn(newTurn)
        newCardsFaceUp = []
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
    // socket.emit('player-turn', {newState});
  }

  const correctAnswer = (player, num = 5) => {
    let newPlayer = { ...playerScores[player.user_id] }
    newPlayer.questions += 1
    newPlayer.correct += 1
    newPlayer.score += num
    console.log("@@@@", player, newPlayer)
    return newPlayer
  }

  const wrongAnswer = (player, num = -5) => {
    let newPlayer = { ...playerScores[player.user_id] }
    newPlayer.questions += 1
    newPlayer.score += num
    console.log("@@@@", player, newPlayer)
    return newPlayer
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
    console.log("**** cardsFaceUp:", cardsFaceUp)
    let cards = Object.entries(cardsFaceUp)
    let empty = cardsFaceUp.map(c => c[1].cardId)

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

export default (withRouter(Game));
