import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {

  return (
    <div className='d-flex justify-content-center'>
       <div className='content-wrapper position-absolute top-0 w-75 '>
            <div  className= 'content-header'>
                <div className= 'container-fluid'>
               
<Outlet></Outlet>
          
                </div>

            </div>
        </div>
    </div>
  )
}

export default Home
