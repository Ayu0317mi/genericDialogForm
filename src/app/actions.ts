"use server"

//import { Person } from '@/lib/model';

import { PrismaClient, Person as PrismaPerson } from '@prisma/client';

const prisma = new PrismaClient();
import { revalidatePath } from 'next/cache';
import { logger } from '@/lib/logger';

const validation_path: string = "/people";

 async function getPeople(): Promise<PrismaPerson[]> {
    logger.debug('Fetching persons');
    return await prisma.person.findMany();
}

 async function createPerson(person: PrismaPerson): Promise<PrismaPerson> {
    //return null;
    //throw new Error('Simulated error during person creation');
    const newPerson = await prisma.person.create({
        data: {
            firstname: person.firstname,
            lastname: person.lastname,
            phone: person.phone,
            dob: person.dob,
          },
    });
    logger.debug({ newPerson }, 'Created a new person');
    console.log(newPerson);
    revalidatePath(validation_path);
    return newPerson;
}

 async function updatePerson(person: PrismaPerson): Promise<PrismaPerson> {
    //throw new Error('Simulated error during person creation');
    const updatedPerson = await prisma.person.update({
        where: { id: person.id },
        data: person,
    });
    logger.debug({ updatedPerson }, 'Updated person');
    revalidatePath(validation_path);
    return updatedPerson;
}

  async function deletePerson(formData: FormData): Promise<void> {
    const id = parseInt(formData.get("id") as string, 10);
    await prisma.person.delete({
        where: { id },
    });
    logger.debug({ id }, 'Deleted person');
    revalidatePath(validation_path);
}

export { getPeople, createPerson, updatePerson, deletePerson };