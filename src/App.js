import React, { useEffect, useState } from 'react'
import "./App.css"
import Pagination from './Pagination.js';
import axios from "axios"
import Posts from './Posts.js';

const App = () => {
  const [data, setData] = useState([]);
  const [loading , setLoading] = useState(false);
  const [currentPage , setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);  

  const [value, setValue] = useState([])

  const paginate = pageNumber => setCurrentPage(pageNumber)

  useEffect(() => { 
      fetchData();
  } , [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get('https://file.notion.so/f/f/ca71608c-1cc3-4167-857a-24da97c78717/b041832a-ec40-47bb-b112-db9eeb72f678/sample-data.json?id=ce885cf5-d90e-46f3-ab62-c3609475cfb6&table=block&spaceId=ca71608c-1cc3-4167-857a-24da97c78717&expirationTimestamp=1710784800000&signature=u9_R8BFdPueQTTsYQNfFwrWPnoB5tTy_SgujdYxz87g&downloadName=sample-data.json');
    setData(res.data);
    setLoading(false);
  }

  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = data.slice(indexOfFirstPost , indexOfLastPost);

  const handleReset =() =>{
    fetchData();
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    return await axios.get(`https://file.notion.so/f/f/ca71608c-1cc3-4167-857a-24da97c78717/b041832a-ec40-47bb-b112-db9eeb72f678/sample-data.json?id=ce885cf5-d90e-46f3-ab62-c3609475cfb6&table=block&spaceId=ca71608c-1cc3-4167-857a-24da97c78717&expirationTimestamp=1710784800000&signature=u9_R8BFdPueQTTsYQNfFwrWPnoB5tTy_SgujdYxz87g&downloadName=sample-data.json`)
    .then((response) => {
      setData(response.data);
      setValue("")
      console.log(response.data);
    })
    .catch((err)=>console.log(err))
  }

  return (
    <>
      <div className='container'>
        <form className='searchbar d-flex input-group w-auto p-5 float-right ' onSubmit={handleSearch} >
          <input type='text' 
          className='search' 
          placeholder='Search' 
          value={value} 
          onChange={(e) => setValue(e.target.value)}></input>
          <button type='submit' className='btn btn-primary mx-2'>Search</button>
          <button type='submit' className='btn btn-success mx-2' onClick={() =>{handleReset()}}>Reset</button>
        </form>
        <Posts data={currentPosts} loading={loading}/>
        <Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={paginate}/>
      </div>
    </>
  );
}

export default App
