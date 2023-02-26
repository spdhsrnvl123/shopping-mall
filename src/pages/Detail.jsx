import React,{ useContext, useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import TabComponent from "../components/TabComponent";
import '../App.css'
import {Context1} from './../App.js'
import { useDispatch } from "react-redux";
import { addItem } from "../store/store";

const Detail = (props)=>{
    let dispatch = useDispatch();
    let {재고} = useContext(Context1); //보관함 해체 함수 그러면 state가 object형태로 나온다.

    const [alert,setAlert] = useState(true)
    const [text, setText] = useState("");
    let [tap, setTap] = useState(0);

    useEffect(()=>{
        // console.log("clean up function")
            setTimeout(()=>{
                setText("end");
            },500)
        return ()=>{
            // console.log("useEffect() 실행되기 전에 실행된다.")
        }
    },[]); //한번만 렌더링

    useEffect(()=>{
        let a = setTimeout(()=>{ //타이머를 쓸 때는 변수에다가 저장해두면 좋음
            setAlert(false)
        },2000)
        // console.log(2)
        //2)
        //대충 서버로 데이터 요청하는 코드(2초 소요)
        //근데 2초 사이에 재렌더링 되어버리면?
        //요청이 무한 반복이 되어버림(버그가 생길 수 도 있다.)
        return ()=>{
            //예를들어 기존타이머는 제거해주세요~~ 하면 그전에 쓰던 기존 타이머를 제거하면 더 깔끔하게 새로운 타이머를 쓸 수 있음
            clearTimeout(a) //타이머 제거해주는 함수
            //2)
            //기존 데이터요청은 제거해주세요~ 라는 코드를 작성해주면 된다(백지상태)
        }
    },[])

    let [value, setValue] = useState('')
    let {id} = useParams();

    let 찾은상품 = props.shoes.find(x => x.id === Number(id))
    console.log(찾은상품);
    useEffect(()=>{

        let 꺼낸거 = localStorage.getItem('watched')
        꺼낸거 = JSON.parse(꺼낸거);
        꺼낸거.push(찾은상품.id)
        꺼낸거 = new Set(꺼낸거)
        꺼낸거 = Array.from(꺼낸거) //배열로변경
        localStorage.setItem('watched', JSON.stringify(꺼낸거));

        // array에서 중복제거 쉽게하려면 Set 자료형 써도 된다.
        //array -> Set(중복없앤 array) -> array

    },[])

    let target = props.shoes.filter((v)=>{
        return v.id === Number(id);
    })


    const onInput = (e)=>{
        const { value } = e.target
        setValue(value)
        if(isNaN(value)){
            console.log("숫자를 입력하세요!")
        }
    }

    return(
        <div className={`container start ${text}`}>
            {alert ? <div className="alrer alert-warning">2초이내 구매시 할인</div> : null}
        <div className="row">
            <div className="col-md-6">
            <img src={`https://codingapple1.github.io/shop/shoes${target[0].id + 1}.jpg`} width="100%" />
            </div>
            
            {/* <input value={value} onChange={onInput} type="text" style={{width:"200px",margin:"0 auto"}}></input> */}
            <div className="col-md-6">
            <h4 className="pt-5">{target[0].title}</h4>
            {/*
                /detail/0 접속시 0번째 상품말고 상품 id가 0인걸 보여주면 좋을듯 
                id변수를 그대로 가져다가 쓰면 만약 정렬버튼이 있을때 인덱스가 뒤바뀌게 되어 상세페이지가 이상해진다.
                해결방법 : 데이터안에 고유의 id를 가지고 보여주면 된다.
            */}
            <p>{target[0].content}</p>
            <p>{target[0].price}원</p>
            <button onClick={()=>{
                console.log(1)
                dispatch(addItem({id : 1, name :'Red Knit', count : 1}))
            }} className="btn btn-danger">주문하기</button> 
            </div>
        </div>

        <Nav variant="tabs" defaultActiveKey="link0">
            {/* defaultActiveKey - 기본으로 눌려있는 버튼 */}
            <Nav.Item>
                <Nav.Link onClick={()=>{setTap(0)}} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{setTap(1)}} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{setTap(2)}} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabComponent shoes={props.shoes} tap={tap} />
        </div> 
    )
}

export default Detail;