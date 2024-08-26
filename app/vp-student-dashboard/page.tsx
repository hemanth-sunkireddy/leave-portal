import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import VicePrincipalStudentPage from "@/components/VPDashboard/studentRequest";

export const metadata: Metadata = {
  title: "Vice Principal Dashboard | Leave Management Loyola",
  description: "This page is for Vice Principal Dashboard",
};

const VicePrincipalStudentDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="All Student Leave Requests"
        description="View your Students applied leave requests and approved/rejected."
      />
      <VicePrincipalStudentPage />
    </>
  );
};

export default VicePrincipalStudentDashboard;
