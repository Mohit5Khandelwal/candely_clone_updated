import { auth, clerkClient, currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";


export const checkUser = async () => {

    // const user = await currentUser();

    const user = await currentUser();

    if( !user )
    {
        return null;
    }

    try {

        

        const loggedInUser = await db?.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });

        if( loggedInUser )
        {
            return loggedInUser;
        }

        let name = `${user.firstName} ${user.lastName}`;

        if( user.lastName != null)
        {
            name = `${user.firstName} ${user.lastName}`;
        }
        else 
        {
            name = `${user.firstName}`;
        }
        

        (await clerkClient()).users.updateUser( user.id, {
            username: name.split(" ").join("-") + user.id.slice(-4),
        });

        // creating a new user in the DB
        const newUser = await db.user.create({

            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
                username: name.split(" ").join("-") + user.id.slice(-4),
            }
        })

        return newUser;


    }
    catch (error) {
        console.error("Error in currentUser function:", error);
        throw new Error("Failed to fetch current user");// Re-throw for handling in checkUser
    }
}