import Header from "@/components/ui/custom/Header";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div>
      <Header />
      <div
        style={{ top: "calc(50% + 40px)" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-10"
      >
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
