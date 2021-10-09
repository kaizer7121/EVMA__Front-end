import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import EventCreation from "../Components/Events/EventCreation";
import NavigationBar from "../Components/Navigation/Navigationbar";
import { getAllCategoryFromDB, getEventByID } from "../Service/api/eventApi";
import { useSelector } from "react-redux";
import { converISOToOnlyDate, converISOToOnlyTime } from "../Service/functions";
import { getURLImage } from "../Service/firebaseFunctions";

const EventCreationPage = () => {
  window.scrollTo(0, 0);
  const profile = useSelector((state) => state.profile);
  const token = useSelector((state) => state.token.token);

  const [categoriesInDB, setCategoriesInDB] = useState([]);
  const [initialInformation, setInitialInformation] = useState({
    isEmpty: true,
  });
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.replace("/event");
    }
    const getCategoriesFromDB = async () => {
      try {
        const response = await getAllCategoryFromDB();
        setCategoriesInDB(response);
      } catch (error) {
        console.log("FAIL WHEN GET CATEGORIES " + error);
      }
    };
    getCategoriesFromDB();
  }, []);

  useEffect(() => {
    if (params && params.id) {
      const getEventInformation = async () => {
        try {
          const eventID = params.id;
          const response = await getEventByID(eventID);
          if (response.userProfileId !== profile.id) {
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
        } catch (error) {
          console.log("FAIL WHEN GET CATEGORIES " + error);
        }
      };
      getEventInformation();
    }
  }, [params, profile.name, history, profile.id]);
  return (
    <>
      <NavigationBar />
      {!(params && params.id) && (
        <EventCreation
          profileName={profile.name}
          categoriesInDB={categoriesInDB}
        />
      )}
      {params && params.id && !initialInformation.isEmpty && (
        <EventCreation
          profileName={profile.name}
          initialInformation={initialInformation}
          categoriesInDB={categoriesInDB}
        />
      )}
    </>
  );
};

export default EventCreationPage;