"use server";

import { db } from '@/lib/prisma';
import { eventSchema } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';




export async function createEvent( data ) {

    try
    {
        const { userId } = await auth(); // async call for await 

        console.log(data);
        console.log(userId);

        if( !userId ) 
        {
            throw new Error("Unauthorized");
        }

        // validating the data using the schema 
        const validateData = eventSchema.parse(data);

        console.log( validateData );

        // check if the particular user is present in a DB or not 
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if( !user ) {
            throw new Error(" User not found");
        }

        const event = await db.event.create({
            data: {
                ...validateData,
                userId: user.id
            },
        });

        return event;
    }
    catch (e) {
        console.error(e);
    }

}

// all user events 
export async function getUserEvents() {

    const { userId } = await auth();

    if( !userId )
    {
        throw new Error('Unauthorized');
    } 

    // getting the record of the user from user table 
    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if( !user )
    {
        throw new Error("User not found");
    }

    const events = await db.event.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { bookings: true },
            },
        },
    });

    // Count the total booking corresponding to that event and

    return { events, username: user.username};




}

// Delete the event
export async function deleteEvent(eventId) {

    try 
    {
        const { userId } = await auth();

        if( !userId )
        {
            throw new Error("Unauthorized");
        }

        const user = await db.user.findUnique({
            where: { clerkUserId: userId}
        });

        if( !user )
        {
            throw new Error("User not found");
        }

        const event = await db.event.findUnique({
            where: { id: eventId }
        });

        if( !event || event.userId !== user.id )
        {
            throw new Error("Event not found or Unauthorized");
        }

        // If all condition met then delete the record from DB
        await db.event.delete({
            where: { id: eventId }
        });

        return { success : true };
    }
    catch (e) 
    {
        console.log(e);
    }
}