import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
       <div className='content-wrapper' style={{minHeight: "0px"}}>
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
