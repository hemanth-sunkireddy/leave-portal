import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import HODFacultyPage from "@/components/HODDashboard/facultyRequest";

export const metadata: Metadata = {
  title: "HoD Dashboard | Leave Management Loyola",
  description: "This page is for HoD Dashboard",
};

const HoDFacultyDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Faculty Leave Requests"
        description="View your Faculty completed applied leave requests and approved/rejected by you."
      />
      <HODFacultyPage />
    </>
  );
};

export default HoDFacultyDashboard;
