import React, { useEffect, useState } from 'react'
import {setHeaders, uri} from "../../../slices/api"
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Order = () => {
  const {id} = useParams()

  const [order,setOrder] = useState({})
  const [loading,setLoading] = useState(false)


console.log(order)


const fetchOneOrder = async ()=>{
try {
  setLoading(true)
  const res = await axios.get(`${uri}/singleOrder/${id}`,setHeaders())
  setOrder(res.data)
  setLoading(false)
} catch (error) {
  console.log(error.response.data.message)
}
}


useEffect(()=>{
fetchOneOrder()

  },[id])

if (loading) {
  return <div>loading...</div>
}

  return (
    <div className='d-flex justify-content-center align-items-center'>
    <main className=' mt-5 w-25 order_details rounded p-4'>

<article>
<h1 className='mt-2'>Order Details</h1>

<h5 className='mt-2'> Delivery_Status : {order.delivery_status === "delivered" ? <b className='text-success'>Deliverd</b>
: order.delivery_status === "dispatched" ? <b className='text-info'>Dispatched</b> 
: order.delivery_status === "pending" ? <b className='text-warning'>Pending</b>
:"error"
}</h5>

<section className='my-5'>
<h1>Shipping Details</h1>

<h4>Name : {order.shipping?.name}</h4>
<h4>Email : {order.shipping?.email}</h4>
<h4>Phone : {order.shipping?.phone}</h4>
</section>





<section>

<h2>Ordered Products</h2>

{order.products?.map((item)=>{
return <li key={item.id}>
 <span className='mx-2 fs-5'>Name: {item.description}</span>  <span className='mx-2 fs-5'>Quantity: {item.quantity}</span> <span className='mx-2 fs-5'>Unit Amount: {item.price.unit_amount}</span>
</li>
})}



<div className='d-flex justify-content-end mt-4'><h4>Total Price  : ${order.total}</h4></div>

</section>


</article>
    
    </main>
</div>
  )
}

export default Order
