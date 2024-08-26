'use client';

import { z } from "zod";
import GenericDialog from "./GenericDialog";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getPerson } from "./generic-actions";
import PersonForm from "./person-form";
import { personFormSchema } from "./form-schema";

type PersonFormData = z.infer<typeof personFormSchema>;

interface Person {
    id: number;
    firstname: string;
    lastname: string;
}

interface PersonTableProps {
    persons: Person[];
}

const PersonTable = ({ persons }: PersonTableProps) => {
    const addUser = async (data: PersonFormData) => {
        console.log('Adding user:', data);
    };

    const editUser = async (data: PersonFormData) => {
        // Server action to edit user
        console.log('Editing user:', data);
    };

    const existingUser = { firstname: "John", lastname: "Doe" };

    return (
        <div className="justify-center mt-8 px-4">
            <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold">Person List</h3>
                        <GenericDialog
                            FormComponent={PersonForm}
                            addAction={addUser}
                            editAction={editUser}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell>{person.firstname}</TableCell>
                                <TableCell>{person.lastname}</TableCell>

                                <GenericDialog
                                    FormComponent={PersonForm}
                                    object={existingUser}
                                    addAction={addUser}
                                    editAction={editUser}
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default PersonTable;
