import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundPattern />

      <div className="mx-auto max-w-[1050px]">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
}

export default Layout;
