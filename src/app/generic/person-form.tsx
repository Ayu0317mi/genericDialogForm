'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import GenericDialog from "./GenericDialog";
import { personFormSchema } from "./form-schema";


// Infer the form schema type
type FormSchemaType = z.infer<typeof personFormSchema>;

interface PersonFormProps {
  defaultValues?: FormSchemaType;
  addAction: (data: FormSchemaType) => Promise<void>;
  editAction: (data: FormSchemaType) => Promise<void>;
}

const PersonForm: React.FC<PersonFormProps> = ({ defaultValues, addAction, editAction }) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(personFormSchema),
    defaultValues: defaultValues || { firstname: "", lastname: "" },
  });

  const onSubmit = (data: FormSchemaType) => {
    if (defaultValues) {
      editAction(data);
    } else {
      addAction(data);
    }
  };

  return (
    <GenericDialog
      FormComponent={() => (
        <Form {...form}>
          <form id="genericForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          </form>
        </Form>
      )}
      addAction={addAction}
      editAction={editAction}
    />
  );
};

export default PersonForm;
