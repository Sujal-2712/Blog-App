import React from 'react'
import Header from '../components/Header'
import Blogs from '../components/Blogs'
import Pagination from '../components/Pagination'

const Home = () => {
  return (
    <div className='flex flex-col'>
      <div>
        <Header />
      </div>
      <div className='mt-14'>
        
        <Blogs />
        <Pagination />
      </div>
    </div>
  )
}

export default Home
