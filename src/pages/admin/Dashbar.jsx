import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import NotFound from '../NotFound'
import {RxDashboard} from "react-icons/rx"
import {RiShoppingBag2Fill} from "react-icons/ri"
import {FaClipboardList,FaUserAlt} from "react-icons/fa"

const Dashbar = () => {
  const {isAdmin} = useSelector(state=>state.auth)

  if (!isAdmin) {
    return <NotFound />
  }
  return (
    <>

      <Container>
        <Nav className='d-flex justify-content-evenly fs-5'>
          <Nav.Link><NavLink className={({isActive})=>{
return isActive ? "link-active" : "link-inactive"
          }}
           to={"/admin/dashboard"}><RxDashboard size={20} /> Dashboard</NavLink></Nav.Link>
         <Nav.Link><NavLink className={({isActive})=>{
return isActive ? "link-active" : "link-inactive"
          }} to={"/admin/products"}><RiShoppingBag2Fill /> Products </NavLink></Nav.Link>
          <Nav.Link><NavLink className={({isActive})=>{
return isActive ? "link-active" : "link-inactive"
          }} to={"/admin/orders"}><FaClipboardList /> Orders</NavLink></Nav.Link>
           <Nav.Link><NavLink className={({isActive})=>{
return isActive ? "link-active" : "link-inactive"
          }} to={"/admin/users"}><FaUserAlt /> Users</NavLink></Nav.Link>
        </Nav>
        <hr />
      </Container>
<Container>
        <Outlet />
</Container>
    </>
  )
}

export default Dashbar
