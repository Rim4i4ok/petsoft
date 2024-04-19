"use client";

import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import Image from "next/image";

function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex h-full w-full flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <MainInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

export default PetDetails;

type Props = {
  pet: Pet;
};

const EmptyView = () => (
  <p className="flex h-full items-center justify-center text-2xl font-medium">
    No pet selected
  </p>
);

const TopBar = ({ pet }: Props) => (
  <div className="border-light flex items-center border-b bg-white px-8 py-5">
    <Image
      src={pet.imageUrl}
      alt="Selected pet image"
      height={75}
      width={75}
      className="h-[75px] w-[75px] rounded-full object-cover"
    />

    <h2 className="ml-5 text-3xl font-semibold leading-7">{pet.name}</h2>
  </div>
);

const MainInfo = ({ pet }: Props) => (
  <div className="flex justify-around px-5 py-10 text-center">
    <div>
      <h3 className="text-[13px] font-medium uppercase text-zinc-700">
        Owner name
      </h3>
      <p className="mt-1 text-lg text-zinc-800">{pet.ownerName}</p>
    </div>

    <div>
      <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
      <p className="mt-1 text-lg text-zinc-800">{pet.age}</p>
    </div>
  </div>
);

const Notes = ({ pet }: Props) => (
  <section className="border-light mx-8 mb-9 flex-1 rounded-md border bg-white px-7 py-5">
    {pet.notes}
  </section>
);
