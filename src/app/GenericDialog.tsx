'use client';

import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
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
import { z } from "zod";

interface GenericDialogProps<T> {
  formSchema: z.ZodType<T>; // Pass the schema to initialize the form
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

export default function GenericDialog<T>({
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

  // Initialize useForm with the schema and default values
  const form = useForm<T>({
    resolver: zodResolver(formSchema),
    defaultValues: object,
  });

  const handleSubmit = async (data: T) => {
    if (object) {
      await editAction(data);
    } else {
      await addAction(data);
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
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <FormComponent form={form} />
        <DialogFooter>
          <Button type="submit" form="genericForm" onClick={form.handleSubmit(handleSubmit)}>
            {submitButtonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
