'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface GenericDialogProps<T> {
  FormComponent: React.ComponentType<{ defaultValues?: T; onSubmit: (data: T) => void }>
  object?: T
  addAction: (data: T) => Promise<void>
  editAction: (data: T) => Promise<void>
  triggerButtonLabel?: string
  addDialogTitle?: string
  editDialogTitle?: string
  dialogDescription?: string
  submitButtonLabel?: string
}

export default function GenericDialog<T>({
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
  const [open, setOpen] = useState(false)

  const handleSubmit = async (data: T) => {
    if (object) {
      await editAction(data)
    } else {
      await addAction(data)
    }
    setOpen(false)
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
        <FormComponent defaultValues={object} onSubmit={handleSubmit} />
        <DialogFooter>
          <Button type="submit" form="genericForm">{submitButtonLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}