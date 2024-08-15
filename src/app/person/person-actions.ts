//   /app/person/person-actions.ts

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
    return { ...person, id: Math.floor(Math.random() * 1000) };
}

export async function updatePerson(person: Person): Promise<Person> {
    return person;
}