'use client';

import { useState } from "react";
import { Person } from '../lib/model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { date, z } from 'zod';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { createPerson, updatePerson, deletePerson } from './actions';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { format } from 'date-fns';

const formSchema = z.object({
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    phone: z.string().min(10).max(15),
    dob: z.date(),
});

interface DeletePersonFormProps {
    person?: Person;
}

export function DeletePersonForm({ person }: DeletePersonFormProps) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: person?.firstname ?? '',
            lastname: person?.lastname ?? '',
            phone: person?.phone ?? '',
            dob: person?.dob ? new Date(person.dob) : undefined,
        },
    });

    async function onSubmit() {
        try {
            if(person && person.id !== undefined)  {
                console.log('Deleting person:', person);
    
                // Create a FormData object and append the id
                const formData = new FormData();
                formData.append('id', person.id.toString());
    
                // Call the deletePerson function with the FormData
                await deletePerson(formData);
    
                toast.success('Person deleted', { style: { backgroundColor: 'red', color: '#fff'  } });
            } else {
                throw new Error('No person selected to delete');
            }
            setIsOpen(false); // Close the dialog after successful submission
        } catch (error) {
            console.error('Deletion error:', error);
            toast.error('Error: request failure');
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {person ? <Button variant="outline" onClick={() => setIsOpen(true)} style={{ backgroundColor: 'red', color: '#fff' }}>Delete</Button> : null}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle style={{ color: 'red' }}>Delete this person</DialogTitle>
                    <DialogDescription style={{ color: 'red' }}>
                        This action cannot be undone. 
                        Are you sure you want to delete this person?
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <p>{field.value}</p>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <p>{field.value}</p>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <p>{field.value}</p>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <p>{format(field.value, 'MMMM dd, yyyy')}</p>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="button" variant="destructive" onClick={onSubmit}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
