import React from 'react'
import Works from './Works'
import AddWork from './AddWork'

const Home = () => {

  return (
    <div className='container' style={{display:'flex'}}>
      <AddWork/>
      <Works/>
    </div>
  )
}

export default Home