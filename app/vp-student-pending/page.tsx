import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import VicePrincipalStudentPendingPage from "@/components/VPDashboard/studentRequestPending";

export const metadata: Metadata = {
  title: "Vice Principal Dashboard | Leave Management Loyola",
  description: "This page is for Vice Principal Dashboard",
};

const VicePrincipalStudentPending = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Student Pending Leave Requests"
        description="View your Students applied leave requests and Please approve/reject them."
      />
      <VicePrincipalStudentPendingPage />
    </>
  );
};

export default VicePrincipalStudentPending;
