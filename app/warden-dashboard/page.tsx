import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import WardenPage from "@/components/WardenDashboard";

export const metadata: Metadata = {
  title: "Warden Dashboard | Leave Management Loyola",
  description: "This page is for Warden Dashboard",
};

const WardenDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="Hi Principal"
        description="View your Students applied leave requests and Please approve/reject them."
      />
      <WardenPage />
    </>
  );
};

export default WardenDashboard;
