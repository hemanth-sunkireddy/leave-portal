import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import MentorPage from "@/components/MentorDashboard";

export const metadata: Metadata = {
  title: "Mentor Dashboard | Leave Management Loyola",
  description: "This page is for Mentor Dashboard",
};

const MentorDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="Hi Mentor"
        description="View your students applied leave requests and Please approve/reject them."
      />
      <MentorPage />
    </>
  );
};

export default MentorDashboard;
