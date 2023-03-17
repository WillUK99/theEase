import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div
      className='flex flex-col items-center justify-between w-64 h-screen py-10 text-white bg-gray-900'
    >
      <h1>The ease project</h1>
      <nav>
        <ul className='flex flex-col items-center justify-center gap-5'>
          <Link href='/admin'>Overview</Link>
          <Link href='/admin/customers'>Customers</Link>
          <Link href='/admin/professionals'>Professionals</Link>
          <Link href='/admin/bookings'>Bookings</Link>
          <Link href='/admin/services'>Services</Link>
          <Link href='/admin/reports'>Reports</Link>
        </ul>
      </nav>

      <nav>
        <ul>
          <Link href='/admin/support'>Support</Link>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar