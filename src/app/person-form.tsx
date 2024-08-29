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
import {searchState} from './generic-actions';


// Person schema
type FormSchemaType = z.infer<typeof personFormSchema>;

interface PersonFormProps {
  object?: Person;
  addAction: (data: FormSchemaType) => Promise<ActionState>;
  editAction: (data: FormSchemaType) => Promise<ActionState>;
}

// Define a custom type that extends the default react-select option
interface OptionType {
  label: string;
  value: string;
  isNew?: boolean; // Allow the __isNew__ property
}

const loadStates = async (inputValue: string): Promise<OptionType[]> => {
  if (inputValue.length < 1) return [];

  const roles = await searchState(inputValue);
  
  const formattedStates = roles.map((state) => ({ label: state, value: state }));
  
  if (formattedStates.length === 0) {
      formattedStates.push({
          label: `Add "${inputValue}"`,
          value: inputValue,
          isNew : true,
      }as OptionType);
  }
  
  return formattedStates;
};

const addState = async (newState: string) => {
  console.log(`Adding new state: ${newState}`);
};

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
                loadOptions={loadStates}
                defaultOptions
                onChange={(selectedOption) => {
                  if (selectedOption?.isNew) {
                    addState(selectedOption.value);
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