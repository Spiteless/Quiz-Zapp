import React, { useState, useEffect, useRef, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import GameChat from "./GameChat";
import cardFront from "../../cardfront.png";
import { map } from "lodash";
import { useSelector } from "react-redux";
import { SocketContext } from "../Context/Context";

const fakeBoard = {
  deck: {
    fakeCard1: {
      card_id: "0a",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard2: {
      card_id: "1a",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard3: {
      card_id: "2a",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard4: {
      card_id: "3a",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard5: {
      card_id: "4a",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard6: {
      card_id: "5a",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard7: {
      card_id: "6a",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard8: {
      card_id: "7a",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard9: {
      card_id: "0q",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard10: {
      card_id: "2q",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard11: {
      card_id: "3a",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard12: {
      card_id: "3q",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard13: {
      card_id: "4q",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard14: {
      card_id: "5q",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard15: {
      card_id: "6q",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
    fakeCard16: {
      card_id: "7q",
      cardOrder: 0,
      match_id: 0,
      faceUp: false,
      textCardFront: "This a fake card yo",
      textCardBack: "",
      urlFront: "",
      isVisible: true,
    },
  },
};

const _ = require("lodash");

let user1 = {
  correct: 0,
  email: "marty",
  questions: 0,
  score: 0,
  socketId: "A2jd5xDbxWGtygnlAAAA",
  user_id: 101,
  username: "mary",
};
let user2 = {
  correct: 0,
  email: "nascar",
  questions: 0,
  score: 0,
  socketId: "UBNG890351ijAOING2Pp",
  user_id: 100,
  username: "vroomie",
};

const Game = (props) => {
  console.log("<<<< Enter Game Function Game Component >>>>");
  const reduxState = useSelector((reduxState) => reduxState.auth);

  const {
    getGameParticipants,
    gameParticipants,
    setGameParticipants,
    gameRoom,
    category,
    setCategory,
    socket,
  } = useContext(SocketContext);

  console.log(
    "~~~~Context imports:",
    getGameParticipants,
    gameParticipants,
    setGameParticipants
  );

  const [playerScores, setPlayerScores] = useState({});
  const [turn, setTurn] = useState([user2, user1]);
  const [cardsFaceUp, setCardsFaceUp] = useState([]);
  const [gameCategory, setGameCategory] = useState(category);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    setPlayerScores([...gameParticipants]);
    setTurn([...gameParticipants]);
  }, []);

  const [board, setBoard] = useState({
    deck: {
      fakeCard1: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard2: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard3: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard4: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard5: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard6: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard7: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard8: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard9: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard10: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard11: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard12: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard13: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard14: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard15: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
      fakeCard16: {
        card_id: "0a",
        cardOrder: 0,
        match_id: 0,
        faceUp: false,
        textCardFront: "This a fake card yo",
        textCardBack: "",
        urlFront: "",
        isVisible: true,
      },
    },
  });

  const me = { ...reduxState.user };
  console.log("0000 user: " + me.username);

  //Player listener, when player joins, set the array larger
  useEffect(() => {
    // let newPlayerScores = {}
    // newPlayerScores[user1.user_id] = user1
    // newPlayerScores[user2.user_id] = user2
    // setPlayerScores(newPlayerScores)
    let result = getQuestions();
    console.log("**** use effect ran", result);
  }, []);

  useEffect(() => {
    socket.on("receive-game-state", (body) => {
      const { deck } = body.board;
      let newDeck = { ...deck };
      setTurn((turn) => [...body.turn]);
      setBoard((board) => ({ deck: newDeck }));
      console.log("board", board, "turn", turn, "^^^^^^");
      //       setGameCategory(category);
    });
    socket.on("modal", (body) => {
      sendScores();
      modal();
    });
  }, []);

  useEffect(()=>{
    if(modalState){
      const finalPlayer = {playerId:(parseInt(Object.keys(playerScores)[2]))};
      const finalScore = {...finalPlayer, ...(Object.values(playerScores)[2])};
      axios.put('/api/playerScore', finalScore).then(console.log('xyzzy useEffect', finalScore))}
  },[modalState])

  const getQuestions = () => {
    console.log("&&&&", props);
    console.log("~~~~game category on state but from context:", gameCategory);

    let category = "";
    category = gameCategory
      ? (category = gameCategory)
      : (category = `http://jservice.io/api/clues?category=17`);
    // (!props.location.state === undefined)

    let newArr = [];
    let newArrClean = [];
    axios
      .get(category)
      .then((results) => {
        newArr = shuffleQuestions(results.data); //shuffles the questions received from api
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].question === "" || newArr[i].answer === "") {
            newArr.splice(i, 1);
          }
        }
        newArrClean = _.uniqBy(newArr, "answer");
        let tempQArray = [...newArrClean.slice(0, 8)];
        tempQArray = shuffleQuestions(cardData(tempQArray)); //shuffles slice of questions
        // setQArray([...tempQArray]);

        const qArray = tempQArray;
        // setQArray((qArray) => tempQArray)

        let newDeck = {};
        qArray.forEach((card, index) => {
          let cardStatus = {};
          cardStatus.cardId = card.cardId;
          cardStatus.cardOrder = card.cardOrder;
          cardStatus.faceUp = card.faceUp;
          cardStatus.matchId = card.matchId;
          cardStatus.textCardFront = card.textCardFront;
          cardStatus.urlFront = card.urlFront;
          cardStatus.isVisible = card.isVisible;

          newDeck[card.cardId] = cardStatus;
        });

        setBoard({ deck: newDeck });
        return newDeck;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shuffleQuestions = (qArray) => {
    let currentIndex = qArray.length,
      temporaryValue,
      randomIndex;

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
  };

  const gameHandleClick = (cardState) => {
    let currentPlayer = turn[0];
    console.log("**** gameHandleClick", cardState);
    let button = undefined;
    button = cardState.button;

    delete cardState.button;

    const { deck } = board;
    let newDeck = { ...deck };
    newDeck[cardState.cardId] = cardState;
    let newCardsFaceUp = [];
    console.log("**** board.turn in gameHandleClick", turn, "deck", deck);
    let newTurn = [...turn];
    Object.entries(newDeck).forEach((card) => {
      // console.log("**** card", card)
      //console.log(card[0], card[1].faceUp)
      //if (card[1].faceUp) { newCardsFaceUp.push(card) }

      const [cardName, cardAttributes] = card;
      if (cardAttributes.faceUp) {
        newCardsFaceUp.push(card);
      }
    });

    if (newCardsFaceUp.length === 2) {
      if (button === "match") {
        if (checkIfMatch(newCardsFaceUp[0], newCardsFaceUp[1])) {
          newCardsFaceUp.map((c) => {
            newDeck[c[0]].isVisible = false;
            newDeck[c[0]].faceUp = false;
          });
          console.log("SUCCESS, CARDS MATCHED!");
          console.log("$$$$ newDeck:", newDeck);
          newCardsFaceUp = [];
          correctAnswer(currentPlayer);
          let newScore = correctAnswer(currentPlayer);
          let newPlayerScores = { ...playerScores };
          newPlayerScores[currentPlayer.user_id] = newScore;
          setPlayerScores(newPlayerScores);
        } else {
          // alert("NO MATCH!")
          newCardsFaceUp.map((c) => (newDeck[c[0]].faceUp = false));
          nextPlayerTurn(newTurn);
          newCardsFaceUp = [];
          let newScore = wrongAnswer(currentPlayer);
          let newPlayerScores = { ...playerScores };
          newPlayerScores[currentPlayer.user_id] = newScore;
          setPlayerScores(newPlayerScores);
          // let forceFlip = [[newCardsFaceUp[0][0]], newCardsFaceUp[1][0]]
          // newState.forceFlip = forceFlip
        }
      }
      if (button === "back") {
        newCardsFaceUp.map(
          (c, index) => {
            // if (index + 1 !== map.newCardsFaceUp.length) {
            newDeck[c[0]].faceUp = false;
          }

          // }
        );
        nextPlayerTurn(newTurn);
        newCardsFaceUp = [];
      }
    }

    let newState = { deck: newDeck };
    let emitToBackEnd = {};
    emitToBackEnd["board"] = newState;
    emitToBackEnd["turn"] = newTurn;
    emitToBackEnd["room"] = gameRoom;

    setCardsFaceUp(newCardsFaceUp);
    console.log("**** newState for setBoard", newState);
    setTurn(newTurn);
    setBoard(newState);
    handleGameOver(newState);
    passGameState(emitToBackEnd);
  };

  const passGameState = (newState) => {
    console.log(">>>> gameStateOut", newState);
    socket.emit("player-turn", newState);
  };

  const correctAnswer = (player, num = 5) => {
    let newPlayer = { ...playerScores[player.user_id] };
    !newPlayer.questions
      ? (newPlayer.questions = 1)
      : (newPlayer.questions += 1);
    !newPlayer.correct ? (newPlayer.correct = 1) : (newPlayer.correct += 1);
    !newPlayer.score ? (newPlayer.score = num) : (newPlayer.score += num);
    console.log(newPlayer);
    return newPlayer;
  };

  const wrongAnswer = (player, num = -5) => {
    let newPlayer = { ...playerScores[player.user_id] };
    !newPlayer.questions
      ? (newPlayer.questions = 1)
      : (newPlayer.questions += 1);
    !newPlayer.score ? (newPlayer.score = num) : (newPlayer.score += num);
    return newPlayer;
  };

  const nextPlayerTurn = (turnState) => {
    // let newTurnState = [...turnState]
    turnState.push(turnState.shift()); //move front item to end
    return turnState;
  };
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
      };
      return newObjq;
    });
    const aArr = qArray.map((obj, index) => {
      const newObja = {
        cardOrder: index + 8,
        textCardFront: obj.answer,
        urlFront: "",
        matchId: obj.id,
        cardId: obj.id + "a",
        faceUp: false,
        isVisible: true,
      };
      return newObja;
    });
    const combinedArr = qArr.concat(aArr);

    return combinedArr;
  };

  const createCard = (cardInfoIn, index) => {
    let cardInfo = cardInfoIn
      ? cardInfoIn
      : Object.values(Object.values(fakeBoard)[0])[index];

    return (
      <Card
        textCardBack={cardInfo.textCardBack}
        textCardFront={cardInfo.textCardFront}
        key={cardInfo.cardId}
        cardId={cardInfo.cardId}
        passedOnClickFunc={gameHandleClick}
        matchId={cardInfo.matchId}
        cardOrder={cardInfo.cardOrder}
        faceUp={cardInfo.faceUp}
        isVisible={cardInfo.isVisible}
        getCardsFaceUp={getCardsFaceUp}
        isItMyTurn={isItMyTurn}
        urlFront={cardInfo.urlFront ? cardInfo.urlFront : cardFront}
      ></Card>
    );
  };

  const getCardsFaceUp = () => {
    console.log("**** cardsFaceUp:", cardsFaceUp);
    let cards = Object.entries(cardsFaceUp);
    let empty = cardsFaceUp.map((c) => c[1].cardId);

    console.log("**** getCardsFaceUp", cards, empty);
    return empty;
    return Object.values(board.cardsFaceUp).map((m) => m[1].cardId);
  };

  const handleGameOver = (state) => {
    let mapOver = Object.values(state.deck).filter((c) => {
      return c.isVisible;
    });
    return mapOver.length === 0 ? socket.emit("gameOver", gameRoom) : false;
  };

  const isItMyTurn = () => {
    return currentPlayer === me.username;
  };

  const checkIfMatch = (c1, c2) => {
    return c1[1].matchId === c2[1].matchId ? true : false;
  };

  const mapToBoard = (cardArrayIn, rows = 4, columns = 4) => {
    let placeHolder = cardArrayIn ? cardArrayIn : fakeBoard;
    console.log(
      "<<<< break when passed an empty array for cardArrayIn",
      cardArrayIn,
      placeHolder
    );
    if (!cardArrayIn.length) {
      return <h1>Error</h1>;
    }

    let cardArray = [];

    for (let i = 0; i < placeHolder.length; i++) {
      let row = [];
      for (let i = 0; i < columns; i++) {
        row.push(cardArrayIn.shift());
      }
      cardArray.push(row);
    }
    console.log("$$$$", cardArray);
    return (
      <div className="gameBoard">
        {cardArray.map((row, index) => {
          return (
            <div className="row" key={index}>
              {row.map((card, index2) => {
                let indexNum = index * 4 + index2;
                return createCard(card, indexNum);
              })}
            </div>
          );
        })}
      </div>
    );
  };
  const sendScores = (player) => {
    setModalState(true);
  };
  const modal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
  };

  const close = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  };

  let boardNuevo = { ...board };
  let deckNuevo = { ...boardNuevo.deck };
  let deckNuevoValues = Object.values(deckNuevo);
  let deckNuevoKeys = Object.keys(deckNuevo);

  console.log(
    ">>>> board break in function component general body",
    boardNuevo,
    deckNuevo,
    deckNuevoValues,
    deckNuevoKeys
  );

  let currentPlayer = turn[0].username;
  let turnText =
    currentPlayer === me.username
      ? "It's your turn!"
      : `It's ${currentPlayer}'s turn!`;

  let whoseTurn = isItMyTurn() ? " my-turn" : " not-my-turn " + me.username;

  const endGameScores = (player) => {
    if (Object.values(playerScores).length >= 3) {
      const tempPlayer = Object.values(playerScores)[2];
      return (
        <div className="scores">
          <h2>Questions attempted: {tempPlayer.questions}</h2>
          <h2>Correct answers: {tempPlayer.correct}</h2>
          <h2>Score: {tempPlayer.score}</h2>
        </div>
      );
    }
  };

  return (
    <div className="game-page">
      <h1 className={"player" + whoseTurn}>{turnText}</h1>
      <div className={"gameContainer" + whoseTurn}>
        {console.log("<<<< directly before mapToBoard render", board.deck)}

        {board.deck
          ? mapToBoard(Object.values(board.deck))
          : mapToBoard(Object.values(fakeBoard))}

        <div id="modal" className="endGameModal">
          <Link to="/lobby">
            <span onClick={(e) => {}} class="close">
              &times;
            </span>
          </Link>
          <div className="modalContent">
            <h1>GAME OVER</h1>
            {endGameScores()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Game);
