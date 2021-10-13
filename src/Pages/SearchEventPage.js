import SearchEvent from "../Components/Events/SearchEvent";
import NavigationBar from "../Components/Navigation/Navigationbar"
import SideNavigation from "../Components/Navigation/SideNavigation";

const SearchEventPage = () => {
  return (
    <>
      <NavigationBar />
      <SideNavigation activatedItem={"SEARCH"} />
      <SearchEvent />
    </>
  );
};

export default SearchEventPage;
