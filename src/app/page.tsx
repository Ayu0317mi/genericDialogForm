'use server';
import React from 'react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { deletePerson, getPeople } from "./actions";
import { Person } from '@/lib/model';
import { PersonForm } from './person-form';
import { DeletePersonForm} from './person-deletealert';


const PersonPage: React.FC = async() => {
    const people: Person[] = await getPeople() as Person[];

    return (
        <div className="flex justify-center mt-8 px-4">
            <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
                <CardHeader >
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold">Person List</h3>
                        <PersonForm person={undefined} />
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">First name</TableHead>
                                <TableHead className="text-left">Last name</TableHead>
                                <TableHead className="text-left">Phone</TableHead>
                                <TableHead className="text-left">Date of Birth</TableHead>
                                <TableHead className="text-left">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {people.map((person) => (
                                <TableRow key={person.id} className="hover:bg-gray-100">
                                    <TableCell>{person.firstname}</TableCell>
                                    <TableCell>{person.lastname}</TableCell>
                                    <TableCell>{person.phone}</TableCell>
                                    <TableCell>{person.dob.toString()}</TableCell>
                                    <TableCell className="flex space-x-2">
                                        <PersonForm person={person} /> {/* Edit Form*/}
                                        <DeletePersonForm person={person} /> {/* Delete Form*/}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default PersonPage;