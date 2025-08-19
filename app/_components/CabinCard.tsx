import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Cabin } from "../_types/types";

interface CabinCardProps {
  cabin: Cabin;
}

export default function CabinCard({ cabin }: CabinCardProps) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col md:flex-row border-primary-800 border">
      <div className="relative w-full aspect-[4/3] md:aspect-square md:flex-1">
        <Image
          fill
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover border-b md:border-b-0 md:border-r border-primary-800"
        />
      </div>

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-6 md:px-7 bg-primary-950">
          <h3 className="text-lg md:text-2xl text-accent-500 font-semibold mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-base md:text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline flex-wrap">
            {discount > 0 ? (
              <>
                <span className="text-2xl md:text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl md:text-3xl font-[350]">
                ${regularPrice}
              </span>
            )}
            <span className="text-primary-200 text-sm md:text-base">
              / night
            </span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="w-full border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
