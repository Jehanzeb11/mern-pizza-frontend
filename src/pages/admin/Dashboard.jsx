import React, { useEffect, useState } from 'react'
import {FaChartBar, FaClipboard, FaUserAlt} from "react-icons/fa"
import Widget from './adminComponents/Widget'
import axios from 'axios'
import {setHeaders, uri} from "../../slices/api"
import Chart from './adminComponents/Chart'
import LatestTransactions from './adminComponents/LatestTransactions'

const Dashboard = () => {
const [user,setUser] = useState([])
const [userPer,setUserPer] = useState(0)
const [usersOrders,setUsersOrders] = useState([])
const [ordersPer,setOrdersPer] = useState(0)
const [income,setIncome] = useState([])
const [incomePer,setIncomePer] = useState(0)

function compare(a,b){
if (a._id < b._id) {
  return 1
}
if (a._id > b._id) {
  return -1
}
return 0;
}


useEffect(()=>{
  async function fetchData(){
  try {
  const res = await axios.get(`${uri}/stats`,setHeaders())
  res?.data?.sort(compare)
  setUser(res.data)
  setUserPer(((res.data[0]?.total - res.data[1]?.total) / res.data[0]?.total)* 100 )
  } catch (error) {
    console.log(error)
  }
  }
  
   fetchData()
  },[])




useEffect(()=>{
  async function fetchData(){
  try {
  const res = await axios.get(`${uri}/orders`,setHeaders())
  res.data.sort(compare)
  setUsersOrders(res.data)
  setOrdersPer(((res.data[0]?.total - res.data[1]?.total) / res.data[1]?.total)* 100 )
  } catch (error) {
    console.log(error)
  }
  }
  
   fetchData()
  },[])




  useEffect(()=>{
    async function fetchData(){
    try {
    const res = await axios.get(`${uri}/income`,setHeaders())
    res.data?.sort(compare)
    setIncome(res.data)
    setIncomePer(((res.data[0]?.total - res.data[1]?.total) / res.data[1]?.total)* 100 )
    } catch (error) {
      console.log(error)
    }
    }
    
     fetchData()
    },[])



let data =[
  {
    icon: <FaUserAlt />,
    digits:user[0]?.total && user[0]?.total / 100 ,
    isMoney:false,
    title:"User",
    color:"rgba(0, 175, 240,0.5)",
    bgColor:"rgb(0, 93, 147)",
    percentage:userPer,
  },
  {
    icon: <FaClipboard />,
    digits:usersOrders[0]?.total,
    isMoney:false,
    title:"Order",
    color:"rgba(130, 50, 160,0.5)",
    bgColor:"rgb(125, 71, 217)",
    percentage:ordersPer,
  },
  {
    icon: <FaChartBar />,
    digits:income[0]?.total,
    isMoney:true,
    title:"Earnings",
    color:"rgba(255, 249, 90,0.5)",
    bgColor:"rgb(255, 136, 93)",
    percentage:Math.floor(incomePer),
  },
]




  return (
    <>
     <section className='d-flex justify-content-around'>
      <div>

<div className="rounded p-3 my-3" style={{backgroundColor:"lightgrey"}}>
  <h1 className='fs-2'>Overview</h1>
  <h2 className='fs-4'>How Your Shop Is Performing Compared To Previous Month</h2>

  <div className='d-flex justify-content-between'>
  {
    data?.map((data,ind)=>{
      
      return(
        
        <Widget key={ind} data={data}/>
       
        )
        
      })
    }
  </div>


    </div>
  <Chart />
</div>

<div style={{height:"fit-content"}}>
<LatestTransactions />
</div>



</section>
  </>
  )
}

export default Dashboard