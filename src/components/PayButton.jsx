import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { uri } from "../slices/api"

const PayButton = ({cartItems}) => {
  const auth = useSelector((state) => state.auth);
console.log(cartItems)
    const handleCheckout=()=>{
 axios.post(`${uri}/stripe/create-checkout-session`,{
    cartItems,
    userId :auth._id
 }).then((res)=>{if (res.data.url) {
    window.location.href = res.data.url
 }}).catch((err)=>{
    console.log(err)
 })
    }
  return (
    <>
      <Button onClick={()=>handleCheckout()} className='fs-5 w-100'>Checkout</Button>
    </>
  )
}

export default PayButton
