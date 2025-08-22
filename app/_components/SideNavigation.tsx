"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav
      role="navigation"
      aria-label="Account navigation"
      className="
        fixed bottom-0 left-0 w-full z-50
        bg-primary-950 border-t border-primary-800
        md:static md:w-auto md:z-auto md:bg-transparent md:border-none
      "
    >
      <ul className="flex md:flex-col gap-2 text-lg justify-around md:justify-start px-2 md:px-0 py-1 md:py-0">
        {navLinks.map((link) => (
          <li key={link.name} className="flex-1 md:flex-none">
            <Link
              href={link.href}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-4 py-2 px-3 md:py-3 md:px-5 font-semibold text-primary-200 hover:bg-primary-900 hover:text-primary-100 transition-colors ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
            >
              {link.icon}
              <span className="text-xs md:text-base md:inline">
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
