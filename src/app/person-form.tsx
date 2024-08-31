//src/app/person-form.tsx 
'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GenericDialog from "./GenericDialog";
import { personFormSchema } from "./form-schema";
import { z } from "zod";
import { Person } from '@/lib/model';
import { ActionState } from "@/lib/action-state";
import AsyncSelect from 'react-select/async';
import {loadInputValue, addInputValue} from './server-actions';
import { OptionType } from '@/lib/autocomplete-type';


// Person schema
type FormSchemaType = z.infer<typeof personFormSchema>;

interface PersonFormProps {
  object?: Person;
  addAction: (data: FormSchemaType) => Promise<ActionState>;
  editAction: (data: FormSchemaType) => Promise<ActionState>;
  loadOptions: (type: "states" | "cities" | "roles", inputValue: string) => Promise<{ label: string; value: string; }[]>;
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
          <FormField
            control={form.control}
            name="stateName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address State Name</FormLabel>
                <AsyncSelect<OptionType>
                  cacheOptions
                  loadOptions={(inputValue) => {
                    return loadInputValue("states", inputValue);
                  }}
                  defaultOptions
                  onChange={(selectedOption) => {
                    if (selectedOption?.isNew) {
                      addInputValue("states", selectedOption.value);
                      field.onChange(selectedOption.value);
                    } else {
                      field.onChange(selectedOption?.value);
                    }
                  }}
                  placeholder="Select or type state name"
                  value={field.value ? { label: field.value, value: field.value } : null}
                  isClearable
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City Name</FormLabel>
                <AsyncSelect<OptionType>
                  cacheOptions
                  loadOptions={(inputValue) => {
                    return loadInputValue("cities", inputValue);
                  }}
                  defaultOptions
                  onChange={(selectedOption) => {
                    if (selectedOption?.isNew) {
                      addInputValue("cities", selectedOption.value);
                      field.onChange(selectedOption.value);
                    } else {
                      field.onChange(selectedOption?.value);
                    }
                  }}
                  placeholder="Select or type city name"
                  value={field.value ? { label: field.value, value: field.value } : null}
                  isClearable
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roles</FormLabel>
                <AsyncSelect<OptionType>
                  cacheOptions
                  loadOptions={(inputValue) => {
                    return loadInputValue("roles", inputValue);
                  }}
                  defaultOptions
                  onChange={(selectedOption) => {
                    if (selectedOption?.isNew) {
                      addInputValue("roles", selectedOption.value);
                      field.onChange(selectedOption.value);
                    } else {
                      field.onChange(selectedOption?.value);
                    }
                  }}
                  placeholder="Select or type Role name"
                  value={field.value ? { label: field.value, value: field.value } : null}
                  isClearable
                />
              </FormItem>
            )}
          />
        </Form>
      )}
      formSchema={personFormSchema}
      editAction={editAction}
      addAction={addAction}
      object={object}
      loadOptions={loadInputValue}

      // customize Dialoge labels and descriptions
      addDialogTitle="Add New Entry"
      dialogDescription = {object? 'Modify the data and click save.' : 'Fill out the form below to create a new item.'}
    />
  );
}