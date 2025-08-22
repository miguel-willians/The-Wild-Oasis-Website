import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}): Promise<Metadata> {
  const { cabinId } = await params;
  const { name } = await getCabin(Number(cabinId));
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const { cabinId } = await params;

  const cabin = await getCabin(Number(cabinId));

  if (!cabin) notFound();

  const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto md:mt-8 md:px-4">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-8 md:mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
