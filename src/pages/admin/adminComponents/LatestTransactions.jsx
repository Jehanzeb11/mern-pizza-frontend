import React, { useEffect, useState } from 'react'
import { setHeaders, uri } from '../../../slices/api'
import axios from 'axios'
import moment from 'moment'

const LatestTransactions = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getOrders() {
            setLoading(true)
            try {
                const res = await axios.get(`${uri}/new/orders/?new=true`, setHeaders())
console.log(res.data)
setOrders(res.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        getOrders()
    },[])


    return (
        <div style={{backgroundColor:"lightgrey"}} className='p-3 rounded w-100'>
            <h2>Latest Transactions</h2>
            {orders?.map((item,index)=>{
                return(
<section key={item._id} style={{backgroundColor:"#b6c5cf"}}>
<div className='d-flex justify-content-between flex-row text-center my-2 p-1 fs-5'>
    <span>{item.shipping.name} </span>
    <span> ${item.total / 100} </span>
    <span> {moment(item.createdAt).fromNow()}</span>
</div>

</section>

                )
            })}
        </div>
    )
}

export default LatestTransactions
