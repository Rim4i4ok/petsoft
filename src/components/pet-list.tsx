import Image from "next/image";

function PetList() {
  return (
    <ul className="border-b border-black/[0.08] bg-white">
      <li>
        <button className="flex h-[70px] w-full cursor-pointer items-center gap-3 bg-white px-5 text-base transition hover:bg-[#EFF1F2] focus:bg-[#EFF1F2]">
          <Image
            className="object-covers rounded-full"
            src="https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"
            alt="Pet image"
            width={45}
            height={45}
          />
          <p className="font-semibold">Seri</p>
        </button>
      </li>
    </ul>
  );
}

export default PetList;
