import React from 'react'

import Sidebar from './sidebar'

type Props = {
  children: React.ReactNode
}

const DashboardLayout = (props: Props) => {
  const { children } = props

  return (
    <div className='h-screen w-screen flex '>
      <Sidebar />
      <div className='h-screen w-full flex flex-col text-white'>
        <nav className='bg-gray-900 py-4 px-5'>
          <ul className='flex flex-row gap-5 items-center justify-center'>
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
          </ul>
        </nav>
        <div className='p-2'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout