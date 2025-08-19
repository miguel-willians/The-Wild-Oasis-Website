import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "./TextExpander";
import Image from "next/image";
import { Cabin as CabinType } from "../_types/types";

interface CabinProps {
  cabin: CabinType;
}

export default function Cabin({ cabin }: CabinProps) {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-8 md:gap-20 border border-primary-800 py-3 px-4 md:px-10 mb-24">
      <div className="relative w-full aspect-[4/3] md:aspect-square md:scale-[1.15] md:-translate-x-3">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="text-3xl md:text-7xl font-black mb-5 md:translate-x-[-254px] bg-primary-950 p-4 md:p-6 pb-1 md:w-[150%]">
          <span className="text-accent-100">Cabin {name}</span>
        </h3>

        <p className="text-base md:text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base md:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base md:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base md:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
