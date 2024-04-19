"use client";

import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
};

export const PetContext = createContext<TPetContext | null>(null);

function PetContextProvider({ data, children }: PetContextProviderProps) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, seSelectedPetId] = useState(null);

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;
