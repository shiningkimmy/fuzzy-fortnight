import React from 'react'
import Navbar  from '../components/navbar'
import Sidebar from '../components/sidebar'

const Dashboard = () => {
  return (
    <>
    
    <Navbar/>
    <Sidebar/>
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100">
    <h1>Dashboard</h1>
    

    </div>

    </>

  )
}

export default Dashboard