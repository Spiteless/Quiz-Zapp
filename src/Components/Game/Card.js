import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import { getSetFunction } from '../../redux/gameReducer';
import { connect } from 'react-redux';
// import axios from 'axios';

import { useSpring, animated as a } from 'react-spring'
// import './styles.css'


function Card(props) {
    const [isCardFaceUp, setIsCardFaceUp] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: isCardFaceUp ? 1 : 0,
        transform: `perspective(600px) rotateX(${isCardFaceUp ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    })


    // useEffect(() => {
    //     console.log("&&&& useEffect ran for", props.cardId,
    //         (isCardFaceUp) ? "Card is face up" : "Card is face down")
    // }, [props.faceUp]);

    const handleClick = (flipOver) => {

        if (flipOver) {setIsCardFaceUp(state => !state)}

        let cardStatus = {}
        cardStatus.cardId = props.cardId
        cardStatus.cardOrder = props.cardOrder
        cardStatus.faceUp = (flipOver)
            ? !isCardFaceUp
            : isCardFaceUp
        cardStatus.matchId = props.matchId
        cardStatus.textCardFront = props.textCardFront
        cardStatus.urlFront = props.urlFront
        let cardOut = {}
        cardOut[props.cardId] = cardStatus
        props.passedOnClickFunc(cardOut)
        // return cardStatus
    }


    return (
        <div className="card-parent" >
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

                    handleClick('flipOver')
                }}>
                <h3 className='q-a-text'>{props.textCardFront}</h3>
                <div className='btn-container-card'>
                    <button className='btn' onClick={(e) => {
                        if (isCardFaceUp) { e.stopPropagation(); }
                    }}>🔙</button>
                    <button className='btn' onClick={(e) => {

                        if (isCardFaceUp) {

                            e.stopPropagation();
                        }
                        handleClick()
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