import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import VicePrincipalFacultyPendingPage from "@/components/VPDashboard/facultyRequestPending";

export const metadata: Metadata = {
  title: "Vice Principal Dashboard | Leave Management Loyola",
  description: "This page is for Vice Principal Dashboard",
};

const VicePrincipalFacultyPending = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Faculty Pending Leave Requests"
        description="View your Faculty applied leave requests and Please approve/reject them."
      />
      <VicePrincipalFacultyPendingPage />
    </>
  );
};

export default VicePrincipalFacultyPending;
