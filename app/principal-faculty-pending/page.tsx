import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import PrincipalFacultyPendingPage from "@/components/PrincipalDashboard/facultyRequestPending";

export const metadata: Metadata = {
  title: "Principal Dashboard | Leave Management Loyola",
  description: "This page is for Mentor Dashboard",
};

const PrincipalFacultyPendingDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Pending Faculty Leave Requests"
        description="View your Faculty applied leave requests and Please approve/reject them."
      />
      <PrincipalFacultyPendingPage />
    </>
  );
};

export default PrincipalFacultyPendingDashboard;
