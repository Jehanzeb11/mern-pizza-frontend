import  React,{useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {AiFillEye,AiFillDelete} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { getUsers,deleteUser } from '../../../slices/userSlice';



 function UsersList() {
  const navigate = useNavigate()
const dispatch = useDispatch()

const {userList,loading} = useSelector(state=>state.users)


useEffect(()=>{
dispatch(getUsers())
},[])





const rows = userList?.map((item)=>{
  return{
    id:item?._id,
uName:item?.name,
email:item?.email,
admin:item?.isAdmin
}
})

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'uName', headerName: 'User Name', width: 120},


    { field: 'email', headerName: 'User Email', width: 200 },



    {
      field: 'admin',
      headerName: 'Role',
      width: 100,
   renderCell:(params)=>{
return(
  <div>

{params.row.admin ? ( 
<b className='text-success mx-2'>Admin</b> 
):( 
<p className='text-info mx-2'>Customer</p>
)}
  </div>
)
   },
    },



    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
   renderCell:(params)=>{
return(
  <>
<Button variant={"danger"} className="mx-2" onClick={()=>handleDelete(params.row.id)}><AiFillDelete /></Button>
<Button onClick={()=>navigate(`/user/${params.row.id}`)}><AiFillEye /></Button>
  </>
)
   },
    },
  ];


 const handleDelete=(id)=>{
dispatch(deleteUser(id))
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


export default UsersList