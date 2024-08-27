"use server"

import { Person } from '@/lib/model';
import { z } from "zod";
import { personFormSchema } from "./form-schema";

const mockData: Person[] = [
    { id: 1, firstname: "John", lastname: "Doe", phone: "1234567890", dob: new Date() },
    { id: 2, firstname: "Jane", lastname: "Smith", phone: "2345678901", dob: new Date() },
    { id: 3, firstname: "Bob", lastname: "Brown", phone: "3456789012", dob: new Date() },
];

export async function getPerson(): Promise<Person[] | null> {
    return mockData;
}

export type PersonFormData = z.infer<typeof personFormSchema>;

export const addUser = async (data: PersonFormData): Promise<void> =>{
    'use server';
    console.log('Adding user:', data);
    // Logic to add user to the database
    // Generate a unique ID
    let newId = Math.floor(Math.random() * 1000);
    while (mockData.some(p => p.id === newId)) {
        newId = Math.floor(Math.random() * 1000);
    }

    // Create a new Person object with the generated ID and default dob
    const newPerson: Person = { ...data, id: newId, dob: new Date() };

    // Add the new person to the mockData array
    mockData.push(newPerson);
    console.log('User added:', newPerson);
};

export const editUser = async (data: PersonFormData): Promise<void> =>{
    'use server';
    console.log('Editing user:', data);
    // Logic to edit user in the database
    const index = mockData.findIndex(p => p.id === data.id);

    if (index === -1) {
        throw new Error(`Person with ID ${data.id} not found`);
    }

    // Ensure `id` is defined
    if (data.id === undefined) {
        throw new Error('ID is required for editing a user');
    }

    const updatedPerson: Person = { ...data, id: data.id, dob: new Date() };

    mockData[index] = updatedPerson;

    console.log('User edited:', updatedPerson);
};


//original functions created by v0
/*export async function createPerson(person: Person): Promise<Person> {
    // Generate a unique ID
    let newId = Math.floor(Math.random() * 1000);
    
    // Ensure the ID is unique by checking against existing IDs
    while (mockData.some(p => p.id === newId)) {
        newId = Math.floor(Math.random() * 1000);
    }

    // Create a new Person object with the generated ID
    const newPerson = { ...person, id: newId };

    // Add the new person to the mockData array
    mockData.push(newPerson);

    return newPerson;
}

export async function updatePerson(person: Person): Promise<Person> {
    // Find the index of the person in the mockData array
    const index = mockData.findIndex(p => p.id === person.id);

    if (index === -1) {
        throw new Error(`Person with ID ${person.id} not found`);
    }

    // Update the person at the found index
    mockData[index] = person;

    return person;
}*/