"use client";

import { useState } from 'react';
import GenericModal from '@/app/generic/GenericModal';
import { PersonForm } from '@/app/generic/PersonForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ExperimentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [persons, setPersons] = useState<Person[]>([
    { id: 1, firstname: "John", lastname: "Doe", phone: "1234567890" },
    { id: 2, firstname: "Jane", lastname: "Smith", phone: "2345678901" },
    { id: 3, firstname: "Bob", lastname: "Brown", phone: "3456789012" },
    { id: 4, firstname: "Ayumi", lastname: "Nuguroho", phone: "3456789012" },
  ]);

  interface PersonType {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
  }
  
  let person: PersonType | null = null;
  const [selectedPerson, setSelectedPerson] = useState<PersonType | null>(person);

  interface Person {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
  }

  const handleOpenModal = (person?: Person) => {
    setSelectedPerson(person || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPerson(null);
  };

  const handleSavePerson = (person: Person) => {
    if (selectedPerson) {
      // Update existing person
      setPersons(persons.map(p => p.id === person.id ? person : p));
    } else {
      // Add new person
      setPersons([...persons, { ...person, id: Math.floor(Math.random() * 1000) }]);
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Experiment with Generic Modal and Person Form</h1>
      
      {/* Button to open the modal */}
      <Button onClick={() => handleOpenModal()}>Add Person</Button>

      {/* Display the list of persons */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        {persons.map(person => (
          <Card key={person.id} className="shadow">
            <CardHeader>
              <CardTitle>{person.firstname} {person.lastname}</CardTitle>
              <CardDescription>{person.phone}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => handleOpenModal(person)}>Edit</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* The generic modal that wraps around the PersonForm */}
      <GenericModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Person Form"
        description="Fill out the form below to add or edit a person."
        onClose={handleCloseModal}
      >
        {/* The PersonForm goes inside the GenericModal */}
        <PersonForm person={selectedPerson} onClose={handleCloseModal} />
      </GenericModal>
    </div>
  );
}
