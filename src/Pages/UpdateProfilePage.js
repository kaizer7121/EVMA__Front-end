import { useEffect } from "react";
import SignUp from "../Components/Auth/SignUp";

const UpdateProfilePage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return <SignUp />;
};

export default UpdateProfilePage;
