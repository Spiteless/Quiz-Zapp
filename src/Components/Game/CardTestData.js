// -----DELETE THIS
// const generateCards = () => {
//     let cards = []
//     let cardNumber = 0

//     images.forEach((image, key) => {
//       for (let i = 0; i < 2; i++) {
//         cardNumber += 1

//         cards.push({
//           number: cardNumber,
//           pair: key,
//           image: image,
//           open: false,
//           matched: false
//         })
//       }
//     })

//     setDeck(shuffleDeck(cards))
//   }
// ------
const sixteenCards = [
    { 
    cardOrder: 1,
    textCardFront: "The US Constitution",
    urlFront: "https://www.signmart.com/assets/images/handheldstopsigns/handheldstopsigncropped.jpg",
    // matchId is going to come from the question ID from the API. 
    matchId: 123,
    cardId: "card" + 1},
    { 
    cardOrder: 2,
    textCardFront: 'It begins, "We the people of the United States, in order to form..." ',
    pairCode: "",
    urlFront: "",
    matchId: 123,
    cardId: "card" + 2 },

    { 
    cardOrder: 3, 
    textCardFront: "" ,
    urlFront: "https://www.tesla.com/xNVh4yUEc3B9/04_Desktop.jpg",
    matchId: 124,
    cardId: "card" + 3 },

    { 
    cardOrder: 4, 
    textCardFront: "truck" ,
    urlFront: "",
    matchId: 124,
    cardId: "card" + 4 },

    { 
    cardOrder: 5,
    textCardFront: "meow" ,
    urlFront: "",
    matchId: 125,
    cardId: "card" + 5 },
  { 
    cardOrder: 6,
    textCardFront: "" ,
    urlFront: "https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg",
    matchId: 125,
    cardId: "card" + 6 },

  { 
    cardOrder: 7,
    textCardFront: "bark" ,
    urlFront: "",
    matchId: 126,
    cardId: "card" + 7 },
  { 
    cardOrder: 8, 
    textCardFront: "" ,
    urlFront: "https://www.guidedogs.org/wp-content/uploads/2019/11/website-donate-mobile.jpg",
    matchId: 126,
    cardId: "card" + 8 },

  { 
    cardOrder: 9, 
    textCardFront: "boing" ,
    urlFront: "", 
    matchId: 127,
    cardId: "card" + 9},
  { 
    cardOrder: 10,
    textCardFront: "" ,
    urlFront: "https://ae01.alicdn.com/kf/HTB1VmPQUSzqK1RjSZFHq6z3CpXaQ/10PCS-Custom-Made-Stainless-Steel-Metal-Coil-Compression-Spring-for-Machine-2-Wire-Diameter-x-25.jpg",
    matchId: 127,
    cardId: "card" + 10 },

    
    { 
    cardOrder: 11,
    textCardFront: "tap shoe" ,
    urlFront: "",
    matchId: 128,
    cardId: "card" + 11},

    { 
    cardOrder: 12,
    textCardFront: "" ,
    urlFront: "https://images-na.ssl-images-amazon.com/images/I/510dApZlxvL._AC_UY500_.jpg",
    matchId: 128,
    cardId: "card" + 12 },


    { 
    cardOrder: 13,
    textCardFront: "egg" ,
    urlFront: "",
    matchId: 123,
    cardId: "card" + 13 },

    { 
    cardOrder: 14,
    textCardFront: "" ,
    urlFront: "https://www.sophisticatedgourmet.com/wp-content/uploads/2020/04/how-to-fry-an-egg-1-720x720.jpg",
    matchId: 123,
    cardId: "card" + 14 },


    { 
    cardOrder: 15,
    textCardFront: "eiffel tower" ,
    urlFront: "",
    matchId: 123,
    cardId: "card" + 15 },

    { 
    cardOrder: 16,
    textCardFront: "" ,
    urlFront: "https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4NjAzNTM2MTQ4MTkx/hith-eiffel-tower-istock_000016468972large-2.jpg",
    matchId: 123,
    cardId: "card" + 16 },
]


export default sixteenCards;