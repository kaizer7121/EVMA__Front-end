import ListEvent from "../Components/Events/ListEvent";
import NavigationBar from "../Components/Navigation/Navigationbar";
import SideNavigation from "../Components/Navigation/SideNavigation";

const AllEventPage = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <NavigationBar />
      <SideNavigation activatedItem={"HOME"} />
      <ListEvent />
    </>
  );
};

export default AllEventPage;
