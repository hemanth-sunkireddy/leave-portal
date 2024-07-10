import Breadcrumb from "@/components/Common/Breadcrumb";
import FacultyApplyLeaveForm from "@/components/FacultyApplyLeave";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty Apply Leave | Leave Management Loyola",
  description: "This page is for Faculty leave application form",
  // other metadata
};

const FacultyApplyLeavePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Apply Leave"
        description="Please Fill the below required details."
      />
      <FacultyApplyLeaveForm />
    </>
  );
};

export default FacultyApplyLeavePage;
