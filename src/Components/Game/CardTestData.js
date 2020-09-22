
const dataIn = {
    q: 'why though?',
    a: 'because reasons',
    qID: 1
}

const buildCardsFromApi = (data) => {
    let cards = []
    let cardNumber = 0
    for (let i = 0;i<data.length;i++){
        cardNumber += 1
        cards.push( {
            q: data[i].q,
            qID: data[i].qID,
            cardId: cardNumber,   
            cardPosition: { x: 0, y: 0 }           
        })
        cardNumber += 1
        cards.push( {
            a: data[i].a,
            qID: data[i].qID,
            number: cardNumber,   
            urlBackPhotos: '',
            cardId: cardNumber,
            cardPosition: { x: 0, y: 0 }           
        })
    }
}
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
    { textCardBack: "",
    textCardFront: "",
    urlFront: "https://www.signmart.com/assets/images/handheldstopsigns/handheldstopsigncropped.jpg" },
    { textCardBack: "",
    textCardFront: "STOP" ,
    pairCode: "",
    urlFront: "" },

    { textCardBack: "",
    textCardFront: "" ,
    urlFront: "https://www.tesla.com/xNVh4yUEc3B9/04_Desktop.jpg" },

    { textCardBack: "",
    textCardFront: "truck" ,
    urlFront: "" },

    { textCardBack: "",
    textCardFront: "meow" ,
    urlFront: "" },

    { textCardBack: "",
    textCardFront: "" ,
    urlFront: "https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg" },


    { textCardBack: "",
    textCardFront: "bark" ,
    urlFront: "" },

    { textCardBack: "",
    textCardFront: "" ,
    urlFront: "https://www.guidedogs.org/wp-content/uploads/2019/11/website-donate-mobile.jpg" },


    { textCardBack: "",
    textCardFront: "boing" ,
    urlFront: "" },

    { textCardBack: "",
    textCardFront: "" ,
    urlFront: "https://ae01.alicdn.com/kf/HTB1VmPQUSzqK1RjSZFHq6z3CpXaQ/10PCS-Custom-Made-Stainless-Steel-Metal-Coil-Compression-Spring-for-Machine-2-Wire-Diameter-x-25.jpg" },

    
    { textCardBack: "",
    textCardFront: "tap shoe" ,
    urlFront: "" },

    { textCardBack: "",
    textCardFront: "" ,
    urlFront: "https://images-na.ssl-images-amazon.com/images/I/510dApZlxvL._AC_UY500_.jpg" },


    { textCardBack: "",
    textCardFront: "egg" ,
    urlFront: "" },

    { textCardBack: "",
    textCardFront: "" ,
    urlFront: "https://www.sophisticatedgourmet.com/wp-content/uploads/2020/04/how-to-fry-an-egg-1-720x720.jpg" },


    { textCardBack: "",
    textCardFront: "eiffel tower" ,
    urlFront: "" },

    { textCardBack: "",
    textCardFront: "" ,
    urlFront: "https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4NjAzNTM2MTQ4MTkx/hith-eiffel-tower-istock_000016468972large-2.jpg" },
]


export default sixteenCards;