import { useEffect } from "react";
import SignIn from "../Components/Auth/SignIn"

const SignInPage = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return <>
        <SignIn/>
    </>    
}

export default SignInPage;
