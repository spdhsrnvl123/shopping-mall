import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import data from './db/data'
import { useState } from 'react';
import Card from './components/Card';
import { Routes, Route, Link, useNavigate} from 'react-router-dom'
import Detail from './pages/Detail';
import About from './pages/About';
import One from './pages/One';
import Two from './pages/Two';
import Event from './pages/Event';

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();

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
      <Routes>
        <Route path="/" element={
          <>
                <div className="main-bg"></div>
                <div className="container">
                  <div className="row">
                    {
                      shoes.map((v,i)=>(
                        <Card key={v.id} shoes={v} i={i}  />
                        ))
                    }
                  </div>
                </div>
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
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
      </Routes>
    </div>
  );
}


export default App;
