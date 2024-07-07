import Link from "next/link";

import { Metadata } from "next";
import SignupForm from '../../components/Signup/index';

export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
  // other metadata
};

const SignupPage = () => {
  return (
    <>
      <SignupForm />
    </>
  );
};

export default SignupPage;
