import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../slices/authSlice';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth._id) {
    return navigate("/");
    }
  }, [auth._id, navigate]);


    const [user, setUser] = useState({
    email: "",
    password: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(user));
  };


 


  return (
    <Container>
      <h1 className='text-center my-3'>Login</h1>
    <Form onSubmit={handleSubmit}>

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
    Login
    </Button>
    </Form>

    <div className='text-center my-2'>
<Link to={"/register"}><Button variant='link' >New Here ? Create Account</Button></Link>
</div>

    
    </Container>
    )
}

export default Login

