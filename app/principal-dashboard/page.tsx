import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import PrincipalPage from "@/components/PrincipalDashboard";

export const metadata: Metadata = {
  title: "Mentor Dashboard | Leave Management Loyola",
  description: "This page is for Mentor Dashboard",
};

const MentorDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="Hi Principal"
        description="View your Students/Faculty applied leave requests and Please approve/reject them."
      />
      <PrincipalPage />
    </>
  );
};

export default MentorDashboard;
