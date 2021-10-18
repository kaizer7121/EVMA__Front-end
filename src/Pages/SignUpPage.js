import { useEffect } from "react";
import SignUp from "../Components/Auth/SignUp";

const SignUpPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return <SignUp />;
};

export default SignUpPage;
