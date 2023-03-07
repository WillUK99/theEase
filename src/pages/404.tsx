import React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'

const Page404: NextPage = (props) => {
  return (
    <div className='h-screen w-screen flex items-center justify-center flex-col'>
      <h1 className='text-5xl'>404</h1>
      <Link className='m-5 p-5 bg-red-400' href='/'>Go home</Link>
    </div>
  )
}

export default Page404