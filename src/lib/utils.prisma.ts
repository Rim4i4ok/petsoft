import "server-only";
import prisma from "./db";
import { PetId, UserEmail, UserHashedPassword, UserId } from "./types";
import { TPetForm } from "./validations";

// Pet functions

export async function getPetById(petId: PetId) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
    select: {
      userId: true,
    },
  });

  return pet;
}

export async function getPetsByUserId(userId: UserId) {
  const pets = await prisma.pet.findMany({
    where: { userId },
  });

  return pets;
}

export async function addNewPet(newPetData: TPetForm, userId: UserId) {
  await prisma.pet.create({
    data: {
      ...newPetData,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function updatePetById(petId: PetId, newPetData: TPetForm) {
  await prisma.pet.update({
    where: {
      id: petId,
    },
    data: newPetData,
  });
}

export async function deletePetById(petId: PetId) {
  await prisma.pet.delete({
    where: {
      id: petId,
    },
  });
}

// User functions

export async function addNewUser(
  email: UserEmail,
  hashedPassword: UserHashedPassword,
) {
  await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  });
}

export async function getUserByEmail(email: UserEmail) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function updateUserAccess(email: UserEmail) {
  await prisma.user.update({
    where: { email },
    data: {
      hasAccess: true,
    },
  });
}
