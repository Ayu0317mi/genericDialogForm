'use client';

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import GenericDialog from "./GenericDialog"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { getPerson } from "./generic-actions";
import { useState, useEffect } from "react";
import PersonForm from "./person-form";
import { personFormSchema } from "./form-schema";

interface Person {
    id: number;
    firstname: string;
    lastname: string;
  }
  
  const PersonTable = () => {
    const [persons, setPersons] = useState<Person[]>([]);
  
    useEffect(() => {
      getPerson().then((data) => {
        if (data) {
          setPersons(data);
        }
      });
    }, []);
  
    const mockData: Person[] = [];
  
    const addPersonToMockData = (person: Person) => {
      mockData.push(person);
      setPersons([...mockData]);
    };
  
    // Example usage of addPersonToMockData
    const handleAddPerson = () => {
      const newPerson: Person = { id: 1, firstname: 'John', lastname: 'Doe' };
      addPersonToMockData(newPerson);
    };
    
    return (
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
    );
    }

    export default PersonTable;