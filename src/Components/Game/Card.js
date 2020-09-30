import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from "react-router-dom";
import { getSetFunction } from '../../redux/gameReducer';
import { connect } from 'react-redux';
// import axios from 'axios';

import { useSpring, animated as a } from 'react-spring'
// import './styles.css'


function Card(props) {
    const [isCardFaceUp, setIsCardFaceUp] = useState(props.faceUp)
    const { transform, opacity } = useSpring({
        opacity: isCardFaceUp ? 1 : 0,
        transform: `perspective(600px) rotateX(${isCardFaceUp ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    })

    // let first = 0
    useEffect(() => {

        console.log("#### use effect ran props.faceUp", props.cardId)
        if (props.isVisible) {

            setIsCardFaceUp(state => props.faceUp)
        }
    }, [props.faceUp]);

    const cardHandleClick = (action) => {
        console.log("**** cardHandleClick", props, action)
        
        // if (!props.isItMyTurn()) { return }
        if (!props.isVisible) { return } //if invisible, disregard clicks
        let faceUpCards = props.getCardsFaceUp()

        if (faceUpCards.length === 1
            && faceUpCards.includes(props.cardId)) { return }

        if (faceUpCards.length >= 2) {
            //disregard clicks on non-faceUp cards while 2 faceup
            if (!faceUpCards.includes(props.cardId)) {
                // alert(faceUpCards.join(","))
                return }
            //disregard clicks on card body, must click buttons
            if (action === 'flipOver') { return }
        }

        let cardStatus = {}
        cardStatus['button'] = '';
        cardStatus.isVisible = props.isVisible
        if (action === 'flipOver') { setIsCardFaceUp(state => !state) }
        if (action === 'isVisible') { cardStatus.isVisible = false }
        if (action === 'match' ) { 
            cardStatus.button = 'match' 
            // alert("Card Match")
        }
        if (action === 'back') {
            cardStatus['button'] = 'back';
            console.log("**** !!!!1", cardStatus)
            // alert('card: back: ' + cardStatus.button)
        }

        cardStatus.cardId = props.cardId
        cardStatus.cardOrder = props.cardOrder
        console.log("**** !!!!2", cardStatus)
        cardStatus.faceUp = (action === 'flipOver')
            ? !isCardFaceUp
            : isCardFaceUp
        cardStatus.matchId = props.matchId
        cardStatus.textCardFront = props.textCardFront
        cardStatus.urlFront = props.urlFront
        console.log("**** !!!!3", cardStatus)
        let cardOut = {}
        cardOut[props.cardId] = {...cardStatus}
        cardOut.name = props.cardId
        console.log("**** !!!!4", cardStatus)
        console.log("####card", cardOut)
        console.log('**** cardOut', cardOut, cardStatus.button)
        props.passedOnClickFunc({...cardStatus})
        // return cardStatus
    }

    let classes = "card-parent "
    if (!props.isVisible) {
        classes += " invisible"
    }

    return (
        <div className={classes} >
            <a.div class="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}
            >
                <h2>{props.textCardBack}</h2>
            </a.div>

            <a.div class="c front"
                style={{
                    opacity,
                    transform: transform.interpolate(t => `${t} rotateX(180deg)`),
                    backgroundImage: `url(${props.urlFront})`,
                    //  backgroundSize: 'contain'
                }}
                onClick={() => {

                    cardHandleClick('flipOver')
                }}>
                <h3 className='q-a-text'>{props.textCardFront}</h3>
                <div className='btn-container-card'>
                    <button className='btn btn-left' onClick={(e) => {
                        if (isCardFaceUp) { e.stopPropagation(); }
                        cardHandleClick('back')
                    }}>Flip 🙁</button>
                    <button className='btn btn-right' onClick={(e) => {

                        if (isCardFaceUp) {

                            e.stopPropagation();
                        }
                        cardHandleClick('match')
                    }}>Match!</button>
                </div>
            </a.div>
        </div>
    )
}

const mapStateToProps = reduxState => {
    // const { email, StyledImg, userId } = reduxState.user;
    const { auth, game } = reduxState
    const newState = {
        ...auth,
        ...game
    };
    return newState
};


export default connect(mapStateToProps, { getSetFunction })(withRouter(Card));