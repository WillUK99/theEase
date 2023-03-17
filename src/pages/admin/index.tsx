import type { GetServerSidePropsContext, NextPage } from 'next'
import { useSession } from "next-auth/react";
import Image from 'next/image'

import { getServerAuthSession } from "../../server/auth";
import statCardData from '../../__mock__data__/statCardData.json'

import AdminLayout from "../../components/layouts/dashboard/admin";
import Link from 'next/link';

const adminIndex: NextPage = () => {
  const percentageColor = (percent: number) => {
    if (percent < 50) {
      return 'bg-red-500'
    } else if (percent >= 50 && percent < 75) {
      return 'bg-yellow-500'
    } else if (percent >= 75 && percent < 100) {
      return 'bg-green-500'
    } else {
      return 'bg-green-500'
    }
  }

  return (
    <AdminLayout>
      {/* Quick view stat cards */}
      <div className='grid grid-cols-4 gap-5'>
        {
          // This will later only show the users selected stats they want to see
          statCardData.slice(0, 4).map((stat, i) => {
            const percentToTarget = ((stat.daily.total / stat.daily.target) * 100).toFixed(0)
            return (
              <Link key={i} href={`/admin/reports/${stat.slug}`}>
                <div key={stat.id} className='flex flex-col gap-5 p-5 bg-white border border-gray-400 rounded-md'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2>{stat.isCurrency ? `£${stat.daily.total.toLocaleString()}` : stat.daily.total}</h2>
                      <p>{stat.statistic}</p>
                    </div>
                    <div>
                      <Image
                        src='/favicon.ico'
                        width={60}
                        height={60}
                        alt='Total Bookings'
                      />
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                      <p>0%</p>
                      <p>{percentToTarget}%</p>
                    </div>
                    <div className='w-full h-4 shadow bg-slate-100'>
                      <span style={{ width: `${Number(percentToTarget)}%` }} className={`h-4 ${percentageColor(Number(percentToTarget))} block`} />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx)

  if (!session || session.user.role === 'USER') {
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

export default adminIndex