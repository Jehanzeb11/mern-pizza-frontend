import  React,{useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {AiFillEye} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../../slices/productSlice';
import EditProduct from "../EditProduct"
import { editOrders, getOrders } from '../../../slices/orderSlice';
import moment from 'moment';



export default function OrdersList() {
  const navigate = useNavigate()
const dispatch = useDispatch()

const {ordersList} = useSelector(state=>state.order)


useEffect(()=>{
dispatch(getOrders())
},[])

const rows = ordersList?.map((item)=>{
  return{
    id:item?._id,
customerName:item?.shipping.name,
amount:item?.total / 100,
delivery_status:item?.delivery_status,
date:moment(item?.createdAt).fromNow()
}
})

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'delivery_status', headerName: 'delivery Status', width: 100,
  renderCell:(params)=>{
    return(
      <>{params.row.delivery_status === "pending" ? <p className='btn text-warning'>Pending</p>
      :params.row.delivery_status === "dispatched" ? <p className='btn text-info'>Dispatched</p>
      :params.row.delivery_status === "delivered" ? <p className='btn text-success'>Delivered</p>
      :"Error"}</>
    )
  }
  },


    { field: 'customerName', headerName: 'Customer Name', width: 150 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
    },

     {
      field: 'date',
      headerName: 'Date',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 300,
   renderCell:(params)=>{
return(
<>
<Button variant='info' className='mx-1' onClick={()=>handleDispatched(params.row?.id)}>Dispatched</Button>
<Button variant='success' className='mx-1' onClick={()=>handleDelivered(params.row?.id)}>Delivered</Button>
<Button onClick={()=>navigate(`/order/${params.row.id}`)}><AiFillEye /></Button>
</>
)
   },
    },
  ];


const handleDispatched = (id)=>{
dispatch(editOrders({id,delivery_status:"dispatched"}))

}
  
  
const handleDelivered=(id)=>{
  dispatch(editOrders({id,delivery_status:"delivered"}))
}

  
  return (
    <div style={{ height: 400, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
