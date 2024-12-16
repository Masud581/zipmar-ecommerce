import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

function AdminPermision({children}) {
  const user = useSelector((state) => state.user)
  return (
   <>
   {
    isAdmin(user.role) ? children : <p className='text-red-600 bg-red-100'>Do not have permision</p>
   }
   
   </>
  )
}

export default AdminPermision