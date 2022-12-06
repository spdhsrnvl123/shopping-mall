import { BrowserRouter, Link, Route, Routes,useNavigate } from "react-router-dom"
import { useState } from 'react';
import data from "../data"
import bg from '../images/bg.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "../component/card"
import Detail from "../pages/detail.jsx";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import About from "../pages/about";

const Router = ()=>{
    let [shoes] = useState(data)
    let navigate = useNavigate();
    return(
        // <BrowserRouter>
            <Routes>
            <Route path="/" element={
            <div>
                <Navbar bg="dark" variant="dark">
                  <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                      <Link to="/" >Home</Link>
                      <button>About</button>
                      <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                  </Container>
                </Navbar>
                <div className='main-bg' style={{backgroundImage : 'url('+ bg +')'}}></div>
                <div className="container">
                    <div className="row">
                    {
                        shoes.map((v,i)=>{
                        return <Card key={i} i={i} title={v.title} content={v.content} />
                        })
                    }
                    </div>
                </div>
            </div>
            } 
            />
            <Route path="/detail" element={ <Detail /> } />
            <Route path="/about" element={ <About/> }>
                <Route path="member" element={ <div>멤버들</div> } />
                <Route path="location" element={ <div>회사위치</div> } />
            </Route>
            <Route path="*" element={<div>404 페이지임</div>} />
        </Routes>
    //   </BrowserRouter>
    )
}

export default Router;