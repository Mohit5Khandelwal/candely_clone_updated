"use client"
import { eventSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'
import useFetch from '@/hooks/useFetch'

import { useRouter } from 'next/navigation'
import { createEvent } from '@/app/actions/event'


const EventForm = ({onSubmitForm}) => {

    const router = useRouter();

    const { register, handleSubmit, control, formState: {errors} } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            duration: 30,
            isPrivate: true,
        }
    });
    
    // calling the API 
    const { loading, error, fn: fnCreateEvent} = useFetch(createEvent);

    // handle Submit function 
    const onSubmit = async(data) => {

        await fnCreateEvent(data);

        if( !loading && !error )
        {
            onSubmitForm();
            router.refresh();
        }


    }



    return (
        
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className='px-5 flex flex-col gap-4'>

            <div>
                
                <label
                    htmlFor="title"
                    className='block text-sm font-medium text-gray-700'
                >
                    Event Title
                </label>


                <Input id='title' {...register("title")} className='mt-1' />

                {
                    errors?.title && 
                    <p className='text-red-500 text-sm mt-1'> 
                        {errors.title.message} 
                    </p>
                }

            </div>

            <div>
                
                <label
                    htmlFor="description"
                    className='block text-sm font-medium text-gray-700'
                >
                    Event Description
                </label>


                <Textarea id='description' {...register("description")} className='mt-1' />

                {
                    errors?.description && 
                    <p className='text-red-500 text-sm mt-1'> 
                        {errors.description.message} 
                    </p>
                }

            </div>

            <div>
                
                <label
                    htmlFor="duration"
                    className='block text-sm font-medium text-gray-700'
                >
                    Duration
                </label>


                <Input 
                    id='duration' 
                    {...register("duration", {
                        valueAsNumber: true,
                    })} 
                    className='mt-1'
                    type="number" 
                    />

                {
                    errors?.duration && 
                    <p className='text-red-500 text-sm mt-1'> 
                        {errors.duration.message} 
                    </p>
                }

            </div>

            <div>
                
                <label
                    htmlFor="isPrivate"
                    className='block text-sm font-medium text-gray-700 mb-3'
                >
                    Event Privacy 
                </label>

                <Controller 
                    name="isPrivate"
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value ? "true" : "false"}  // Correctly map the value to "true" or "false"
                            onValueChange={(value) => field.onChange(value === "true")}  // Use field.onChange to update the form state
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select Privacy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Private</SelectItem>
                                <SelectItem value="false">Public</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />


                

                {
                    errors?.isPrivate && 
                    <p className='text-red-500 text-sm mt-1'> 
                        {errors?.isPrivate?.message} 
                    </p>
                }

            </div>

            { error && <p className='text-red-500 text-xs mt-1'> {error.message} </p>}
            
            <Button type="submit" disabled={loading}>
                { loading ? "Submitting..." : "Create Event"} 
            </Button>


        </form>
    )
}

export default EventForm
