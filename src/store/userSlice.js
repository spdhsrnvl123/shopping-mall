import { createSlice } from "@reduxjs/toolkit";


let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age:20},
    /*
    <Redux의 state 변경하는 법>
    state 수정해주는 함수 만들고 원할 때 그 함수 실행해달라고 store.js에 요청
    1. state 수정해주는 함수(changeName) 만들기
    */
    reducers : {
        changeName(state){ //기존 state를 뜻함
            state.name = "park"
            //array/object 경우 직접 수정해도 state 변경이 된다.
            //결론 : state가 object/array면 return 없이 직접 수정해도된다.
            //그래서 문자하나만 필요해도 일부러 { }안에 담기도 한다. -> 수정이 편리하기 때문이다.
        },
        increase(state, action){
            state.age += action.payload //action.payload 화물보낸거 출력문법
            //파라미터 작명을 할때 보통 action이라고 많이 한다. 왜냐하면 요기에는 화물 뿐만 아니라 액션에 대한 여러가지 정보들이 들어 있기 때문이다.
            //state 변경함수를 action이라고 한다.
        },
        //파라미터 뚫어 놓으면 비슷한 함수 여러개 필요없다.
    }
    // 3. 만든 함수 import 해서 사용
})

export let { changeName, increase } = user.actions

export default user;