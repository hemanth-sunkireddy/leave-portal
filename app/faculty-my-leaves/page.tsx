import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import FacultyMyLeaves from "@/components/FacultyMyLeaves";

export const metadata: Metadata = {
  title: "Faculty My Leaves | Leave Management Loyola",
  description: "This page is to check applied leave requests",
};

const FacultyMyLeavePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="My Past Leave Requests"
        description="Check your past leave request along with status of approved/rejected/applied."
      />
      <FacultyMyLeaves />
    </>
  );
};

export default FacultyMyLeavePage;
