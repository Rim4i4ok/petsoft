import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import Stats from "@/components/stats";

function Page() {
  return (
    <main>
      <div className="flex items-center justify-between py-8 text-white">
        <Branding />

        <Stats />
      </div>

      <div className="grid h-[600px] grid-cols-3 grid-rows-[45px_1fr] gap-4">
        <div className="col-span-1 col-start-1 row-span-1 row-start-1">
          <SearchForm />
        </div>

        <div className="col-span-1 col-start-1 row-span-full row-start-2">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>

        <div className="col-span-full col-start-2 row-span-full row-start-1">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}

export default Page;
