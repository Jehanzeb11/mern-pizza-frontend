import React,{useState} from 'react';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createProducts, editProducts } from '../../slices/productSlice'
import { useNavigate } from 'react-router-dom'

export default function FormDialog({prodId}) {
  const [open, setOpen] = React.useState(false);
  const [currentProd,setCurrentProd] = useState({})
  const [previewImg,setPreviewImg] = useState("")


  const [productImage, setProductImage] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  console.log(category, "category")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {items} = useSelector(state=>state.products)

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
        setPreviewImg(reader.result)
      }

    } else {
      setProductImage("")
    }

  }



  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editProducts({
      productImage,
      product:{

        ...currentProd,
        name,
        description,
        category,
        price
      }
    }))
    // navigate("/")
    
  }



  const handleClickOpen = () => {
    setOpen(true);
    let selectedProduct = items.filter((item)=>item._id === prodId)
selectedProduct = selectedProduct[0]
setCurrentProd(selectedProduct)
setPreviewImg(selectedProduct.image.url)

setProductImage("")

setName(selectedProduct.name)
setCategory(selectedProduct.category)
setDescription(selectedProduct.description)
setPrice(selectedProduct.price)

};

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='info' className='text-white' onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
        <div className='d-flex justify-content-between align-items-center'>


<Form className='my-3' onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicProductName">
    <Form.Control type="text" onChange={(e) => { setName(e.target.value) }} value={name} placeholder="Product Name" required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicProductDescription">
    <Form.Control type="text" onChange={(e) => { setDescription(e.target.value) }} value={description} placeholder="Product Short Description" required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicProductPrice">
    <Form.Control type="number" onChange={(e) => { setPrice(e.target.value) }} value={price} placeholder="Price" required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicProductImage">
    <Form.Control type="file" placeholder="Image" onChange={handleProductImage} accept='image/'/>
  </Form.Group>


  <Form.Label>Category : </Form.Label> <Form.Select aria-label="Default select example" value={category} onChange={(e) => { setCategory(e.target.value) }} required>
    <option value="">Select Category</option>
    <option value="veg">Veg</option>
    <option value="non-veg">Non-Veg</option>
  </Form.Select>


  <Button variant='success' type='submit' className='my-4 w-100'>Edit Product</Button>

</Form>




<section className='border p-3' style={{ width: "fit-content" }}>

  {previewImg ? <img src={previewImg} alt="product image" className='image_preview' /> : <p>No Image Selected To Show Preview</p>}
</section>


</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}