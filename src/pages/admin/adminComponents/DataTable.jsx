import  React,{useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {AiFillEye,AiFillDelete} from "react-icons/ai"
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProduct } from '../../../slices/productSlice';
import EditProduct from "../EditProduct"



export default function DataTable() {
  const navigate = useNavigate()
const dispatch = useDispatch()

const {items,loading} = useSelector(state=>state.products)

const rows = items?.map((item)=>{
  return{
    id:item?._id,
imageUrl:item?.image?.url,
pName:item?.name,
description:item?.description,
price:item?.price
}
})

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'ImageUrl', headerName: 'Image', width: 100,
  renderCell:(e)=>{
    return(
      <img src={e.row?.imageUrl} alt="" height={"40px"}/>
    )
  }
  },


    { field: 'pName', headerName: 'Product Name', width: 130 },
    {
      field: 'description',
      headerName: 'Description',
      width: 120,
    },

    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 100,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
   renderCell:(params)=>{
return(
  <>
    <Button variant='danger' className='mx-2' onClick={()=>handleDeleteProduct(params.row?.id)}><AiFillDelete /></Button>
    <EditProduct prodId={params.row.id}/>
    <Button className='mx-1' onClick={()=>navigate(`/product/${params.row.id}`)}><AiFillEye /></Button>
  </>
)
   },
    },
  ];
  
  
  const handleDeleteProduct = (id)=>{
    dispatch(deleteProduct(id))
    navigate("/")
   location.reload()
      }
  

if (loading) {
  return <div>loading...</div>
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