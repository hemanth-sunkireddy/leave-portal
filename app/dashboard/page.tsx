import SingleFeature from "@/components/Dashboard/singleFeature";
import featureData from "@/components/Dashboard/studentFeatures";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Leave Management Portal",
  description: "This is Dashboard Page",
  // other metadata
};

const Dashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="Dashboard"
        description="Welcome student, Click below to apply leave or see past requests."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center bg-slate-100 dark:bg-purple-300">
            {featureData.map((feature) => (
              <div
                key={feature.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleFeature feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
