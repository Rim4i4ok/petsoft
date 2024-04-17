import Branding from "@/components/branding";
import Stats from "@/components/stats";

function Page() {
  return (
    <main>
      <div className="flex items-center justify-between py-8 text-white">
        <Branding />

        <Stats />
      </div>
    </main>
  );
}

export default Page;
