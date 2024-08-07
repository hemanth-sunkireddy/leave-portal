import Breadcrumb from "@/components/Common/Breadcrumb";
import ApplyLeaveForm from "@/components/ApplyLeave";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply Leave | Leave Management Loyola",
  description: "This page is for leave application form",
  // other metadata
};

const ApplyLeavePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Apply Leave"
        description="Please Fill the below required details."
      />
      <ApplyLeaveForm />
    </>
  );
};

export default ApplyLeavePage;
