import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import WardenPrincipalPage from "@/components/WardenPrincipalDashboard";

export const metadata: Metadata = {
  title: "Warden Dashboard | Leave Management Loyola",
  description: "This page is for Warden Dashboard",
};

const WardenDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="Hi Principal"
        description="View your Students applied leave requests for more than 2 days. This Leave requests will approve/reject from Principal."
      />
      <WardenPrincipalPage />
    </>
  );
};

export default WardenDashboard;
