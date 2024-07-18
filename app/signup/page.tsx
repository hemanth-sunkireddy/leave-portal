import Link from "next/link";

import { Metadata } from "next";
import SignupForm from '../../components/Signup/index';

export const metadata: Metadata = {
  title: "Sign Up Page | Leave Portal Loyola",
  description: "This is Sign Up page",
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
