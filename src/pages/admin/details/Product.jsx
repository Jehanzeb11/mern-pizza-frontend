import React, { useEffect, useState } from 'react'
import axios from "axios"
import { setHeaders, uri } from '../../../slices/api'
import {useNavigate, useParams} from "react-router-dom"
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {addToCart} from "../../../slices/cartSlice"

const product = () => {
const [product,setProduct] = useState({})
const [loading,setLoading] = useState(false)

const {id} = useParams()
const navigate = useNavigate()

const dispatch = useDispatch()




    useEffect(()=>{
const getData = async ()=>{
    setLoading(true)
try {
    const {data}= await axios.get(`${uri}/products/find/${id}`,setHeaders())
console.log(data)

setProduct(data)
    return data
} catch (error) {
    console.log(error)
}
setLoading(false)

}

getData()
    },[])




const addProduct = (product)=>{
dispatch(addToCart(product))
navigate("/cart")
}



  return (
    <main className='container d-flex justify-content-center align-items-center mt-3 single_product'>
<section>

<img src={product.image?.url} alt="" className='image'/>
</section>

<section className='mx-3 text-center'>

<h1 className='mt-5'>Name :{product.name}</h1>
<p className='fs-4 mt-5'><b className='text-bold fs-5'>Description </b> : {product.description} Commodi et a hic praesentium vel facererepellat quae doloribus possimus sapiente, dolorum amet voluptates magni fuga quia, libero explicabo!</p>

<h4 className='mt-5'><b> Price :{product.price} $</b></h4>

<Button className='w-100 my-5 fs-4' variant='warning' onClick={()=>addProduct(product)}>Add Item </Button>
</section>



    </main>
  )
}

export default product
