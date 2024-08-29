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
  listName: string;
  object?: Person;
  addAction: (data: FormSchemaType) => Promise<ActionState>;
  editAction: (data: FormSchemaType) => Promise<ActionState>;
}

export default function PersonForm({ listName, object, addAction, editAction }: PersonFormProps) {
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
      triggerButtonLabel={object ? `Edit ${listName}` : `Add ${listName}`}
      addDialogTitle={`Add ${listName}`}
      editDialogTitle={`Edit ${listName}`}
      submitButtonLabel={object ? `Update ${listName}` : `Add ${listName}`}
      dialogDescription={object ? `Make changes to your ${listName.toLowerCase()} here. Click save when you're done.` : `Fill out the form below to add a new ${listName.toLowerCase()}.`}
    />
  );
}