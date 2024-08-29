//src/app/GenericDialog.tsx
'use client';

import { useState, useEffect } from 'react';
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
import { toast } from 'sonner';
import { ActionState } from '@/lib/action-state';

interface GenericDialogProps<T extends FieldValues> {
  formSchema: ZodType<T>;
  FormComponent: React.ComponentType<{ form: UseFormReturn<T> }>;
  object?: T;
  addAction: (data: T) => Promise<ActionState>;
  editAction: (data: T) => Promise<ActionState>;
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
  dialogDescription = object? 'Make changes to your item here. Click save when you\'re done.' : 'Fill out the form below to add a new item.',
  submitButtonLabel = object ? 'Save Changes' : 'Add Item',
}: GenericDialogProps<T>) {
  const [open, setOpen] = useState(false);

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

  // Reset the form when the dialog is closed
  useEffect(() => {
    if (!object) {
      form.reset();
    }
  }, [open, object, form]);

  async function handleSubmit(data: T) {
    const actions = object ? await editAction(data) : await addAction(data);
    
    if (actions.success) {
      const toastMessage = actions.message;
      toast.success(toastMessage);
    }else{
      const toastMessage = actions.message;
      toast.error(toastMessage);
    }
    setOpen(false);
  }

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
