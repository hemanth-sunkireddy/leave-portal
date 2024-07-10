import SingleFeature from "@/components/Dashboard/singleFeature";
import featureData from "@/components/Dashboard/studentFeatures";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import HomeComponent from "@/components/Dashboard";

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
        description="Hi Student, Click below to apply leave or see past requests."
      />
      <HomeComponent />
    </>
  );
};

export default Dashboard;
