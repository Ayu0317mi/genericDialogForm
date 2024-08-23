'use client';

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import GenericDialog from "./GenericDialog"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})

// Infer the form schema type
type FormSchemaType = z.infer<typeof formSchema>

// Define the props interface
interface UserFormProps {
  defaultValues: FormSchemaType
  onSubmit: (data: FormSchemaType) => void
}

const UserForm: React.ComponentType<{ defaultValues?: { name: string; } | undefined; onSubmit: (data: { name: string; }) => void; }> = ({ defaultValues, onSubmit }) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || { name: "" },
  })

  return (
    <Form {...form}>
      <form id="genericForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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

  const existingUser = { name: "Jane Doe" }

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