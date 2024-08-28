"use server"

import { Person } from '@/lib/model';
import { z } from "zod";
import { personFormSchema } from "./form-schema";
import { revalidatePath } from 'next/cache'; 

const mockData: Person[] = [
    { id: 1, firstname: "John", lastname: "Doe", phone: "1234567890"},
    { id: 2, firstname: "Jane", lastname: "Smith", phone: "2345678901"},
    { id: 3, firstname: "Bob", lastname: "Brown", phone: "3456789012"},
];

const validation_path: string = "/";

export async function getPerson(): Promise<Person[] | null> {
    return mockData;
}

export type PersonFormData = z.infer<typeof personFormSchema>;

export const addUser = async (data: PersonFormData): Promise<void> =>{
    let newId = Math.floor(Math.random() * 1000);
    while (mockData.some(p => p.id === newId)) {
        newId = Math.floor(Math.random() * 1000);
    }

    // Create a new Person object with the generated ID
    const newPerson: Person = { id: newId, ...data };

    // Add the new person to the mockData array
    mockData.push(newPerson);

    revalidatePath(validation_path);
};

export const editUser = async (data: PersonFormData): Promise<void> =>{
    // Logic to edit user in the database
    const index = mockData.findIndex(p => p.id === data.id);

    if (index === -1) {
        throw new Error(`Person with ID ${data.id} not found`);
    }

    // Ensure `id` is defined
    if (data.id === undefined) {
        throw new Error('ID is required for editing a user');
    }

    // Update the person in the mockData array
    mockData[index] = { ...mockData[index], ...data };

    // Revalidate the path to ensure the data is up-to-date
    revalidatePath(validation_path);
};