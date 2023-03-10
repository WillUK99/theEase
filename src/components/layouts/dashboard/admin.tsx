import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import Sidebar from './sidebar'

type Props = {
  children: React.ReactNode
}

const AdminLayout = (props: Props) => {
  const { data: sessionData } = useSession()

  const { children } = props

  return (
    <div className='flex w-screen h-screen '>
      <Sidebar />
      <div className='flex flex-col w-full h-screen'>
        <div className='flex items-center justify-between px-5 py-4 pl-0 bg-gray-900'>
          <input type="text" placeholder='Search for Customer, Pro or Booking ID' />
          <nav className='flex items-center justify-center text-white gap-7'>
            <ul className='flex flex-row items-center justify-center gap-5'>
              <li>
                <button onClick={() => signOut()}>
                  <Image
                    src='/svgs/logout.svg'
                    width={15}
                    height={15}
                    alt='Logout'
                  />
                </button>
              </li>
              <li>
                {/* This will be a dropdown of some sort */}
                <Image
                  src='/svgs/notifications.svg'
                  width={15}
                  height={15}
                  alt='Notifications'
                  onClick={() => alert('Notifications')}
                />
              </li>
              <li>
                <Link href='/dashboard/settings'>
                  <Image
                    src='/svgs/settings.svg'
                    width={15}
                    height={15}
                    alt='Account settings'
                  />
                </Link>
              </li>

            </ul>
            <div>
              <Image
                src={sessionData?.user.image || '/images/spaceInvader.png'}
                width={30}
                height={30}
                alt='User avatar'
                className='rounded-full'
              />
            </div>
          </nav>
        </div>
        <div className='h-full p-4 bg-slate-100'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout