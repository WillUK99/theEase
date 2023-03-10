import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: sessionData } = useSession()

  console.log(sessionData)

  return (
    <nav className='container flex flex-row items-center justify-between py-5 mx-auto'>
      <ul className='flex flex-row items-center justify-center gap-10'>
        <li>
          <Link href='/resources'>Resources</Link>
        </li>
        <li>
          <Link href='/services'>Services</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
      </ul>

      <Link href='/'>
        The ease project
      </Link>

      <button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
      {
        sessionData && (
          <Link href={sessionData.user.role !== 'USER' ? '/admin' : '/dashboard'}>Dashboard</Link>
        )
      }
    </nav>
  )
}

export default Navbar
