import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import HODHomeComponent from "@/components/HODDashboard";

export const metadata: Metadata = {
  title: "HOD Dashboard | Leave Management Portal",
  description: "This is Department HoD Dashboard Page",
  // other metadata
};

const HODDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="Dashboard"
        description="Hi HoD, Check your Branch Student and Faculty Members leave Requests."
      />
      <HODHomeComponent />
    </>
  );
};

export default HODDashboard;
