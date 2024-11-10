"use server"

import { db } from "@/lib/prisma";


import { auth } from "@clerk/nextjs/server";


export async function getUserAvailability() 
{
    const { userId } = await auth();
    

    if( !userId )
    {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId},
        include: {
            availability: {
                include: { days: true }
            }
        }
    });

    console.log(user);

    if( !user || !user.availability )
    {
        return null;
    }

    // Transform the availability information 

    const availabilityData = { timeGap: user?.availability?.timeGap }



    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ].forEach((day) => {
      const dayAvailability = user?.availability?.days?.find(
        (d) => d.day === day.toUpperCase()
      );
    
      availabilityData[day] = {
        isAvailable: !!dayAvailability,
        startTime: dayAvailability
          ? dayAvailability.startTime.toISOString().slice(11, 16)
          : "09:00",
        endTime: dayAvailability
          ? dayAvailability.endTime.toISOString().slice(11, 16)
          : "17:00"
      };
    });
    
    console.log(availabilityData);
    
    return availabilityData;



}

export async function updateAvailabiity(data) {

    const { userId } = await auth();
      

    if( !userId )
    {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId},
      include: {
          availability: {
              include: { days: true }
          }
      }
  });

  // Object.entries coverting the whole object into array 

  const availabilityData = Object.entries(data).flatMap( 

      ([day, { isAvailable, startTime, endTime} ]) => {

          if( isAvailable )
          {
            const baseDate = new Date().toISOString().split("T")[0];

            return [

                {
                    day: day.toUpperCase(),
                    startTime: new Date(`${baseDate}T${startTime}:00Z`),
                    endTime: new Date(`${baseDate}T${endTime}:00Z`),

                },
            ]
          }

          return [];
      }
  );
    
    console.log(availabilityData);

    // Updating the Data in the Database
    






}