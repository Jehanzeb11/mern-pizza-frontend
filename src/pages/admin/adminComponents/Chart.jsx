import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { setHeaders, uri } from '../../../slices/api';


const Chart = () => {

  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)


  function compare(a, b) {
    if (a._id < b._id) {
      return 1
    }
    if (a._id > b._id) {
      return -1
    }
    return 0;
  }


  useEffect(() => {
    async function fetchSales() {
      setLoading(true)
      try {
        const res = await axios.get(`${uri}/week/sales`, setHeaders())
        res?.data?.sort(compare)

        const newData = res.data.map((item, ind) => {
          const days = [
            "SUN",
            "MON",
            "TUE",
            "WED",
            "FRI",
            "SAT"
          ]

return{
  day : days[item._id - 1],
  amount: item.total
}
        })

        setSales(newData)

        setLoading(false)

      } catch (error) {
        console.log(error)
      }
    }

    fetchSales()
  }, [])

 if (loading) {
  return <h3 className='text-center '>loading...</h3>
 }
  return (
    <>
      <div className='mt-5 rounded border border-dark' style={{ height: "300px", maxWidth: "100%", minWidth: "50%" }}>
        <h3 className='text-center my-3'>Last 7 Days Earning ($)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={sales}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Chart
