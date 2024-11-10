"use client"

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from '@/lib/validations';
import useFetch from '@/hooks/useFetch';
import { updateUsername } from '@/app/actions/updateUsername';
import { BarLoader } from 'react-spinners';






const Dashboard = () => {

    const { isLoaded, user } =  useUser();

    

    const { register, handleSubmit, setValue, formState: { errors } } =  useForm({
        resolver: zodResolver(usernameSchema)
    });

    const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername);

    useEffect( () => {
        setValue("username", user?.username);
    }, [isLoaded]);

    const onSubmit = async (data) => {

        fnUpdateUsername(data.username);
        // as we trigger the fnUpdateUsername it would load , error inside it 
    };

    return (
        <div className='space-y-8'>
            <Card>

                <CardHeader>
                    <CardTitle> Welcome, {user?.firstName} </CardTitle>
                </CardHeader>

            </Card>

            <Card className='mt-4'>
                <CardHeader>
                    <CardTitle>Your Unique Link </CardTitle>
                </CardHeader>
                <CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div className='space-y-2'>
                            <div >
                                <span className='flex items-center gap-2'>
                                    {window?.location?.origin}
                                    {/* https://localhost:3000 */}
                                    <Input {...register("username")} placeholder="username" />
                                </span>
                                {
                                    errors.username && 
                                    <p className='text-red-500 text-sm mt-1'> 
                                        {errors.username.message} 
                                    </p>
                                }  
                                {
                                    error && (
                                        <p className='text-red-500 text-sm mt-1'> {error?.message} </p>
                                    )
                                }
                            </div>
                            

                            { loading && (
                                    <BarLoader className='mb-4' width={"100%"} color='#36d7b7' /> 
                                    )}
                            
                            <Button> Update Username </Button>
                        </div>

                    </form>
                </CardHeader>
            </Card>
        </div>
    )
}

export default Dashboard;
