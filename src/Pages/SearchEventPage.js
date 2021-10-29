import { useEffect } from "react";
import SearchEvent from "../Components/Events/SearchEvent";
import NavigationBar from "../Components/Navigation/Navigationbar"
import SideNavigation from "../Components/Navigation/SideNavigation";

const SearchEventPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavigationBar />
      <SideNavigation activatedItem={"SEARCH"} />
      <SearchEvent />
    </>
  );
};

export default SearchEventPage;
