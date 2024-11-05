import { Link } from "react-router-dom";
import { Button } from "../button";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn } = useUser();
  return (
    <>
      <div className="h-[68px]" />{" "}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="p-3 px-5 flex justify-between shadow-md">
          <Link to="/" className="flex items-center">
            <img width={200} src="/logo.png" alt="Logo" className="h-auto" />
          </Link>
          {isSignedIn ? (
            <div className="flex gap-3 items-center">
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </div>
          ) : (
            <Link to="auth/sign-in">
              <Button className="hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
