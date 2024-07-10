import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import PrincipalStudentPage from "@/components/PrincipalDashboard/studentRequest";

export const metadata: Metadata = {
  title: "Principal Dashboard | Leave Management Loyola",
  description: "This page is for Mentor Dashboard",
};

const PrincipalStudentDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Student Leave Requests"
        description="View your Students applied leave requests and Please approve/reject them."
      />
      <PrincipalStudentPage />
    </>
  );
};

export default PrincipalStudentDashboard;
