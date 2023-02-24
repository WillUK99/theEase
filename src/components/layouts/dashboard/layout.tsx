import React from 'react'

type Props = {
  children: React.ReactNode
}

const DashboardLayout = (props: Props) => {
  const { children } = props

  return (
    <>
      <div>DashboardLayout</div>
      {children}
    </>
  )
}

export default DashboardLayout