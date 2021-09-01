import { types } from "../action/types";

const ininialState = {
    mealList:[],
}

const reducer = (state = ininialState,{type,payload}) => {
    switch(type){
        case types.ADD_ORDERS:
            state.mealList = [...state.mealList,payload];
            return {...state};
        case types.DELETE_MEAL:
            state.mealList = payload;
            return {...state};
        default:
            return state;
    }
}

export default reducer;