import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import StudentPendingPage from "@/components/HODDashboard/studentRequestPending";

export const metadata: Metadata = {
  title: "HoD Dashboard | Leave Management Loyola",
  description: "This page is for HoD Dashboard",
};

const PrincipalStudentPendingDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Student Pending Leave Requests"
        description="View your Students applied leave requests and Please approve/reject them."
      />
      <StudentPendingPage />
    </>
  );
};

export default PrincipalStudentPendingDashboard;
