import React, { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { MdDelete, MdOutlineSubdirectoryArrowLeft} from "react-icons/Md"
import {HiOutlineArrowNarrowLeft} from "react-icons/Hi"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { decrease, getTotal, increase, removeProduct, removerCart } from '../slices/cartSlice'
import PayButton from '../components/payButton'
const Cart = () => {

const {cartItems,cartTotalAmount} = useSelector(state=>state.cart)
const auth = useSelector(state=>state.auth)

const dispatch = useDispatch()


useEffect(()=>{
  dispatch(getTotal())
},[cartItems])


const clearCart = ()=>{
dispatch(removerCart())
}


const remove = (item)=>{
dispatch(removeProduct(item))
}



const minus = (item)=>{
dispatch(decrease(item))
}





const plus = (item)=>{
  dispatch(increase(item))
  }




  return (
    <Container>
      <h1 className='text-center mb-5 mt-3'>Food Cart</h1>



{ cartItems.length === 0 ? (
  <div className='text-center'>
  <h1 className='text-secondary'>Your Cart Is Empty</h1>
 <Link to={"/"}><h2 className='rounded border border-1 p-3 btn fs-5 btn-outline mt-3'><MdOutlineSubdirectoryArrowLeft size={30} className="mr-3"/> Start Shopping</h2></Link>

  </div>
):(
  <>

  <div className='d-flex justify-content-between text-center container align-items-center'>

 
    <h3>Product</h3>
    <h3>Price</h3>
    <h3>Quantity</h3>
    <h3>Total</h3>
</div>
<hr />
{
cartItems?.map((item)=>{
  return (
<div key={item.id}>

<section>
<div className='d-flex align-items-center justify-content-between '>
  


  {/* name pic Remove */}

  <div>


  <img src={item.image.url} alt="pizza" width={"100px"} className="rounded"/>
  
  

  <div className=''>
    <span className='text-danger text-center pt-1 btn' onClick={()=>remove(item)}>Remove <MdDelete size={20}/></span>
    <h5>{item.name}</h5>
  </div>


  </div>



{/* price */}

<div>
  <p>$ {item.price}</p>
</div>




{/* Quantity */}



<div>

<Button variant='light' onClick={()=>minus(item)}>-</Button>
<span className='px-1'> {item.cartQuantity} </span>
<Button variant='light' onClick={()=>plus(item)}>+</Button>

</div>





{/* Total */}



<p>{item.price * item.cartQuantity}</p>



</div>
  
</section>

<hr />
  




  </div>
  )
})


}

<div className='d-flex justify-content-between text-center align-items-center'>

<div>
<p className='fs-5 btn btn-outline-secondary w-100' onClick={clearCart}>Clear Cart</p>
</div>

<div>

<h4>Sub Total : {cartTotalAmount} $</h4>
<p className='text-secondary w-0'>Taxes and Shipping Calculated at checkout</p>
{auth._id ? <PayButton cartItems = {cartItems}/> :
<Link to={"/login"}><p className='fs-5 btn btn-warning w-100'>Login To Checkout</p></Link>}
<Link to={"/"} style={{textDecoration:"none"}}> <p className='text-secondary'><HiOutlineArrowNarrowLeft size={25}/> Continue Shopping</p></Link>

</div>

</div>

</>  
)
     
}




    </Container>
  )
}

export default Cart
