"use server"

import { db } from "@/lib/prisma"
import { auth, clerkClient } from "@clerk/nextjs/server"

export async function updateUsername(username) {

    const { userId } = await auth();


    if( !userId )
    {
        throw new Error("Unauthorized")
    }

    // check if username is already taken 
    const existingUsername = await db.user.findUnique({
        where: { username: username }
    });

    if( existingUsername && existingUsername.id !== userId)
    {
        throw new Error("Username is already taken")
    }

    // Update the username in db
    await db.user.update({
        where: { clerkUserId: userId },
        data: { username: username }
    });

    const client = await clerkClient()

    // update the username in clerk 
    await client.users.updateUser( userId, {
        username: username
    });

    return { success: true };


}