
const initialState = {
    game: {},
    cardSetFunctions: [
        // [set1, set2, set3, set4]
        // [set5, set6, ]
        //
        //
    ] // cardSetFunctions[0][3]()
}

const GET_FLIP_FUNCTION = 'GET_FLIP_FUNCTION';

export function getSetFunction(newSetFunction){
    return {
        type: GET_FLIP_FUNCTION,
        payload: newSetFunction
    }
}


export default function gameReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_FLIP_FUNCTION:
            console.log('hit game redux', payload)

            //add payload to cardSetFunctions

            return {...state, cardSetFunctions: payload }
        default:
            return state
    }
}