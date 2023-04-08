import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Products = () => {

 const navigate = useNavigate()

  return (
    <>
 <div className='d-flex justify-content-end'>
 <Button variant='success' onClick={()=> navigate("/admin/products/create-product")}>Create Product</Button>
 </div>
 <Outlet/>
    </>
  )
}

export default Products
