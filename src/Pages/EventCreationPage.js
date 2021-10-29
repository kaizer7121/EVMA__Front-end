import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import EventCreation from "../Components/Events/EventCreation";
import NavigationBar from "../Components/Navigation/Navigationbar";
import { getEventByID } from "../Service/api/eventApi";
import { useSelector } from "react-redux";
import { getURLImage } from "../Service/firebaseFunctions";

const EventCreationPage = () => {
  const profile = useSelector((state) => state.profile);
  const token = useSelector((state) => state.token.token);
  const listCategory = useSelector((state) => state.categories.listCategory);
  const [initialInformation, setInitialInformation] = useState({
    isEmpty: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token || profile.role !== "Event Organizer") {
      history.replace("/event");
    }
  }, [history, token, profile.role]);

  useEffect(() => {
    if (params && params.id) {
      const getEventInformation = async () => {
        try {
          const eventID = params.id;
          const response = await getEventByID(eventID);
          if (!token || response.userProfileId !== profile.id) {
            history.replace("/event");
          }

          // Change location information
          const initLocationName = [];
          const initLocationDetail = [];
          response.addresses.forEach((address) => {
            initLocationName.push(address.name ? address.name : "default");
            initLocationDetail.push(
              address.fullText ? address.fullText : "default"
            );
          });

          // Change categories information
          const initCategories = [];
          response.categories.forEach((category) => {
            initCategories.push(category.name);
          }, []);

          // Change image information
          const imgURL = await getURLImage(response.coverURL);

          // Change hashtag information
          const hashTags = [];
          response.tags.forEach((tag) => {
            hashTags.push(tag.substring(1));
          });

          // Change organization information
          const otherOrganizations = [];
          response.organizerNames.forEach((org) => {
            if (profile.name !== org) {
              otherOrganizations.push(org);
            }
          });
          setInitialInformation({
            ...response,
            initLocationName,
            initLocationDetail,
            categories: initCategories,
            coverURL: imgURL,
            tags: hashTags,
            organization: profile.name,
            otherOrganizations,
          });
          setIsLoading(false);
        } catch (error) {
          console.log("FAIL WHEN GET EEVENT INFO " + error);
        }
      };
      getEventInformation();
    } else {
      setIsLoading(false);
    }
  }, [params, profile.name, history, profile.id, token]);
  return (
    <>
      <NavigationBar />
      {!(params && params.id) && (
        <EventCreation
          isLoading={isLoading}
          profileName={profile.name}
          categoriesInDB={listCategory}
        />
      )}
      {params && params.id && !initialInformation.isEmpty && (
        <EventCreation
          isLoading={isLoading}
          profileName={profile.name}
          initialInformation={initialInformation}
          categoriesInDB={listCategory}
        />
      )}
    </>
  );
};

export default EventCreationPage;
