"use client";
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { availabilitySchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { timeSlots } from '../data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/useFetch';
import { updateAvailabiity } from '@/app/actions/availability';

const AvailabilityForm = ({initialData}) => {

   

    const { register , handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(availabilitySchema),
        defaultValues: {...initialData}
    })

    const { fn: fnupdateAvilability, loading, error } = useFetch(updateAvailabiity);

    const onSubmit = async (data) => {

        
        console.log('I was clicked');
        //console.log(data);
        

        await fnupdateAvilability(data);
    }

    // console.log(initialData)

    return (
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} >
            {
                [
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thrusday",
                    "friday",
                    "saturday",
                    "sunday"
                ].map( (day) => {

                    // Watch this particular field 
                    const isAvailable = watch(`${day}.isAvailable`);
                    //const isAvailable = true;
                    
                    

                    return (

                        <div key={day} className='flex items-center space-x-4 mb-4'>

                            <Controller 
                                name={`${day}.isAvailable`}
                                control={control}
                                render={( { field } ) => {

                                    return (

                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={ (checked) => {
                                                setValue(`${day}.isAvailable`, checked);

                                                if( !checked )
                                                {
                                                    setValue(`${day}.startTime`, "09:00");
                                                    setValue(`${day}.endTime`, "17:00");
                                                }
                                            } }
                                        />

                                    )
                                }}
                            />

                            

                            <span className='w-24'> 
                                { day.charAt(0).toUpperCase() + day.slice(1)}  
                            </span>
                            
                            {
                                isAvailable && (
                                    <>

                                        <Controller
                                            name={`${day}.startTime`}
                                            control={control}
                                            render={( { field }) => {

                                                return (

                                                    <Select onValueChange={field.onChange} value={field.value}>

                                                        <SelectTrigger className='w-[180px]'>
                                                            <SelectValue placeholder="Select a timezone" />
                                                        </SelectTrigger>

                                                        <SelectContent>

                                                            <SelectGroup>

                                                                <SelectLabel> Select Time </SelectLabel>

                                                                {
                                                                    timeSlots.map( (time) => {

                                                                        return (
                                                                            <SelectItem key={time} value={time}>
                                                                                {time}
                                                                            </SelectItem>
                                                                        );
                                                                    })
                                                                }

                                                                

                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>



                                                );
                                            }}
                                        />
                                    

                                    <span> to </span>

                                    <Controller
                                            name={`${day}.endTime`}
                                            control={control}
                                            render={( { field }) => {

                                                return (

                                                    <Select onValueChange={field.onChange} value={field.value}>

                                                        <SelectTrigger className='w-[180px]'>
                                                            <SelectValue placeholder="Select a timezone" />
                                                        </SelectTrigger>

                                                    <SelectContent>

                                                        <SelectGroup>

                                                            <SelectLabel> Select Time </SelectLabel>

                                                            {
                                                                timeSlots.map( (time) => {

                                                                    return (
                                                                        <SelectItem key={time} value={time}>
                                                                            {time}
                                                                        </SelectItem>
                                                                    );
                                                                })
                                                            }

                                                            

                                                        </SelectGroup>

                                                    </SelectContent>

                                                </Select>


                                                );
                                            }}
                                    />

                                    {
                                        errors[day]?.endTime && (
                                            <span className='text-red-500 text-sm ml-2'>
                                                { errors[day].endTime.message }
                                            </span>
                                        )
                                    }



                                    </>
                                )
                            }


                            

                        </div>
                    )
                })
            
            }

            <div className='flex space-x-4 items-center'>
                <span className='flex items-center gap-3'> 
                    Minimum gap before booking (minutes) :

                    <Input 
                        type="number"
                        { ...register("timeGap", {
                            valueAsNumber: true,
                        })}
                        className="w-32 text-md bg-black text-white"
                    />

                    {
                        errors.timeGap && (
                            <span className='text-red-500 text-sm ml-2'>
                                { errors.timeGap.message }
                            </span>
                        )
                    }

                </span>
            </div>

            {error && <div className="text-red-500 text-sm">{error?.message}</div>}
            <Button type="submit" disabled={loading} >
                {loading ? "Updating..." : "Update Availability"}
            </Button>
        </form>
    )
}

export default AvailabilityForm;