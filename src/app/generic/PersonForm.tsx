import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Person } from '../../lib/model';
import { createPerson, updatePerson } from './generic-actions';
import { toast } from 'sonner';

const formSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  phone: z.string().min(10).max(15),
});

interface PersonFormProps {
  person?: Person | null;
  onClose: () => void;
}

export function PersonForm({ person, onClose }: PersonFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: person?.firstname ?? '',
      lastname: person?.lastname ?? '',
      phone: person?.phone ?? '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (person) {
        await updatePerson({ ...data, id: person.id ?? 0 });
        toast.success('Person updated successfully');
      } else {
        await createPerson({ ...data, id: 0 });
        toast.success('Person added successfully');
      }
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Error: request failure');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder='First Name' {...field} />
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
                <Input placeholder='Last Name' {...field} />
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
                <Input placeholder='0422018632' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {person ? "Save" : "Add"}
        </Button>
      </form>
    </Form>
  );
}
