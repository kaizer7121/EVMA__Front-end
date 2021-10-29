import SideNavigation from "../Components/Navigation/SideNavigation";
import NavigationBar from "../Components/Navigation/Navigationbar";
import { useEffect, useState } from "react";
import ListFollow from "../Components/ListFollow/ListFollow";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getListFollowedEvent } from "../Service/api/eventApi";
import { getListFollowedOrganization } from "../Service/api/organizationApi";

const ListFollowPage = () => {
  const profile = useSelector((state) => state.profile);
  const token = useSelector((state) => state.token.token);
  const [information, setInformation] = useState({
    followedEvents: [],
    followedOrganizations: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token || profile.role !== "Attendees") {
      history.replace("/sign-in");
    }
  }, [history, token, profile.role]);

  useEffect(() => {
    const getListFollow = async () => {
      try {
        setIsLoading(true);
        const organizationReponse = await getListFollowedOrganization();
        setInformation((prevValue) => ({
          ...prevValue,
          followedOrganizations: organizationReponse.content,
        }));
      } catch (error) {
        console.log("Error when get list follow detail" + error);
      }
    };
    getListFollow();
  }, [profile.followedOrganizations]);

  useEffect(() => {
    const getListFollow = async () => {
      try {
        setIsLoading(true);
        const eventResponse = await getListFollowedEvent();
        setInformation((prevValue) => ({
          ...prevValue,
          followedEvents: eventResponse.content,
        }));
      } catch (error) {
        console.log("Error when get list follow detail" + error);
      }
    };
    getListFollow();
  }, [profile.followedEvents]);

  return (
    <div>
      <NavigationBar />
      <SideNavigation activatedItem={"TYPE_3"} />
      <ListFollow isLoading={isLoading} information={information} />
    </div>
  );
};

export default ListFollowPage;
