import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import StudentPageLeaves from "@/components/HODDashboard/studentRequest";

export const metadata: Metadata = {
  title: "HoD Dashboard | Leave Management Loyola",
  description: "This page is for HoD Dashboard",
};

const PrincipalStudentDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Student Leave Requests"
        description="View your Students applied leave requests and Please approve/reject them."
      />
      <StudentPageLeaves />
    </>
  );
};

export default PrincipalStudentDashboard;
