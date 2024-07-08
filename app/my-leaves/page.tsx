import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply Leave | Leave Management Loyola",
  description: "This page is for leave application form",
  // other metadata
};

const MyLeavePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="My Past Leave Requests"
        description="Check your past leave request along with status of approved/rejected/applied. Will update this page soon."
      />
    </>
  );
};

export default MyLeavePage;
