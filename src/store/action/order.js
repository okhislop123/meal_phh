import axios from "axios";
import { createAction } from "./createAction";
import { types } from "./types";

export const addMeal = (mealName,reset) => {
    return async (dispatch) => {
        try{
            const res = await axios({
                url:"https://www.themealdb.com/api/json/v1/1/search.php",
                method:"GET",
                params:{
                    s:mealName,
                }
            })
            if(!res.data.meals){
                alert("Meal not found");
            }else{
                const data = {
                    name:mealName,
                    amount:res.data.meals.length,
                }
                dispatch(createAction(types.ADD_ORDERS,data));
                alert("Meal has been added");
                reset();
            }
            
        }catch(err){
            console.log(err);
        }
    }
}

export const deleteMeal = (mealList,closePopup) => {
    return (dispatch) => {
        dispatch(createAction(types.DELETE_MEAL,mealList));
        closePopup();
        alert("Successful delete");

    }
}