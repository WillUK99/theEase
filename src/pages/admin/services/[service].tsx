import { type NextPage } from "next"
import { useRouter } from 'next/router'

import { api } from "~/utils/api";
import { Service } from '~/constants/schemas/service';

const ServicePage: NextPage = () => {
  const { query } = useRouter()
  const service = api.service.getOne.useQuery<Service>({ id: query.service }, { staleTime: 1 * 60 * 1000 });
  console.log(service)
  return (
    <div>{query.service}</div>
  )
}

export default ServicePage