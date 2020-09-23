// //state value
// const [qArray, setqArray] = useState([])


// //axios call
// axios.get(`http://jservice.io/api/clues?category=17`)
//     .then((results) => setqArray(shuffledQuestions(results.data)))
//     .catch(err => console.log(err))

// //randomize catagory
// const shuffledQuestions = (qArray) => {
//     var currentIndex = qArray.length, temporaryValue, randomIndex;
  
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
  
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
  
//       // And swap it with the current element.
//       temporaryValue = qArray[currentIndex];
//       qArray[currentIndex] = qArray[randomIndex];
//       qArray[randomIndex] = temporaryValue;
//     }
  
//     return qArray;
//   } 
