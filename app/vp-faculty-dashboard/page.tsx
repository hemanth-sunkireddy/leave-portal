import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import VicePrincipalFacultyPage from "@/components/VPDashboard/facultyRequest";

export const metadata: Metadata = {
  title: "Vice Principal Dashboard | Leave Management Loyola",
  description: "This page is for Vice Principal Dashboard",
};

const VicePrincipalFacultyDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Faculty Completed Leave Requests"
        description="View your Faculty applied leave requests and approved/rejected."
      />
      <VicePrincipalFacultyPage />
    </>
  );
};

export default VicePrincipalFacultyDashboard;
