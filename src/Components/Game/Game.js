import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
// import '../App.css';
// import axios from 'axios';
import Card from "./Card"
import { useSpring, animated as a } from 'react-spring'
// import './styles.css'

// backgroundImage: "url('url-to-background.png')", //state
// style={{backgroundImage: this.state.backgroundImage}} //component property

// const sixteenCards = [
//   { textCardBack: "",
//     textCardFront: "",
//     urlFront: "https://www.signmart.com/assets/images/handheldstopsigns/handheldstopsigncropped.jpg" },
//   { textCardBack: "",
//     textCardFront: "STOP" ,
//     urlFront: "" },

//   { textCardBack: "",
//     textCardFront: "" ,
//     urlFront: "https://www.tesla.com/xNVh4yUEc3B9/04_Desktop.jpg" },

//   { textCardBack: "",
//     textCardFront: "truck" ,
//     urlFront: "" },

//   { textCardBack: "",
//     textCardFront: "meow" ,
//     urlFront: "" },

//   { textCardBack: "",
//     textCardFront: "" ,
//     urlFront: "https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg" },


//   { textCardBack: "",
//     textCardFront: "bark" ,
//     urlFront: "" },

//   { textCardBack: "",
//     textCardFront: "" ,
//     urlFront: "https://www.guidedogs.org/wp-content/uploads/2019/11/website-donate-mobile.jpg" },


//   { textCardBack: "",
//     textCardFront: "boing" ,
//     urlFront: "" },

//   { textCardBack: "",
//     textCardFront: "" ,
//     urlFront: "https://ae01.alicdn.com/kf/HTB1VmPQUSzqK1RjSZFHq6z3CpXaQ/10PCS-Custom-Made-Stainless-Steel-Metal-Coil-Compression-Spring-for-Machine-2-Wire-Diameter-x-25.jpg" },

    
//   { textCardBack: "",
//     textCardFront: "tap shoe" ,
//     urlFront: "" },

//   { textCardBack: "",
//     textCardFront: "" ,
//     urlFront: "https://images-na.ssl-images-amazon.com/images/I/510dApZlxvL._AC_UY500_.jpg" },


//   { textCardBack: "",
//     textCardFront: "egg" ,
//     urlFront: "" },

//   { textCardBack: "",
//     textCardFront: "" ,
//     urlFront: "https://www.sophisticatedgourmet.com/wp-content/uploads/2020/04/how-to-fry-an-egg-1-720x720.jpg" },


//   { textCardBack: "",
//     textCardFront: "eiffel tower" ,
//     urlFront: "" },

//   { textCardBack: "",
//     textCardFront: "" ,
//     urlFront: "https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4NjAzNTM2MTQ4MTkx/hith-eiffel-tower-istock_000016468972large-2.jpg" },


// ]

const rowOne = sixteenCards.slice(0,4);
const rowTwo = sixteenCards.slice(4,8);
const rowThree = sixteenCards.slice(8,12);
const rowFour = sixteenCards.slice(12,16);

const firstRow = rowOne.map(el => {
  return <Card textCardBack={el.textCardBack}
               textCardFront={el.textCardFront}
               key={el.textCardBack} // CHANGE LATER
               urlFront={(el.urlFront)
                          ? el.urlFront
                          : null}/>
})

const secondRow = rowTwo.map((el, ind) => {
  return <Card textCardBack={el.textCardBack} textCardFront={el.textCardFront} key={ind} // CHANGE LATER
  urlFront={(el.urlFront)
             ? el.urlFront
             : null} />
})

const thirdRow = rowThree.map(el => {
  return <Card textCardBack={el.textCardBack} textCardFront={el.textCardFront} key={el.textCardBack} // CHANGE LATER
  urlFront={(el.urlFront)
             ? el.urlFront
             : null} />
})

const fourthRow = rowFour.map(el => {
  return <Card textCardBack={el.textCardBack} textCardFront={el.textCardFront} key={el.textCardBack} // CHANGE LATER
  urlFront={(el.urlFront)
             ? el.urlFront
             : null} />
})

const mappedBoard = (props) => (
  <div className="gameBoard">
    <div className="row">
      {rowOne.map(el => <Card textCardBack={el.textCardBack} textCardFront={el.textCardFront} />)}
    </div>
    <div className="row">
      {rowTwo.map(el => <Card textCardBack={el.textCardBack} textCardFront={el.textCardFront} />)}
    </div>
    <div className="row">
      {rowThree.map(el => <Card textCardBack={el.textCardBack} textCardFront={el.textCardFront} />)}
    </div>
    <div className="row">
       {rowFour.map(el => <Card textCardBack={el.textCardBack} textCardFront={el.textCardFront} />)}
    </div>

  </div>
  
)



const Game = (props) => {

  // const [flipped, set] = useState(false)
  //   const { transform, opacity } = useSpring({
  //     opacity: flipped ? 1 : 0,
  //     transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
  //     config: { mass: 5, tension: 500, friction: 80 }
  //   })

  return (
    <div className="gameContainer" >
      {/* <h1> Game </h1> */}

      {mappedBoard}
      <div className="gameBoard">
        <div className="row">
          {/* <div className="card card1" onClick={() => set(state => !state)}>
              <a.div class="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
                  <h2>{props.textCardBack}</h2>
                  </a.div>
                  <a.div class="c front" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
                      <h3>{props.textCardFront}</h3>
                  </a.div>
            </div> */}

          {/* <Card className= "otherCard" textCardBack="Chicken" textCardFront="bawk"/>
             <Card className= "otherCard" textCardBack="Dog" textCardFront="woof"/>
             <Card className= "otherCard" textCardBack="Cow" textCardFront="moo"/>
             <Card className= "otherCard" textCardBack="Goat" textCardFront="baaa"/> */}

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

      <div className="chatWindow" ></div>

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