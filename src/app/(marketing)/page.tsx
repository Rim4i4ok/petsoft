import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#5DC9A8]">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview of PetSoft"
        width={519}
        height={472}
      />
    </main>
  );
}
