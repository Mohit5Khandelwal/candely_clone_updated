
import { getUserAvailability } from '@/app/actions/availability';
import React from 'react'
import { defaultAvailability } from './data';
import AvailabilityForm from './_components/availability-form';

const AvailabilityPage = async() => {
        
    const availability = await getUserAvailability();
    //console.log(JSON.stringify(availability, null, 2));;
    console.log(defaultAvailability);

    return (

        <AvailabilityForm initialData={defaultAvailability || availability}  >

        
        
        </AvailabilityForm>
    )
}

export default AvailabilityPage;
