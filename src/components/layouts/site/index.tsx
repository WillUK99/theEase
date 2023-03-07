import React from 'react'

import Navbar from './navbar'

type Props = {
  children: React.ReactNode
}

const SiteLayout = (props: Props) => {
  const { children } = props
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default SiteLayout
