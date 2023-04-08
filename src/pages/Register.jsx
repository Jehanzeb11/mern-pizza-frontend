import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../slices/authSlice';

const Register = () => {
  const auth = useSelector(state=>state.auth)

const [user,setUser] = useState({
  name:"",
  email:"",
  password:"",
})

const navigate = useNavigate()


useEffect(()=>{
  if (auth._id) {
  return navigate("/")
  }
},[auth._id,navigate])

const dispatch = useDispatch()

const handleSubmit = (e)=>{
e.preventDefault()
dispatch(registerUser(user))

}


  return (
    <Container>
      <h1 className='text-center my-3'>Register</h1>
    <Form onSubmit={handleSubmit}>

    <Form.Group className="mb-3" controlId="formBasicText">
    <Form.Label>User Name</Form.Label>
    <Form.Control type="text" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} placeholder="Enter User Name"required />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} required />
    <Form.Text className="text-muted">
    We'll never share your email with anyone else.
    </Form.Text>
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} required/>
    </Form.Group>
   

    <Button variant="warning" type="submit" className='w-100 fs-4'>
    Register
    </Button>
    </Form>

     <div className='text-center my-2'>
<Link to={"/login"}><Button variant='link' >Already have an account ? Login</Button></Link>
</div>
    </Container>
    )
}

export default Register
