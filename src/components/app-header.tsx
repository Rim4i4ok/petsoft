import Link from "next/link";
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
    <section className="flex items-center justify-between border-b border-white/10 py-2">
      <Logo />

      <nav>
        <ul className="flex gap-2 text-xs">
          {routes.map((route) => (
            <li key={route.path}>
              <Link href={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default AppHeader;
