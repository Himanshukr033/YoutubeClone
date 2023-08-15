import React from 'react'
import { Navbar } from '../components'
import { Outlet } from 'react-router-dom'

const Roots = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default Roots