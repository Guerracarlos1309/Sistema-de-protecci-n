import React from 'react'
import { Outlet } from 'react-router-dom'

const CleanLayout = () => {
  return (
    <div>
      {/* Aquí puedes poner tu propio header si quieres */}
      <Outlet />
    </div>
  )
}

export default CleanLayout
