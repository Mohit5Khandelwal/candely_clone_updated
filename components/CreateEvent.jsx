
"use client"
import React, { useEffect, useState } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
    DrawerFooter,
    DrawerDescription,
    DrawerTrigger,
  } from "@/components/ui/drawer";
import { Button } from './ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import EventForm from './EventForm';

const CreateEvent = () => {

    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();


    useEffect( () => {
        const create = searchParams.get("create");

        if( create === 'true' )
        {
            setIsOpen(true);
        }
    }, [searchParams]);


    const handleClose = () => {
        setIsOpen(false);

        if( searchParams.get("create") === "true" )
        {
            router.replace( window?.location?.pathname );
        }
    };


    return (
            <Drawer open={isOpen} onClose={handleClose}>
                
            <DrawerContent>
                <DrawerHeader>
                    
                    <DrawerTitle> Create New Event </DrawerTitle>

                </DrawerHeader>
                <EventForm 
                    onSubmitForm={ () => {
                        handleClose();
                    }}
                />
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CreateEvent;
