import { NextPage } from 'next/types'
import AdminLayout from '~/components/layouts/dashboard/admin'

type Props = {}

const ServicesPage: NextPage = (props: Props) => {
  const handleClick = () => {
    console.log('Add a service')
  }

  return (
    <AdminLayout>
      <button onClick={() => handleClick()}>Add a service</button>
    </AdminLayout>
  )
}

export default ServicesPage