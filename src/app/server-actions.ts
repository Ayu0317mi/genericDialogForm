//src/app/generic-actions.ts
"use server"

import { Person } from '@/lib/model';
import { z } from "zod";
import { personFormSchema } from "./form-schema";
import { revalidatePath } from 'next/cache'; 
import { ActionState } from '@/lib/action-state';
const validation_path: string = "/";
export type PersonFormData = z.infer<typeof personFormSchema>;
import { OptionType } from '@/lib/autocomplete-type';

const mockData: Person[] = [
    { id: 1, firstname: "John", lastname: "Doe", phone: "1234567890", stateName: "Queensland", cityName: "Brisbane", role: "Admin" },
    { id: 2, firstname: "Jane", lastname: "Smith", phone: "2345678901", stateName: "New South Wales", cityName: "Sydney", role: "User" },
    { id: 3, firstname: "Bob", lastname: "Brown", phone: "3456789012", stateName: "New South Wales", cityName: "Sydney", role: "VIP" },
];

//Get all Data
export async function getPerson(): Promise<Person[]> {
    return mockData;
}

//Add new Data
export async function addUser(data: PersonFormData): Promise<ActionState> {    
    let newId = Math.floor(Math.random() * 1000);
    while (mockData.some(p => p.id === newId)) {
        newId = Math.floor(Math.random() * 1000);
    }

    // Create a new Person object with the generated ID
    const newPerson: Person = { id: newId, ...data,};

    // Add the new person to the mockData array
    mockData.push(newPerson);

    revalidatePath(validation_path);
    const actionState: ActionState = {
        success: true,
        message: 'Data added successfully',
        data: newPerson,
    };
    return actionState;
};

export async function editUser(data: PersonFormData): Promise<ActionState> {
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
    const actionState: ActionState = {
        success: true,
        message: 'Data edited successfully',
        data: mockData[index],
    };
    return actionState;
};

// AutoComplete function
const defaultValues = {
    states: [
        'Queensland',
        'New South Wales',
        'ACT',
        'Victoria',
        'Western Australia',
        // Add more states here...
    ],
    cities: [
        'Brisbane',
        'Sydney',
        'Melbourne',
        'Perth',
        'Adelaide',
        // Add more cities here...
    ],
    roles: [
        'Admin',
        'Regular',
        'User',
        'Guest',
        'VIP',
        // Add more roles here...
    ],
};


// Generalized function to load and search autocomplete options
export async function loadInputValue(type: keyof typeof defaultValues, inputValue: string): Promise<OptionType[]> {
    if (inputValue.length < 1) return [];

    // Perform the search within the load function
    const items = defaultValues[type];
    const results = items
        .filter((item) => item.toLowerCase().startsWith(inputValue.toLowerCase()))
        .slice(0, 5);

    // Format the results for autocomplete
    const formattedResults = results.map((item) => ({ label: item, value: item }));

    // If no matches found, suggest adding the new input
    if (formattedResults.length === 0) {
        formattedResults.push({
            label: `Add "${inputValue}"`,
            value: inputValue,
            isNew: true,
        } as OptionType);
    }

    return formattedResults;
}


// Generalized function to add options
export async function addInputValue(type: keyof typeof defaultValues, newLocation: string) {
    console.log(`Adding new ${type}: ${newLocation}`);
    defaultValues[type].push(newLocation);
}