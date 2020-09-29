import { withRouter } from "react-router-dom";
import React, { useContext } from 'react';
import { SocketContext } from '../Context/Context';
// import '../../css/About.css';
import './About.css';

const About = (props) => {
    const context = useContext(SocketContext)
    console.log(context)
    console.log('just a word')
    return (
        <div className='about-pg'>
            <div className='gray-bar-about'>
                <div className='abt-text-container'>
                    <p className='text-large'>We are the supremely awesome developers of this most excellent app.</p>
                    <p className='text'>With COVID creating all kinds of free time for people, and wreaking havoc with the schools, it seems like students could use a way to keep occupied. And this memory game is just that and more. Kill two birds with one stone while you are entertained and educated by the game.</p>
                    <p className='text-large'>You're welcome.</p>
                    <p className='text'>Now give us all your monies.</p>
                </div>
            </div>
        </div>
    )
}

export default About;