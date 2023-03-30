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

type EditServiceFormProps = {
  formData: Service & { id: string }
}

const EditServiceForm = ({ formData }: EditServiceFormProps) => {
  console.log('rerendering edit form')


  const { register, handleSubmit, formState: { errors } } = useForm<Service>({
    resolver: zodResolver(serviceSchema),
    defaultValues: formData
  })

  const { mutateAsync: updateServiceMutation } = api.service.update.useMutation({
    onSuccess: () => {
      toast
    },
    onError: (e) => {
      const errorMessage = e?.message
      errorMessage ? toast.error(errorMessage) : toast.error('Something went wrong')
    },
  })

  const onSubmit: SubmitHandler<Service> = async (data: Service) => {
    updateServiceMutation({ id: formData.id, ...data }).catch(console.error)
  }

  return (
    <form onSubmit={onPromise(handleSubmit(onSubmit))} className='mt-5 flex flex-col gap-3'>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="name">Name</label>
        <input id='name' type="text" {...register("name")} className={`border ${errors.name ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="price">Price (£)</label>
        <input step=".01" id='price' type="number" {...register("price", { valueAsNumber: true })} className={`border ${errors.price ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        {/* This should eventually prefill the field depending on the city you want to create a service for, eg London 1### Manchester 2### etc */}
        <label className='cursor-pointer' htmlFor="serviceId">Service ID</label>
        <input id='serviceId' type="number" {...register("serviceId")} className={`border ${errors.serviceId ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="description">Description</label>
        <textarea id='description' {...register("description")} className={`border resize-none ${errors.description ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="whatToExpect">What to expect</label>
        <textarea id='whatToExpect' {...register("whatToExpect")} className={`border resize-none ${errors.whatToExpect ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="instructions">Instructions</label>
        <textarea id='instructions' {...register("instructions")} className={`border resize-none ${errors.instructions ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="duration">Duration (mins)</label>
        <input id='duration' type="number" {...register("duration", { valueAsNumber: true })} className={`border ${errors.duration ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="isActive">Active</label>
        <input id='isActive' type="checkbox" {...register("isActive")} className={`border ${errors.isActive ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        {/* At a later stage this will be set automatically by a cronjob or something */}
        <label className='cursor-pointer' htmlFor="isBestSeller">Bestseller</label>
        <input id='isBestSeller' type="checkbox" {...register("isBestSeller")} className={`border ${errors.isBestSeller ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="isFeatured">Featured</label>
        <input id='isFeatured' type="checkbox" {...register("isFeatured")} className={`border ${errors.isFeatured ? 'border-red-500' : ''}`} />
      </div>
      <button type='submit' className='bg-purple-500 text-white p-5 rounded-sm w-fit'>Continue</button>
    </form>
  )
}

const ServicePage: NextPage<Props> = ({ id }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const { data, isFetching, isSuccess, refetch } = api.service.getOne.useQuery({ id }, {
    onError(err) {
      toast.error(err.message)
    },
    refetchOnWindowFocus: false,
  });

  const { id: dbId, createdAt, updatedAt, ...rest } = data || {}

  const formData = { ...rest }

  console.log('rerendering')
  console.log('formData', formData)

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
            <EditServiceForm formData={{ ...formData, id: dbId }} />
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