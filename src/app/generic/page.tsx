'use client';

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import GenericDialog from "./GenericDialog"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { getPerson } from "./generic-actions";
import { useState, useEffect } from "react";
import PersonForm from "./person-form";
import PersonTabel from "./person-table";
import { personFormSchema } from "./form-schema";

type PersonFormData = z.infer<typeof personFormSchema>;

export default function ExampleUsage() {
  const addUser = async (data: PersonFormData) => {
    // Server action to add user
    console.log('Adding user:', data)
  }

  const editUser = async (data: PersonFormData) => {
    // Server action to edit user
    console.log('Editing user:', data)
  }

  const existingUser = { firstname: "John", lastname: "Doe" }

  return (
      <div>
        <div className="space-y-4">
          <GenericDialog
            FormComponent={PersonForm}
            addAction={addUser}
            editAction={editUser}
          />
          <GenericDialog
            FormComponent={PersonForm}
            object={existingUser}
            addAction={addUser}
            editAction={editUser}
          />
        </div>
        <div>
          <PersonTabel />
        </div>
      </div>
    )
}
