import { Pet, User } from "@prisma/client";

export type PetEssentials = Omit<
  Pet,
  "id" | "updatedAt" | "createdAt" | "userId"
>;
export type PetId = Pet["id"];
export type UserId = User["id"];
export type UserEmail = User["email"];
export type UserHashedPassword = User["hashedPassword"];
