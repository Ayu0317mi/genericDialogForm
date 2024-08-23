'use client';

import React, { useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
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
import { PersonForm } from "./person-form";
import { Person } from "../../lib/model";

const mockData: Person[] = [
    { id: 1, firstname: "John", lastname: "Doe", phone: "1234567890", dob: new Date() },
    { id: 2, firstname: "Jane", lastname: "Smith", phone: "2345678901", dob: new Date() },
    { id: 3, firstname: "Bob", lastname: "Brown", phone: "3456789012", dob: new Date() },
];

const PersonPage: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>(mockData);

    const handleSavePerson = (savedPerson: Person) => {
        setPersons((prevPersons) => {
            const existingPersonIndex = prevPersons.findIndex(person => person.id === savedPerson.id);
            if (existingPersonIndex !== -1) {
                // Update existing person
                const updatedPersons = [...prevPersons];
                updatedPersons[existingPersonIndex] = savedPerson;
                return updatedPersons;
            } else {
                // Add new person
                return [...prevPersons, { ...savedPerson, id: prevPersons.length + 1 }];
            }
        });
    };

    const columns: ColumnDef<Person>[] = [
        { accessorKey: "firstname", header: "First Name" },
        { accessorKey: "lastname", header: "Last Name" },
        { accessorKey: "phone", header: "Phone" },
        {
            id: "actions",
            cell: ({ row }) => {
                const person = row.original;
                return (
                    <PersonForm person={person} onSave={handleSavePerson} />
                );
            },
        },
    ];

    const table = useReactTable({
        data: persons,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-4">
                <PersonForm onSave={handleSavePerson} />
            </div>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <h3>Person List</h3>
                    </div>
                </CardHeader>
                <CardContent className="px-8">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
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