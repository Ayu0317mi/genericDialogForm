// src/app/person-table.tsx
'use server';

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table";
import PersonForm from "./person-form";
import { addUser, editUser, loadInputValue } from "./server-actions";
import { Person } from '@/lib/model';

interface PersonTableProps {
    persons: Person[];
}

const PersonTable = ({ persons }: PersonTableProps) => {
    return (
        <div className="justify-center mt-8 px-4">
            <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold">Person List</h3>
                        <PersonForm addAction={addUser} editAction={editUser} loadOptions={loadInputValue} />
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">First name</TableHead>
                                <TableHead className="text-left">Last name</TableHead>
                                <TableHead className="text-left">Phone Number</TableHead>
                                <TableHead className="text-left">State</TableHead>
                                <TableHead className="text-left">City</TableHead>
                                <TableHead className="text-left">Role</TableHead>
                                <TableHead className="text-left">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {persons.map((person) => (
                                <TableRow key={person.id}>
                                    <TableCell>{person.firstname}</TableCell>
                                    <TableCell>{person.lastname}</TableCell>
                                    <TableCell>{person.phone}</TableCell>
                                    <TableCell>{person.stateName}</TableCell>
                                    <TableCell>{person.cityName}</TableCell> 
                                    <TableCell>{person.role}</TableCell>   
                                    <TableCell>
                                    <PersonForm 
                                            object={person}
                                            addAction={addUser} 
                                            editAction={editUser} 
                                            loadOptions={loadInputValue}
                                        />
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

export default PersonTable;
