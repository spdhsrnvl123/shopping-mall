import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from "../store/userSlice"

const Cart = ()=>{
    let state = useSelector((state)=> state)
    console.log(state)
    let dispatch = useDispatch()
    return(
        <div>
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={()=>{
                dispatch(increase(100))
                //파라미터를 payload라고 했었는데 왜? increase를 실행해달라고 dispatch(메시지)를 날렸다
                //메시지와 함께 화물을 실어보낸다는 것이다. 라는 비유적으로 설명하려고 리덕스만든 사람이 이름을 붙였을 뿐이다.
            }}>버튼</button>
            <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.homework.map((v,i)=>{
                        return(
                            <tr key={v.id}>
                                <td>{i+1}</td>
                                <td>{v.name}</td>
                                <td>{v.count}</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(changeName())
                                    }}>+</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </Table>
        </div>
    )
}

export default Cart;