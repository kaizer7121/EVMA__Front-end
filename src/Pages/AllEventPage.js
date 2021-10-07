import ListEvent from "../Components/Events/ListEvent";
import NavigationBar from "../Components/Navigation/Navigationbar";
import SideNavigation from "../Components/Navigation/SideNavigation";

const AllEventPage = () => {
  return (
    <>
      <NavigationBar />
      <SideNavigation activatedItem={"HOME"} />
      <ListEvent />
    </>
  );
};

export default AllEventPage;
