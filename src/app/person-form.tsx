//src/app/person-form.tsx 
'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GenericDialog from "./GenericDialog";
import { personFormSchema } from "./form-schema";
import { z } from "zod";
import { Person } from '@/lib/model';
import { ActionState } from "@/lib/action-state";

// Infer the form schema type
type FormSchemaType = z.infer<typeof personFormSchema>;

interface PersonFormProps {
  object?: Person;
  addAction: (data: FormSchemaType) => Promise<ActionState>;
  editAction: (data: FormSchemaType) => Promise<ActionState>;
}

export default function PersonForm({ object, addAction, editAction }: PersonFormProps) {
  return (
    <GenericDialog
      FormComponent={({ form }) => (
        <Form {...form}>
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
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
                  <Input placeholder="Last name" {...field} />
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+61-xxx-xxx-xxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      )}
      formSchema={personFormSchema}
      editAction={editAction}
      addAction={addAction}
      object={object}

      // customize Dialoge labels and descriptions
      addDialogTitle="Add New Entry"
      dialogDescription = {object? 'Modify the data and click save.' : 'Fill out the form below to create a new item.'}
    />
  );
}