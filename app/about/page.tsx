import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Free Next.js Template for Startup and SaaS",
  description: "This is About Page for Startup Nextjs Template",
  // other metadata
};


const AboutPage = () => {
  
  return (
    <>
      <Breadcrumb
        pageName="About"
        description="The system is designed to facilitate students, mentors, wardens, the principal, and faculty members. 
        It enables students and faculty to submit leave requests and track their status seamlessly.
        The system provides an end-to-end solution for managing leave requests, benefiting all users involved. 
        It reduces paperwork, enhances transparency, and 
        improves communication between students, mentors, wardens, the principal, and faculty members."
      />
    </>
  );
};

export default AboutPage;
