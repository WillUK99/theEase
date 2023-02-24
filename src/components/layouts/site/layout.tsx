import React from 'react'

type Props = {
  children: React.ReactNode
}

const SiteLayout = (props: Props) => {
  const { children } = props
  return (
    <>
      <div>SiteLayout</div>
      {children}
    </>
  )
}

export default SiteLayout