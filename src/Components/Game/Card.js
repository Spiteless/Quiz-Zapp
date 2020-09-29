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
        if (props.isVisible){

            setIsCardFaceUp(state => props.faceUp)
        }
        // (props.faceUp) ? "Card is visible" : "Card is not visible"
    }, [props.faceUp]);
    // useEffect(() => {
    //         // console.log("#### use effect ran props.faceUp", props.cardId)
    //         // (props.faceUp) ? "Card is visible" : "Card is not visible"
    // }, [props.isVisible]);

    const cardHandleClick = (action) => {
        if (!props.isVisible) { return } //if invisible, disregard clicks
        let faceUpCards = props.getCardsFaceUp()
        if (faceUpCards.length >= 2 
            && !faceUpCards.includes(props.cardId)) {
            // if (!faceUpCards.includes(props.cardId)) { return }
          return  }
        let cardStatus = {}
        cardStatus.isVisible = props.isVisible
        if (action === 'flipOver') { setIsCardFaceUp(state => !state) }
        if (action === 'isVisible') { cardStatus.isVisible = false }
        if (action === 'match') { cardStatus.button = 'match' }
        if (action === 'back') {
            cardStatus.button = 'back';
            // alert('card: back: ' + cardStatus.button)
        }

        cardStatus.cardId = props.cardId
        cardStatus.cardOrder = props.cardOrder
        cardStatus.faceUp = (action === 'flipOver')
            ? !isCardFaceUp
            : isCardFaceUp
        cardStatus.matchId = props.matchId
        cardStatus.textCardFront = props.textCardFront
        cardStatus.urlFront = props.urlFront
        let cardOut = {}
        cardOut[props.cardId] = cardStatus
        cardOut.name = props.cardId
        console.log("####card", cardOut)
        props.passedOnClickFunc(cardOut)
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
                    <button className='btn' onClick={(e) => {
                        if (isCardFaceUp) { e.stopPropagation(); }
                        cardHandleClick('back')
                    }}>🔙!</button>
                    <button className='btn' onClick={(e) => {

                        if (isCardFaceUp) {

                            e.stopPropagation();
                        }
                        cardHandleClick('match')
                    }}>Match!</button>
                </div>
            </a.div>
            {/* <div className='btn-container-card'>
                <button onClick={() => {}} className='btn'>🔙</button>
                <button className='btn'>Match!</button>
            </div> */}
            {/* <div className={c front ? <div className=} */}
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