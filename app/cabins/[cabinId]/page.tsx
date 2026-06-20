import { getCabin } from "@/app/_lib/data-service";
import {
  EyeSlashIcon,
  MapPinIcon,
  UsersIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  if (!cabin) {
    return { title: "Not found" };
  }

  return { title: `Cabin ${cabin.name}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  if (!cabin) {
    notFound();
  }

  const { image, name, maxCapacity, regularPrice, discount, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={image}
            fill
            className="object-cover"
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <BanknotesIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Price:{" "}
                {discount > 0 ? (
                  <>
                    <span className="font-bold text-accent-400">
                      ${regularPrice - discount}
                    </span>
                    <span className="line-through text-primary-500 text-sm ml-2">
                      ${regularPrice}
                    </span>
                    <span className="ml-2 bg-red-900/60 text-red-200 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide border border-red-800">
                      Save ${discount}!
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-accent-400">
                    ${regularPrice}
                  </span>
                )}
                <span className="text-primary-300"> / night</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
