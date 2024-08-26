'use server';

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GenericDialog from "./GenericDialog";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
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
        <div>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PersonTable;
