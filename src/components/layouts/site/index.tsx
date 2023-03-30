import React, { PropsWithChildren } from 'react'

import Navbar from './navbar'

type Props = {
  children: React.ReactNode
}

const SiteLayout = (props: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  )
}

export default SiteLayout
