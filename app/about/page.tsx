import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import run from "@/utilities/mongo";
import { response } from "@/utilities/mongo";

export const metadata: Metadata = {
  title: "About Page | Free Next.js Template for Startup and SaaS",
  description: "This is About Page for Startup Nextjs Template",
  // other metadata
};

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const AboutPage = () => {
  const handleMongoDBOperation = async () => {
    await run(); // Wait for MongoDB operation to complete
  };

  // Call the MongoDB operation function
  handleMongoDBOperation();
  return (
    <>
      <Breadcrumb
        pageName="About"
        description="The scope of the Automated System is designed to run on the University server and 
        to allow students to raise requests for their leave, 
        trace the request status, and modify them. On the Mentor Dashboard, 
        the software also allows the Mentor/ Mentor Coordinator to view requests, and approve/decline requests. 
        Whereas on the Hostel Dashboard, 
        the Warden/ Deputy Warden and Hostel Supervisors will be able to view and grant leave passes to the students.
        This Automated System will provide ease to all the actors – students, mentors, hostel authorities, 
        and security services in regard to leaving/outpassing sanctions and will ultimately eliminate the paperwork."
      />
      {/* <AboutSectionOne /> */}
      {/* <AboutSectionTwo /> */}
      {response === "SUCCESS" ? (
        <p>MongoDB operation was successful!</p>
      ) : (
        <p>Error occurred: {response}</p>
      )}
    </>
  );
};

export default AboutPage;
