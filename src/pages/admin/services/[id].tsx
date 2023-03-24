import { type GetStaticProps, type InferGetServerSidePropsType, type NextPage } from "next";

import { toast } from "react-toastify";
import AdminLayout from "~/components/layouts/dashboard/admin";
import { api } from "~/utils/api";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ServicePage: NextPage<Props> = ({ id }: Props) => {
  const { data, isFetching, isError, isSuccess } = api.service.getOne.useQuery({ id }, {
    onError(err) {
      toast.error(err.message)
    },
  });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-7">
        <h1 className="tracking-widest font-bold">Service Page</h1>
        <p>{data?.name}</p>
        <p>{data?.description}</p>
        {isFetching && <p>Loading...</p>}
        {isError && <p>An error occured</p>}
        {
          isSuccess && (
            <button
              role='button'

              className="bg-purple-400 px-7 py-2 rounded-sm text-white w-fit"
            >
              Edit service
            </button>
          )
        }
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