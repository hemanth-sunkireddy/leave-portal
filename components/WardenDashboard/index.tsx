"use client";
import WardenSingleFeature from "./singleFeature";
import featureData from "./wardenFeatures";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";


const WardenHomeComponent = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    setId(searchParams.get('userid'));
  }, [searchParams]);

  return (
    <section className="pb-[120px] pt-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center bg-slate-100 dark:bg-purple-300">
          {featureData.map((feature) => (
            <div
              key={feature.id}
              className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
            >
              <WardenSingleFeature feature={feature} id={id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WardenHomeComponent;
