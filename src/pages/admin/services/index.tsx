import { useState } from 'react'
import { NextPage } from 'next/types'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from 'react-toastify';
import { TRPCClientError } from "@trpc/client";

import AdminLayout from '~/components/layouts/dashboard/admin'
import { serviceSchema, Service } from '~/constants/schemas/service';
import { api } from "~/utils/api";
import { onPromise } from "~/utils/async";

const ServiceForm: React.FC = () => {
  const { mutateAsync: addServiceMutation } = api.service.addService.useMutation({
    onError: (error) => {
      console.log(error)
    }
  })
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<Service>({
    resolver: zodResolver(serviceSchema)
  })
  // const { append } = useFieldArray({
  //   control,
  //   name: "addons"
  // });

  const onSubmit: SubmitHandler<Service> = async (data: Service) => {
    try {
      await addServiceMutation(data)
      reset()
    } catch (error) {
      console.error(error)
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
      {/* re-add this once addons are implmented - get prisma errors as id's don't match anything in db */}
      {/* <button
        type="button"
        onClick={() => {
          append('testid');
        }}
      >
        Add addon
      </button> */}
      <button type='submit' className='bg-purple-500 text-white p-5 rounded-sm w-fit'>Continue</button>
    </form>
  )
}

const ServicesPage: NextPage = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <AdminLayout>
      <button onClick={() => setShowForm(!showForm)} className='bg-green-600'>Add a service</button>
      {
        showForm ? (
          <ServiceForm />
        ) : null
      }
    </AdminLayout >
  )
}

export default ServicesPage