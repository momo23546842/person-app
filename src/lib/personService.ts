// src/lib/personService.ts
import { prisma } from "./prisma";  

export async function createPerson(data: { name: string; age: number; email: string }) {
  return prisma.person.create({ data });
}

export async function getPerson(id: number) {
  return prisma.person.findUnique({ where: { id } });
}

export async function listPersons() {
  return prisma.person.findMany({
    orderBy: { id: "asc" },
  });
}

export async function updatePerson(
  id: number,
  data: { name?: string; age?: number; email?: string }
) {
  return prisma.person.update({
    where: { id },
    data,
  });
}

export async function deletePerson(id: number) {
  return prisma.person.delete({
    where: { id },
  });
}

