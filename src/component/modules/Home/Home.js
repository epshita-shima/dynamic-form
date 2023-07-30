import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {

  return (
    <div className='d-flex justify-content-center'>
       <div className='content-wrapper position-absolute top-0 px-2 py-2' style={{width:'93%',minHeight: '100vh', overflow: 'scroll'}}>
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
