import { useEffect, useState } from "react/cjs/react.development";
import EventCreation from "../Components/Events/EventCreation";
import NavigationBar from "../Components/Navigation/Navigationbar";
import { getAllCategoryFromDB } from "../Service/api/eventApi";

const EventCreationPage = () => {
  const [categoriesInDB, setCategoriesInDB] = useState([]);
  useEffect(() => {
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
  return (
    <>
      <NavigationBar />
      <EventCreation categoriesInDB={categoriesInDB} />
    </>
  );
};

export default EventCreationPage;
