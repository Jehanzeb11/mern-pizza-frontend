import React from 'react'

const Widget = ({data}) => {
  return (
    <section className='d-flex justify-content-center align-items-center'>
<div style={{color:data.bgColor,backgroundColor:data.color}} className='fs-4 p-1 rounded'>
    {data.icon}
</div>

<div className='px-1'>

    <span>{data.title}</span>
    <br />
    <span>{data.isMoney ? "$ " + data.digits?.toLocaleString():data.digits?.toLocaleString()}</span>
</div>
    <span className='px-1 mt-2'>{data.percentage < 0 ? <p className='text-danger'>{data.percentage}%</p>  : <p className='text-success'>+{data.percentage}%</p>}</span>
      
    </section>
  )
}

export default Widget