import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
// import '../App.css';
// import axios from 'axios';
import Card from "./Card"
import { useSpring, animated as a } from 'react-spring'
// import './styles.css'

const sixteenCards = [
  { headline: "Car", body: "vroom" },
  { headline: "Bus", body: "beep" },
  { headline: "Truck", body: "honk" },
  { headline: "Bike", body: "dingding" },
  { headline: "Cat", body: "meow" },
  { headline: "cow", body: "moo" },
  { headline: "Dog", body: "bark" },
  { headline: "Bird", body: "chirp" },
  { headline: "Ball", body: "boing" },
  { headline: "Mouse", body: "click" },
  { headline: "Keyboard", body: "tap" },
  { headline: "A", body: "1" },
  { headline: "B", body: "2" },
  { headline: "C", body: "3" },
  { headline: "D", body: "4" },
  { headline: "E", body: "5" },
]

const rowOne = sixteenCards.slice(0,3);
const rowTwo = sixteenCards.slice(4,7);
const rowThree = sixteenCards.slice(8,11);
const rowFour = sixteenCards.slice(12,15);

const firstRow = rowOne.map(el => {
  return <Card headline={el.headline} body={el.body} />
})

const secondRow = rowTwo.map(el => {
  return <Card headline={el.headline} body={el.body} />
})

const thirdRow = rowThree.map(el => {
  return <Card headline={el.headline} body={el.body} />
})

const fourthRow = rowFour.map(el => {
  return <Card headline={el.headline} body={el.body} />
})

// const mappedBoard = (props) => (
//   <div className="gameBoard">
//     <div className="row">
//       {rowOne.map(el => <Card headline={el.headline} body={el.body} />)}
//     </div>
//     <div className="row">
//       {rowTwo.map(el => <Card headline={el.headline} body={el.body} />)}
//     </div>
//     <div className="row">
//       {rowThree.map(el => <Card headline={el.headline} body={el.body} />)}
//     </div>
//     <div className="row">
//        {rowFour.map(el => <Card headline={el.headline} body={el.body} />)}
//     </div>

    
//   </div>
  
// )



const Game = (props) => {

  // const [flipped, set] = useState(false)
  //   const { transform, opacity } = useSpring({
  //     opacity: flipped ? 1 : 0,
  //     transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
  //     config: { mass: 5, tension: 500, friction: 80 }
  //   })

  return (
    <div className="gameContainer" >
      <h1> Game </h1>

      {/* {mappedBoard} */}
      <div className="gameBoard">
        <div className="row">
          {/* <div className="card card1" onClick={() => set(state => !state)}>
              <a.div class="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
                  <h2>{props.headline}</h2>
                  </a.div>
                  <a.div class="c front" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
                      <h3>{props.body}</h3>
                  </a.div>
            </div> */}

          {/* <Card className= "otherCard" headline="Chicken" body="bawk"/>
             <Card className= "otherCard" headline="Dog" body="woof"/>
             <Card className= "otherCard" headline="Cow" body="moo"/>
             <Card className= "otherCard" headline="Goat" body="baaa"/> */}

          {firstRow}

          {/* <div className=" card card2"></div> */}
          {/* <div className=" card card3"></div> */}
          {/* <div className=" card card4"></div> */}
        </div>

        <div className="row">
          {/* <div className=" card card5"></div>
          <div className=" card card6"></div>
          <div className=" card card7"></div>
          <div className=" card card8"></div> */}
          {secondRow}
          
        </div>

        <div className="row">
          {/* <div className=" card card9"></div>
          <div className=" card card10"></div>
          <div className=" card card11"></div>
          <div className=" card card12"></div> */}
          {thirdRow}
          
        </div>

        <div className="row">
          {/* <div className=" card card13"></div>
          <div className=" card card14"></div>
          <div className=" card card15"></div>
          <div className=" card card16"></div> */}
          {fourthRow}

        </div>

      </div>
    </div>
  )
};


// function Card(props) {
//   const [flipped, set] = useState(false)
//   const { transform, opacity } = useSpring({
//     opacity: flipped ? 1 : 0,
//     transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
//     config: { mass: 5, tension: 500, friction: 80 }
//   })
//   return (
//     <div onClick={() => set(state => !state)}>
//       <a.div class="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform }} />
//       <a.div class="c front" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} />
//     </div>
//   )
// }


export default (withRouter(Game));