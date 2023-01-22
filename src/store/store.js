import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './userSlice'
//let user 코드 길면 알아서 import export 쓰면 되는 것이다.


let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

let homework = createSlice({
    name : 'homework',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ]
})

export default configureStore({
    reducer : {
        //여기에 등록해야 사용가능
        user : user.reducer,
        stock : stock.reducer,
        homework : homework.reducer
    }
})
