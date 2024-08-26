import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import VicePrincipalHomeComponent from "@/components/VPDashboard";

export const metadata: Metadata = {
  title: "Vice Principal Dashboard | Leave Management Loyola",
  description: "This page is for Mentor Dashboard",
};

const VicePrincipalDashboard = () => {
  return (
    <>
      <Breadcrumb
        pageName="Hi Vice Principal"
        description="View your Students/Faculty applied leave requests and Please approve/reject them."
      />
      <VicePrincipalHomeComponent />
    </>
  );
};

export default VicePrincipalDashboard;
