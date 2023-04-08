import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import {addToCart} from "../slices/cartSlice"
import {useNavigate} from "react-router-dom"

function CardCmp({data}) {

const dispatch = useDispatch()

const navigate = useNavigate()


const addItem = (product)=>{

dispatch(addToCart(product))

}

  return (
    <>
      <div className='d-flex justify-content-around container-fluid flex-wrap'>
{data && data.map((product)=>{
return(
  <Card style={{ width: '18rem',margin:"1rem" }} key={product._id}>
      <Card.Img variant="top" src={product.image.url}  onClick={()=>navigate(`/product/${product._id}`)}/>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
        $ {product.price}
        </Card.Text>
        <Button variant="warning" className='w-100' onClick={()=>addItem(product)}>Add Item</Button>
      </Card.Body>
    </Card>
)
})}
    
    </div>
    </>
  );
}

export default CardCmp;
