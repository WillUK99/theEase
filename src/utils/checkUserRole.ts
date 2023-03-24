import { UserRoles } from './../types/user.types';
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from '~/server/auth';

const checkUserRole = async (ctx: GetServerSidePropsContext, role: UserRoles) => {
  const session = await getServerAuthSession(ctx)

  if (!session || session.user.role === role) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}