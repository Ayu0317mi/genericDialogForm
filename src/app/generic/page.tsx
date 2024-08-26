'use client';

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import GenericDialog from "./GenericDialog"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { getPerson } from "./generic-actions";
import { useState, useEffect } from "react";

interface Person {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  dob: Date;
}

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
})

// Infer the form schema type
type FormSchemaType = z.infer<typeof formSchema>

// Define the props interface
interface UserFormProps {
  defaultValues: FormSchemaType
  onSubmit: (data: FormSchemaType) => void
}

const UserForm: React.ComponentType<{ defaultValues?: { firstname: string; lastname: string } | undefined; onSubmit: (data: { firstname: string; lastname: string }) => void; }> = ({ defaultValues, onSubmit }) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || { firstname: "", lastname: "" },
  })

  return (
    <Form {...form}>
      <form id="genericForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="first name" {...field} />
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
              <Input placeholder="last name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </form>
    </Form>
  )
}

export default function ExampleUsage() {
  const addUser = async (data: FormSchemaType) => {
    // Server action to add user
    console.log('Adding user:', data)
  }

  const editUser = async (data: FormSchemaType) => {
    // Server action to edit user
    console.log('Editing user:', data)
  }

  const existingUser = { firstname: "John", lastname: "Doe" }

  return (
    <div className="space-y-4">
      <GenericDialog
        FormComponent={UserForm}
        addAction={addUser}
        editAction={editUser}
      />
      <GenericDialog
        FormComponent={UserForm}
        object={existingUser}
        addAction={addUser}
        editAction={editUser}
      />
    </div>
  )

  
}



const UserTable: React.FC = async () => {
  // Add your code here to fetch the people data
  const people: Person[] | null = await getPerson();
  
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Date of Birth</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {people?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.firstname}</TableCell>
            <TableCell>{user.lastname}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.dob.toDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

