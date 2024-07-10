import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import FacultyHomeComponent from "@/components/FacultyDashboard";

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
      <FacultyHomeComponent />
    </>
  );
};

export default FacultyDashboard;
