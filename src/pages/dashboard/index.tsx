import type { GetServerSidePropsContext, NextPage } from 'next'
import { useSession } from "next-auth/react";

import { getServerAuthSession } from "../../server/auth";

import DashboardLayout from "../../components/layouts/dashboard";

type Props = {}

const DashboardIndex: NextPage = (props: Props) => {
  const { data: sessionData } = useSession()

  console.log(sessionData)

  return (
    <DashboardLayout><iframe src="https://giphy.com/embed/xTiIzJSKB4l7xTouE8" width="480" height="208" frameBorder="0" allowFullScreen></iframe></DashboardLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
}

export default DashboardIndex