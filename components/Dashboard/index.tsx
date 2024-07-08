import SingleFeature from "./singleFeature";
import featureData from "./studentFeatures";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Blog = () => {
  
  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {featureData.map((feature) => (
            <div key={feature.id} className="w-full">
              <SingleFeature feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
