import React from 'react'

const Posts = ({data , loading}) => {

    if(loading){
        return <h1>Loading...</h1>
    }


  return (
    <div className='table'>
      <table className=''>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Price</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (

            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.subcategory}</td>
              <td>{(item.createdAt).substring(0,10)}</td>
              <td>{(item.updatedAt).substring(0,10)}</td>
              <td>{item.price}</td>
              <td>{item.sale_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Posts
