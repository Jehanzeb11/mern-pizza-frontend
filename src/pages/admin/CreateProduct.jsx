import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createProducts } from '../../slices/productSlice'
import { useNavigate } from 'react-router-dom'

const createProduct = () => {
  const [productImage, setProductImage] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  console.log(category, "category")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleProductImage = (e) => {
    const file = e.target.files[0]

    transformFile(file)
  }

  const transformFile = (file) => {
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        setProductImage(reader.result)
      }

    } else {
      setProductImage("")
    }

  }



  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createProducts({ name, category, description, price, image: productImage }))
    navigate("/")
    
  }



  return (
    <>
      <hr />

      <h3>create product</h3>
      <div className='d-flex justify-content-between align-items-center'>


        <Form className='my-3' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicProductName">
            <Form.Control type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Product Name" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicProductDescription">
            <Form.Control type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="Product Short Description" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicProductPrice">
            <Form.Control type="number" onChange={(e) => { setPrice(e.target.value) }} placeholder="Price" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicProductImage">
            <Form.Control type="file" placeholder="Image" onChange={handleProductImage} accept='image/' required />
          </Form.Group>


          <Form.Label>Category : </Form.Label> <Form.Select aria-label="Default select example" onChange={(e) => { setCategory(e.target.value) }} required>
            <option value="">Select Category</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </Form.Select>


          <Button variant='success' type='submit' className='my-3 w-100'>Create Product</Button>

        </Form>




        <section className='border p-3' style={{ width: "fit-content" }}>

          {productImage ? <img src={productImage} alt="product image" className='image_preview' /> : <p>No Image Selected To Show Preview</p>}
        </section>


      </div>
    </>

  )
}

export default createProduct
