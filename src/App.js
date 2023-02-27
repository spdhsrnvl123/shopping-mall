import './App.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import data from './db/data'
import { createContext, useEffect, useState } from 'react';
import Card from './components/Card';
import { Routes, Route, useNavigate, Link} from 'react-router-dom'
import Detail from './pages/Detail';
import About from './pages/About';
import One from './pages/One';
import Two from './pages/Two';
import Event from './pages/Event';
import axios from 'axios';
import Cart from './pages/Cart';
import { useQuery } from 'react-query';

export let Context1 = createContext()

function App() {
  //watched 항목 setItem() 하지 말아주세요~라는 코드
  const savedUsername = localStorage.getItem('watched');
  if(savedUsername === null){
    localStorage.setItem('watched',JSON.stringify([]))
  }

  let [shoes,setShoes] = useState(data);
  let [ 재고 ] = useState([10, 11, 12])
  let [count,setCount] = useState(0);

  //중괄호와 return은 동시에 생략 가능
  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
    console.log('요청됨')
      return a.data
    }),
    { staleTime : 2000 } //refetch 되는 간격
  )

  // result.data
  // result.isLoading
  // result.error

  //정렬 함수
  const onSort = ()=>{
    let copy = [...shoes]
    console.log(copy)
    copy.sort((a,b)=>{
      if(a.title > b.title) return 1;
      if(a.title < b.title) return -1;
      return 0;
    })
    setShoes(copy);
  }

  return (
    <div className="App">
      <Navbar bg="gray" variant="gray">
        <Container>
          <Link to = "/">shoeShop</Link>
          <Nav className="me-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Detail</Nav.Link>
            <Link to="cart">cart</Link>
          </Nav>
          <Nav className='ms-auto'>
            {/* { result.isLoading ? '로딩중' : result.data.name } */}
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={
          <>
                <div className="main-bg"></div>
                <div className="container">
                <Button onClick={()=>{ onSort() }} style={{marginTop:"20px"}} variant="dark">sort</Button>
                  <div className="row">
                    {
                      shoes.map((v,i)=>{
                        return(
                          <Link key={v.id} to={`/detail/${v.id}`}>
                            <Card key={v.id} shoes={v} i={i} />
                          </Link>
                        )
                      }
                    )
                    }
                  </div>
                </div>
                <button onClick={()=>{
                  // 로딩중UI 띄우기~
                  
                  /*
                    axios.get('https://codingapple1.github.io/shop/data3.json')
                    .then((data)=>{
                        let responseData = data.data;
                        // console.log(responseData)
                        let copy2 = [...shoes]
                        setShoes([...copy2,...responseData])
                      // 로딩중 UI 숨기기~
                      })
                    .catch(()=>{
                      console.log('Data 통신과정에서 오류가 발생하였습니다.')
                    })
                  */
                  Promise.all([
                    axios.get('https://codingapple1.github.io/shop/data2.json'),
                    axios.get('https://codingapple1.github.io/shop/data3.json')
                  ])
                  .then((data)=>{
                    if(count === 0){
                      let responseData = data[0].data;
                      console.log(responseData);
                      let copy2 = [...shoes]
                      setShoes([...copy2,...responseData]);
                      setCount(count + 1);
                    }
                    else if(count === 1){
                      let responseData2 = data[1].data;
                      console.log(responseData2);
                      let copy3 = [...shoes]
                      setShoes([...copy3,...responseData2])
                      setCount(count + 1);
                    }
                    else{
                      console.log("상품이 존재하지 않습니다.")
                    }
                    })
                    .catch(()=>{
                      console.log('Data 통신과정에서 오류가 발생하였습니다.')
                    })
                }}>더보기</button>
          </>
        } />
        <Route path="/detail/:id" element={
          <Context1.Provider value={{ 재고, shoes }}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />
        {/* 페이지 여러개 만들고 싶으면 : URL파라미터 써도 된다. */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        <Route path="event" element={<Event />}>
          <Route path="one" element={<One />} />
          <Route path="two" element={<Two />} />
        </Route>
        <Route path="*" element={<div>없는페이지요</div>} /> 
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
