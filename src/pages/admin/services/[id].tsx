import { useState } from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { zodResolver } from "@hookform/resolvers/zod";

import AdminLayout from "~/components/layouts/dashboard/admin";
import { getServerAuthSession } from "~/server/auth";
import { UserRoleEnum } from "~/types/user.types";
import { api } from "~/utils/api";
import { Service, serviceSchema } from "~/constants/schemas/service";
import { onPromise } from "~/utils/async";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const EditServiceForm = ({ formData }: { formData: Service }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Service>({
    resolver: zodResolver(serviceSchema)
  })

  const onSubmit: SubmitHandler<Service> = async (data: Service) => {
    console.log(data)
  }

  return (
    <form onSubmit={onPromise(handleSubmit(onSubmit))} className='mt-5 flex flex-col gap-3'>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="name">Name</label>
        <input id='name' type="text" value={formData.name} {...register("name")} className={`border ${errors.name ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="price">Price (£)</label>
        <input step=".01" id='price' value={formData.price} type="number" {...register("price", { valueAsNumber: true })} className={`border ${errors.price ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        {/* This should eventually prefill the field depending on the city you want to create a service for, eg London 1### Manchester 2### etc */}
        <label className='cursor-pointer' htmlFor="serviceId">Service ID</label>
        <input id='serviceId' type="number" value={formData.serviceId} {...register("serviceId")} className={`border ${errors.serviceId ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="description">Description</label>
        <textarea id='description' value={formData.description} {...register("description")} className={`border resize-none ${errors.description ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="whatToExpect">What to expect</label>
        <textarea id='whatToExpect' value={formData.whatToExpect} {...register("whatToExpect")} className={`border resize-none ${errors.whatToExpect ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="instructions">Instructions</label>
        <textarea id='instructions' value={formData.instructions} {...register("instructions")} className={`border resize-none ${errors.instructions ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="duration">Duration (mins)</label>
        <input id='duration' type="number" value={formData.duration} {...register("duration", { valueAsNumber: true })} className={`border ${errors.duration ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="isActive">Active</label>
        <input id='isActive' type="checkbox" checked={formData.isActive} {...register("isActive")} className={`border ${errors.isActive ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        {/* At a later stage this will be set automatically by a cronjob or something */}
        <label className='cursor-pointer' htmlFor="isBestSeller">Bestseller</label>
        <input id='isBestSeller' type="checkbox" checked={formData.isBestSeller} {...register("isBestSeller")} className={`border ${errors.isBestSeller ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="isFeatured">Featured</label>
        <input id='isFeatured' type="checkbox" checked={formData.isFeatured} {...register("isFeatured")} className={`border ${errors.isFeatured ? 'border-red-500' : ''}`} />
      </div>
      <button type='submit' className='bg-purple-500 text-white p-5 rounded-sm w-fit'>Continue</button>
    </form>
  )
}

const ServicePage: NextPage<Props> = ({ id }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const { data, isFetching, isSuccess } = api.service.getOne.useQuery({ id }, {
    onError(err) {
      toast.error(err.message)
    },
    refetchOnWindowFocus: false,
  });

  const { id: dbId, createdAt, updatedAt, ...rest } = data || {}

  const formData = { ...rest }

  console.log(formData)

  return (
    <AdminLayout>
      <div className="flex flex-col gap-7">
        <h1 className="tracking-widest font-bold">Service Page</h1>
        <p>{formData?.name}</p>
        <p>{formData?.description}</p>
        {isFetching && <p>Loading...</p>}
        {
          isSuccess && (
            <button
              role='button'
              onClick={() => setShowForm(!showForm)}
              className="bg-purple-400 px-7 py-2 rounded-sm text-white w-fit"
            >
              Edit service
            </button>
          )
        }

        {
          showForm && (
            <EditServiceForm formData={formData} />
          )
        }
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

  // Maybe do this instead if in future I want to change the service from a dropdown
  // Get the id from url
  // prefetch the service with useQuery
  // dehyrdate the service and pass to props
  // on frontend useQuery will return the service from cache
  const id = ctx?.params?.id

  const session = await getServerAuthSession(ctx)

  if (!session || session.user.role === UserRoleEnum.USER) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      id
    }
  }
}

export default ServicePage