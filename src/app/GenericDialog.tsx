'use client';

import { useState } from 'react';
import { useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface GenericDialogProps<T extends FieldValues> {
  formSchema: ZodType<T>; // Pass the schema to initialize the form
  FormComponent: React.ComponentType<{ form: UseFormReturn<T> }>;
  object?: T;
  addAction: (data: T) => Promise<void>;
  editAction: (data: T) => Promise<void>;
  triggerButtonLabel?: string;
  addDialogTitle?: string;
  editDialogTitle?: string;
  dialogDescription?: string;
  submitButtonLabel?: string;
}

export default function GenericDialog<T extends FieldValues>({
  formSchema,
  FormComponent,
  object,
  addAction,
  editAction,
  triggerButtonLabel = object ? 'Edit' : 'Add New',
  addDialogTitle = 'Add New Item',
  editDialogTitle = 'Edit Item',
  dialogDescription = 'Make changes to your item here. Click save when you\'re done.',
  submitButtonLabel = object ? 'Save Changes' : 'Add Item',
}: GenericDialogProps<T>) {
  const [open, setOpen] = useState(false);

  // Initialize the form using react-hook-form
  const form = useForm<T>({
    resolver: async (values) => {
      try {
        const result = formSchema.parse(values);
        return { values: result, errors: {} };
      } catch (err: any) {
        return { values: {}, errors: err.formErrors?.fieldErrors };
      }
    },
    defaultValues: object as DefaultValues<T>,
  });

  const handleSubmit = async (data: T) => {
    if (object) {
      await editAction(data);
    } else {
      await addAction(data);
      console.log('User added:', data);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerButtonLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{object ? editDialogTitle : addDialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormComponent form={form} />
          <DialogFooter>
            <Button type="submit">{submitButtonLabel}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
