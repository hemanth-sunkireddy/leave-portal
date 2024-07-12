import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import PrincipalStudentPendingPage from "@/components/PrincipalDashboard/studentRequestPending";

export const metadata: Metadata = {
  title: "Principal Dashboard | Leave Management Loyola",
  description: "This page is for Mentor Dashboard",
};

const PrincipalStudentPendingDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Student Pending Leave Requests"
        description="View your Students applied leave requests and Please approve/reject them."
      />
      <PrincipalStudentPendingPage />
    </>
  );
};

export default PrincipalStudentPendingDashboard;
