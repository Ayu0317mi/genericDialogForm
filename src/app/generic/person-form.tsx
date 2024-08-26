'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { personFormSchema } from "./form-schema";


// Infer the form schema type
type FormSchemaType = z.infer<typeof personFormSchema>;

const PersonForm: React.FC<{ defaultValues?: FormSchemaType; onSubmit: (data: FormSchemaType) => void }> = ({
  defaultValues,
  onSubmit,
}) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(personFormSchema),
    defaultValues: defaultValues || { firstname: "", lastname: "" },
  });

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
      </form>
    </Form>
  );
};

export default PersonForm;