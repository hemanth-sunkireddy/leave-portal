import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import WardenStudentPage from "@/components/WardenStudentDashboard";

export const metadata: Metadata = {
  title: "Warden Dashboard | Leave Management Loyola",
  description: "This page is for Warden Dashboard",
};

const WardenStudentDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="Hi Warden"
        description="View your Students applied leave requests for less than 2 days and Please approve/reject them."
      />
      <WardenStudentPage />
    </>
  );
};

export default WardenStudentDashboard;
