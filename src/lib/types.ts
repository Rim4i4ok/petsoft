import { Pet } from "@prisma/client";

export type PetEssentials = Omit<Pet, "id" | "updatedAt" | "createdAt">;
export type PetId = Pet["id"];
