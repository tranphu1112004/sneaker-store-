import React from 'react'
import HeaderUser from './HeaderUser'
import { Outlet } from 'react-router-dom'
import FooterUser from './FooterUser'

const layoutUser = () => {
  return (
        <div>
            <HeaderUser />
            <Outlet />
            <FooterUser />
        </div>
  )
}

export default layoutUser