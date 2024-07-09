import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import MyLeaves from "@/components/MyLeaves";

export const metadata: Metadata = {
  title: "Apply Leave | Leave Management Loyola",
  description: "This page is to check applied leave requests",
};

const MyLeavePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="My Past Leave Requests"
        description="Check your past leave request along with status of approved/rejected/applied. Will update this page soon."
      />
      <MyLeaves />
    </>
  );
};

export default MyLeavePage;
