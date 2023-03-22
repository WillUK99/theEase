import { type InferGetServerSidePropsType, type GetStaticProps, type NextPage } from "next"
import { useRouter } from 'next/router'

import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import { Service } from '~/constants/schemas/service';
import AdminLayout from "~/components/layouts/dashboard/admin";
import { toast } from "react-toastify";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ServicePage: NextPage<Props> = ({ id }: Props) => {
  const { data, isFetching, isError } = api.service.getOne.useQuery({ id }, {
    onError(err) {
      toast.error(err.message)
    },
  });

  return (
    <AdminLayout>
      <div>
        <h1>Service Page</h1>
        <p>{data?.name}</p>
        {isFetching && <p>Loading...</p>}
        {isError && <p>An error occured</p>}
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps: GetStaticProps = async (ctx) => {
  // Maybe do this instead if in future I want to change the service from a dropdown
  // Get the id from url
  // prefetch the service with useQuery
  // dehyrdate the service and pass to props
  // on frontend useQuery will return the service from cache
  const id = ctx?.params?.id

  return {
    props: {
      id
    }
  }
}

export default ServicePage