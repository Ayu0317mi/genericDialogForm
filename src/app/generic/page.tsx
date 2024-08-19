"use client";

import { useState, useEffect } from 'react';
import GenericModal from '@/app/generic/GenericModal';
import { PersonForm } from '@/app/generic/PersonForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Person } from '@/lib/model'; // Ensure this import matches your model path
import { getPerson, createPerson, updatePerson } from './generic-actions'; // Update with actual path to your server actions

export default function ExperimentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    // Fetch initial persons
    async function fetchPersons() {
      const data = await getPerson();
      if (data) {
        setPersons(data);
      }
    }
    fetchPersons();
  }, []);

  const handleOpenModal = (person?: Person) => {
    setSelectedPerson(person || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPerson(null);
  };

  const handleSavePerson = async (person: Person) => {
    if (selectedPerson) {
      // Update existing person
      const updatedPerson = await updatePerson(person);
      setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p));
    } else {
      // Add new person
      const newPerson = await createPerson(person);
      setPersons([...persons, newPerson]);
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
        <PersonForm person={selectedPerson} onSave={handleSavePerson} onClose={handleCloseModal} />
      </GenericModal>
    </div>
  );
}
