'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import GenericDialog from "./GenericDialog";
import { personFormSchema } from "./form-schema";

interface Person {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
}


// Infer the form schema type
type FormSchemaType = z.infer<typeof personFormSchema>;

interface PersonFormProps {
  object?: Person;
  addAction: (data: FormSchemaType) => Promise<void>;
  editAction: (data: FormSchemaType) => Promise<void>;
}

const PersonForm: React.FC<PersonFormProps> = ({ object, addAction, editAction }) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(personFormSchema),
    defaultValues: object ? {
      firstname: object.firstname,
      lastname: object.lastname,
      phone: object.phone
    } : { firstname: "", lastname: "", phone: "" },
  });

  const onSubmit = (data: FormSchemaType) => {
    if (object) {
      return editAction({ ...data, id: object.id });
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
      editAction={editAction}
      addAction={addAction}
      object={object} // Pass the object to GenericDialog
    />
  );
};

export default PersonForm;
