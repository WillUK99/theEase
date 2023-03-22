import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { GetServerSidePropsContext, NextPage } from 'next/types'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from 'react-toastify';
import { TRPCClientError } from "@trpc/client";

import AdminLayout from '~/components/layouts/dashboard/admin'
import { serviceSchema, Service } from '~/constants/schemas/service';
import { addonSchema, Addon } from '~/constants/schemas/addon';
import { api } from "~/utils/api";
import { onPromise } from "~/utils/async";
import { getServerAuthSession } from '~/server/auth';
import Link from 'next/link';
import slugify from '~/utils/slugify';

const AddonForm: React.FC = () => {
  const { mutateAsync: createAddonMutation } = api.addon.add.useMutation({
    onError: (error) => {
      console.log(error)
    },
  })
  const services = api.service.getAll.useQuery<Service>(undefined, { staleTime: 5 * 60 * 1000 });
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Addon>({
    resolver: zodResolver(addonSchema)
  })

  const onSubmit: SubmitHandler<Addon> = async (data: Addon) => {
    try {
      await createAddonMutation(data)
      console.log(data)
      reset()
      toast('Addon has been created', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error)
      toast.error(`${error as string}`, {
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
        <label className='cursor-pointer' htmlFor="addonId">Addon ID</label>
        <input id='addonId' type="number" {...register("addonId")} className={`border ${errors.addonId ? 'border-red-500' : ''}`} />
      </div>
      <div className='flex gap-3'>
        <label className='cursor-pointer' htmlFor="duration">Duration (mins)</label>
        <input id='duration' type="number" {...register("duration", { valueAsNumber: true })} className={`border ${errors.duration ? 'border-red-500' : ''}`} />
      </div>
      <div>
        <label className='cursor-pointer' htmlFor="service">Service</label>
        <select id='service' {...register("service")} className={`border ${errors.service ? 'border-red-500' : ''}`}>
          {services.data?.map((service) => (
            <option key={service.id} value={service.id}>{service.name}</option>
          ))}
        </select>
      </div>
      <button type='submit' className='bg-purple-500 text-white p-5 rounded-sm w-fit'>Continue</button>
    </form>
  )
}

const ServiceForm: React.FC = () => {
  const { mutateAsync: addServiceMutation } = api.service.add.useMutation({
    onError: (error) => {
      console.log(error)
    }
  })
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<Service>({
    resolver: zodResolver(serviceSchema)
  })

  const onSubmit: SubmitHandler<Service> = async (data: Service) => {
    try {
      await addServiceMutation(data)
      reset()
      toast('Service has been created', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error)
      toast.error(`${error as string}`, {
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
      <button type='submit' className='bg-purple-500 text-white p-5 rounded-sm w-fit'>Continue</button>
    </form>
  )
}

const ServicesPage: NextPage = () => {
  const [showForm, setShowForm] = useState<'service' | 'addon'>('service')
  const services = api.service.getAll.useQuery<Service>(undefined, { staleTime: 5 * 60 * 1000 });

  return (
    <AdminLayout>
      <div className='flex gap-3'>
        <button onClick={() => setShowForm('service')} className='bg-green-600'>Create service</button>
        <button onClick={() => setShowForm('addon')} className='bg-green-600'>Create addon</button>
      </div>
      {
        showForm === 'service' ? (
          <ServiceForm />
        ) : <AddonForm />
      }
      <table className='overflow-scroll'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Service ID</th>
            <th>Description</th>
            <th>What to expect</th>
            <th>Instructions</th>
            <th>Duration</th>
            <th>Active</th>
            <th>Bestseller</th>
            <th>Featured</th>
          </tr>
        </thead>
        <tbody>
          {
            services.data?.map(service => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.price}</td>
                <td><Link href={`/admin/services/${service.id}`}>{service.serviceId}</Link></td>
                <td>{service.description}</td>
                <td>{service.whatToExpect}</td>
                <td>{service.instructions}</td>
                <td>{service.duration}</td>
                <td>{service.isActive ? 'Yes' : 'No'}</td>
                <td>{service.isBestSeller ? 'Yes' : 'No'}</td>
                <td>{service.isFeatured ? 'Yes' : 'No'}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
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

export default ServicesPage
