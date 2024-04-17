import Logo from "./logo";

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];

function AppHeader() {
  return (
    <section>
      <Logo />
    </section>
  );
}

export default AppHeader;
