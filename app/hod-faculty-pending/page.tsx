import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import FacultyPendingPage from "@/components/HODDashboard/facultyRequestPending";

export const metadata: Metadata = {
  title: "HoD Dashboard | Leave Management Loyola",
  description: "This page is for HoD Dashboard",
};

const HoDFacultyPendingDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Pending Faculty Leave Requests"
        description="View your Faculty applied leave requests and Please approve/reject them."
      />
      <FacultyPendingPage />
    </>
  );
};

export default HoDFacultyPendingDashboard;
