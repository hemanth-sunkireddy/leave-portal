import { Metadata } from "next";
import SignInForm from "@/components/SignIn";

export const metadata: Metadata = {
  title: "Sign In Page | Leave Portal Loyola",
  description: "This is Sign In Page for Startup Nextjs Template",
};

const SigninPage = () => {
  return (
    <>
     <SignInForm />
    </>
  );
};

export default SigninPage;
