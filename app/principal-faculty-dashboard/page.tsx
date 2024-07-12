import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import PrincipalFacultyPage from "@/components/PrincipalDashboard/facultyRequest";

export const metadata: Metadata = {
  title: "Principal Dashboard | Leave Management Loyola",
  description: "This page is for Mentor Dashboard",
};

const PrincipalFacultyDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Faculty Leave Requests"
        description="View your Faculty completed applied leave requests and approved/rejected by you."
      />
      <PrincipalFacultyPage />
    </>
  );
};

export default PrincipalFacultyDashboard;
