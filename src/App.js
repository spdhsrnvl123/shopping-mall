import './App.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import data from './db/data'
import { useState } from 'react';
import Card from './components/Card';
import { Routes, Route,  useNavigate, Link} from 'react-router-dom'
import Detail from './pages/Detail';
import About from './pages/About';
import One from './pages/One';
import Two from './pages/Two';
import Event from './pages/Event';
import axios from 'axios';
import Cart from './pages/Cart';

function App() {
  let [shoes,setShoes] = useState(data);
  let navigate = useNavigate();
  let [count,setCount] = useState(0);

  console.log(shoes);
  console.log(count);

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
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">shoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate(-1)}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <Link to = "/detail/0">이동하기</Link> */}
      <Routes>
        <Route path="/" element={
          <>
                <div className="main-bg"></div>
                <div className="container">
                <Button onClick={()=>{ onSort() }} style={{marginTop:"20px"}} variant="dark">sort</Button>
                  <div className="row">
                    {
                      shoes.map((v,i)=>(
                        <Card key={v.id} shoes={v} i={i} />
                      ))
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
            <Detail shoes={shoes} />
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

        <Route path="/cart" element={<Cart 
        />} />

      </Routes>
    </div>
  );
}

export default App;
