import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Dashboard() {
  const user = useSelector(state => state.user)
  return (
    <section className='bg-white'>
      <div className='mx-auto container p-3 lg:grid grid-cols-[200px,1fr]'>
        
          {/* left for menu */}
          <div className='py-4 sticky top-24 max-h-[cal(100vh-100px)] overflow-auto hidden lg:block border'>
            <UserMenu/>

          </div>
        

        {/* right for content */}
        <div className='bg-white p-4  min-h-[75vh]'>
          <Outlet/>

        </div>
       
        </div>
    </section>
    
  )
}

export default Dashboard