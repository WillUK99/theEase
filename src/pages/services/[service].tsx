import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import SiteLayout from '../../components/layouts/site'

const Service: NextPage = () => {
  const { query } = useRouter()

  return (
    <SiteLayout>
      {query.service}
    </SiteLayout>
  )
}

export default Service