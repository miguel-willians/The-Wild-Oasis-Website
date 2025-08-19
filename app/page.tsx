import Image from "next/image";
import bg from "@/public/bg.png";
import Link from "next/link";

export default function Page() {
  return (
    <div className="mt-24">
      <Image
        src={bg}
        alt="Mountains and forests with two cabins"
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
      />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary-50 mb-6 sm:mb-10 tracking-tight font-normal leading-tight">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 text-sm sm:text-base md:text-lg text-primary-800 font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </div>
  );
}
