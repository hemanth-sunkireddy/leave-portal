"use client";
import { Features } from "@/types/dashboard";
import Image from "next/image";
import Link from "next/link";
const SingleFeature = ({ feature }: { feature: Features }) => {

  const { title, image, paragraph, detail, redirectLink } = feature;
  return (
    <>
      <div
        className="wow m-5 fadeInUp hover:shadow-two dark:hover:shadow-gray-dark group relative overflow-hidden rounded-sm bg-neutral-300 shadow-one duration-300 dark:bg-dark"
        data-wow-delay=".1s"
      >
        <Link
          href={`/${redirectLink}`}
          className="relative block aspect-[37/22] w-full"
        >
          <Image src={image} alt="image" fill />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href={`/${redirectLink}`}
              className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            {paragraph}
          </p>
          <div className="flex items-center">
            <Link href={`${redirectLink}`}
              className="inline-block py-2 px-4 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md transition duration-300">
              {detail}
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default SingleFeature;
