import Link from "next/link";

import { Metadata } from "next";
import StudentSignupForm from "@/components/StudentSignup/page";

export const metadata: Metadata = {
  title: "Student Sign Up Page |Leave Portal Loyola",
  description: "This is Student Sign Up Page",
  // other metadata
};

const StudentSignupPage = () => {
  return (
    <>
      <StudentSignupForm />
    </>
  );
};

export default StudentSignupPage;
