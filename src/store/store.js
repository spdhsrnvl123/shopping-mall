import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './userSlice'

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

let homework = createSlice({
    name : 'homework',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1},
    ],
    reducers : {
        countIncrease(state,action){
            // state.filter((v,i)=>{
            //     return action.payload === v.id ? v.count++ : null;
            // })
            let 번호 = state.findIndex((a)=>{
                return a.id === action.payload
            })
            state[번호].count++
        },
        addItem(state,action){
            state.push(action.payload)
        }
    }
})

export let { countIncrease, addItem } = homework.actions;

export default configureStore({
    reducer : {
        //여기에 등록해야 사용가능
        user : user.reducer,
        stock : stock.reducer,
        homework : homework.reducer
    }
})