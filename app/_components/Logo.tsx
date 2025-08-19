import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-4 z-10">
      <Image
        src={logo}
        height={50}
        width={50}
        alt="The Wild Oasis logo"
        quality={100}
      />
      <span className="text-lg sm:text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}
