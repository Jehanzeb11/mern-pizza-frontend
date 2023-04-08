import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { setHeaders, uri } from '../../../slices/api'
import { useParams } from 'react-router-dom'
import { Form,Container,Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

const UserProfile = () => {
  const [user,setUser] = useState({
    name:"",
    email:"",
    isAdmin:false,
    password:""
  })

const [loading,setLoading] = useState(false)
const [updating,setUpdating] = useState(false)




const {id} = useParams()

console.log(user)


useEffect(()=>{
const fetchUser = async ()=>{
  try {
    const {data} = await axios.get(`${uri}/user/${id}`,setHeaders())
setUser({...data,password:""})
  } catch (error) {
    console.log(error)
  }
}

fetchUser()
},[])



const handleSubmit= async (e) =>{
e.preventDefault()

setUpdating(true)
try {

  const {data} = await axios.put(`${uri}/user/${id}`,user,setHeaders())

setUser({...data,password:""})


toast.success("User Updated Successfully")

} catch (error) {
  console.log(error)
}
setUpdating(false)
}



if (loading) {
  return <div className='fs-5 text-center'>Loading...</div>
}

  return (
    <main className="d-flex justify-content-center align-items-center mt-5">
    <Container className='w-25'>
    <h1 className='text-center mt-3'>User Profile</h1>
   {user.isAdmin ? <h6 className='mb-4 text-center text-danger fs-4'>Admin</h6>:<h6 className='my-4'>Customer</h6>}


  <Form onSubmit={handleSubmit}>

  <Form.Group className="mb-3" controlId="formBasicText">
  <Form.Label>User Name</Form.Label>
  <Form.Control type="text" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
  <Form.Text className="text-muted">
  We'll never share your email with anyone else.
  </Form.Text>
  </Form.Group>
  
  <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
  </Form.Group>
 

  <Button variant="warning" type="submit" className='w-100 fs-5'>
  {updating ? "Update":"User Profile"}
  </Button>
  </Form>

  </Container>
    </main>
  )
}

export default UserProfile
