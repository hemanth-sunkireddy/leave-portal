import { Metadata } from "next";
import SignInForm from "@/components/SignIn";

export const metadata: Metadata = {
  title: "Sign In Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign In Page for Startup Nextjs Template",
  // other metadata
};

const SigninPage = () => {
  return (
    <>
     <SignInForm />
    </>
  );
};

export default SigninPage;
