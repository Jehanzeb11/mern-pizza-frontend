import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardCmp from '../components/CardCmp'
import { useGetAllProductsQuery } from '../slices/fetchQuery'
import { getProducts } from '../slices/productSlice'

const Home = () => {
// const {data,error,isLoading} = useGetAllProductsQuery()

// if (isLoading) {
//   return <div className='text-center fs-4'>loading...</div>
// }

const {items : data,loading} = useSelector(state=>state.products)

const dispatch = useDispatch()





useEffect(()=>{
  dispatch(getProducts())
},[])




if (loading) {
  return <div className='text-center fs-4'>Loading...</div>
}

  return (
  <>
    <div className='container text-center'>
      <h1 className='my-3'>Products</h1>
      <CardCmp data={data}/>
    </div>
  </>
  )
}

export default Home
