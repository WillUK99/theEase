import Link from 'next/link'
import React from 'react'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div
      className='bg-gray-900 h-screen w-64 flex flex-col items-center justify-between text-white py-10'
    >
      <h1>The ease project</h1>
      <nav>
        <ul className='flex flex-col items-center justify-center gap-5'>
          <Link href='/dashboard'>Overview</Link>
          <Link href='/dashboard/growth'>Growth</Link>
          <Link href='/dashboard/customers'>Customers</Link>
          <Link href='/dashboard/professionals'>Professionals</Link>
          <Link href='/dashboard/bookings'>Bookings</Link>
          <Link href='/dashboard/reports'>Reports</Link>
        </ul>
      </nav>

      <nav>
        <ul>
          <Link href='/dashboard/support'>Support</Link>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar