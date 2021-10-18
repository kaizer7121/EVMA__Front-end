import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import NavigationBar from "../Components/Navigation/Navigationbar";
import Profile from "../Components/Profile/Profile";

const ProfilePage = () => {
  const profile = useSelector((state) => state.profile);
  const token = useSelector((state) => state.token.token);

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token || !profile.id) {
      history.replace("/event");
    }
  }, [history, token, profile.id]);

  return (
    <>
      <NavigationBar />
      <Profile />
    </>
  );
};

export default ProfilePage;
