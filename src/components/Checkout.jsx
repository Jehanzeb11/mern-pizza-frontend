import React from 'react'
import { Button, Container } from 'react-bootstrap'
import {HiOutlineArrowNarrowLeft} from "react-icons/Hi"
import { Link } from 'react-router-dom'


const Checkout = () => {
  return (
    <div className='text-center my-3'>
      <Container>

<h1 className='my-4'>Order Recieved Successfully </h1>
<h3 className='my-4'>Your Order # {Math.floor(Math.random() + 321564189654651464) * 232131548646486451435}</h3>

<Link to={"/"} style={{textDecoration:"none"}}><Button className='my-2 fs-5' variant='warning'><HiOutlineArrowNarrowLeft size={25}/> Continue Shopping </Button></Link>

      </Container>
    </div>
  )
}

export default Checkout
