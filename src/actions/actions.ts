"use server";

import { PetWithoutId } from "@/contexts/pet-context-provider";
import prisma from "@/lib/db";

export async function addPet(pet: PetWithoutId) {
  await prisma.pet.create({
    data: pet,
  });
}
