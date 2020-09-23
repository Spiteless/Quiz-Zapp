import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
import {getSetFunction} from '../../redux/gameReducer';
import {connect} from 'react-redux';
// import axios from 'axios';

import { useSpring, animated as a } from 'react-spring'
// import './styles.css'


function Card(props) {
    const [flipped, set] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    })

    


    return (
        <div className="card-parent" >
            <a.div class="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}
            onClick={() => set(state => !state)}>
                <h2>{props.textCardBack}</h2>
            </a.div>
            
            <a.div class="c front"
            style={{ opacity,
                     transform: transform.interpolate(t => `${t} rotateX(180deg)`),
                     backgroundImage: `url(${props.urlFront})`,
                    //  backgroundSize: 'contain'
                       }}
                       onClick={() => set(state => !state)}>
                <h3 className='q-a-text'>{props.textCardFront}</h3>
            <div className='btn-container-card'>
                <button className='btn' onClick={(e) => {
                    if (flipped) {e.stopPropagation(); alert(`Back! ${flipped}`)} }}>🔙</button>
                <button className='btn' onClick={(e) => {
                    if (flipped) {e.stopPropagation(); alert(`Match! ${flipped}`)} }}>Match!</button>
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
    console.log("Card/mapStateToProps:", reduxState);
    // console.log("gameReducer on card.js", gameReducer);
    const { auth, game } = reduxState
    console.log(auth, game)
    const newState = {
        ...auth,
        ...game
    };
    return newState
};


export default connect(mapStateToProps, {getSetFunction})(withRouter(Card));