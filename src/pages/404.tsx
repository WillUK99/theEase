import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Page404: NextPage = (props) => {
  const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
      <h1 className='text-5xl'>404</h1>
      <Link className='p-5 m-5 bg-red-400' href='/'>Go home</Link>
      <button onClick={() => router.back()} className="p-5 m-5 bg-green-300">Go back</button>
    </div>
  )
}

export default Page404