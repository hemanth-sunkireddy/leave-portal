import SingleFeature from "@/components/Dashboard/singleFeature";
import featureData from "@/components/Dashboard/studentFeatures";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import HomeComponent from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "Faculty Dashboard | Leave Management Portal",
  description: "This is Faculty Dashboard Page",
  // other metadata
};

const FacultyDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="Dashboard"
        description="Hi Faculty, Click below to apply leave or see past requests."
      />
      <HomeComponent />
    </>
  );
};

export default FacultyDashboard;
