import React, { useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'

import SiteLayout from '../../components/layouts/site'


const Services: NextPage = () => {
  const [services, setServices] = useState([
    'Chair massage',
    'Leg massage',
    'Thai massage',
    'Full body massage'
  ])

  return (
    <SiteLayout>
      <div className='grid grid-cols-2 gap-10'>
        {
          services.map((service, i) => {
            return (
              <Link
                key={i}
                className='bg-orange-200 w-fit p-5 hover:bg-orange-400'
                href={`/services/${service.toLocaleLowerCase().split(' ').join('-')}`}
              >
                {service}
              </Link>
            )
          })
        }
      </div>
    </SiteLayout>
  )
}

export default Services