import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
// import '../App.css';
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
        <div className="card-parent" onClick={() => set(state => !state)}>
            <a.div class="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
                <h2>{props.headline}</h2>
            </a.div>
            <a.div class="c front"
            style={{ opacity,
                     transform: transform.interpolate(t => `${t} rotateX(180deg)`),
                     backgroundImage: `url(${props.urlFront})`  }}>
                <h3>{props.body}</h3>
            </a.div>
        </div>
    )
}

export default (withRouter(Card));