import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { GiShoppingBag } from 'react-icons/Gi';
import { CiPizza } from 'react-icons/Ci';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {logout} from "../slices/authSlice"
import { toast } from 'react-toastify';

const NavbarCmp = () => {
const {cartItems} = useSelector(state=>state.cart)
const auth = useSelector(state=>state.auth)

const dispatch = useDispatch()

return (
    <Navbar bg="dark" expand="md" variant='dark'>
      <Container>
       <Link to={"/"} style={{textDecoration:"none"}}><Navbar.Brand>Pizza Zoom<CiPizza size={30} color="orange"/></Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           <Nav.Link><Link to={"/"} style={{textDecoration:"none",color:"lightgray"}}>Home</Link> </Nav.Link>
            <Nav.Link><Link to={"/cart"} style={{textDecoration:"none",color:"lightgray"}}>Cart</Link></Nav.Link>
           {auth._id && auth.isAdmin? <Nav.Link><Link to={"/admin/dashboard"} style={{textDecoration:"none",color:"whitesmoke"}}>Admin</Link></Nav.Link>:null}
          </Nav>
      <Nav>

        <Nav.Link className='mx-5'> <Link to={"/cart"} style={{textDecoration:"none",color:"whitesmoke"}}>   <b> <GiShoppingBag size={30}/><sup style={{fontSize:"1.2rem",color:"black",padding:" 0 6px",borderRadius:"50%"}} className="bg-warning">{cartItems.length}</sup> </b> </Link></Nav.Link>
 { !auth._id ? <><Link to={"/login"}><Button variant="light" className='mx-3'>Login</Button></Link>   <Link to={"/register"}><Button variant="secondary">Register</Button></Link></> 
 : <Button variant="light" className='mx-5' onClick={()=>{
  dispatch(logout())
  toast.warn("Sucessfully Logout")
 }}>Logout</Button>}

        </Nav>
        </Navbar.Collapse>
      </Container>
    
    
    </Navbar>
  )
}

export default NavbarCmp
