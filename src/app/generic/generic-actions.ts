// server actions to create and update a person 
// for now, we will have simple stubs that will return the same person object that was passed in
// and for create, it will just inject a random id into the person object

"use server"

import { Person } from '@/lib/model';

// create a function that returns mockData array getPersons function


const mockData: Person[] = [
    { id: 1, firstname: "John", lastname: "Doe", phone: "1234567890" },
    { id: 2, firstname: "Jane", lastname: "Smith", phone: "2345678901" },
    { id: 3, firstname: "Bob", lastname: "Brown", phone: "3456789012" },

]

export async function getPersons(): Promise<Person[]> {
    return mockData;
}


export async function createPerson(person: Person): Promise<Person> {
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
}