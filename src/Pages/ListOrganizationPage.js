import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import NavigationBar from "../Components/Navigation/Navigationbar";
import SideNavigation from "../Components/Navigation/SideNavigation";
import ListOrganization from "../Components/Organizations/ListOrganization";
import { getAllOrganization } from "../Service/api/organizationApi";

const ListOrganizationPage = () => {
  const [listOrganization, setListOrganization] = useState([]);
  useEffect(() => {
    try {
      const getListOrganization = async () => {
        const list = await getAllOrganization();
        setListOrganization(list.content);
        console.log(list.content);
      };
      getListOrganization();
    } catch (error) {
      console.log("Fail when get all organziation " + error);
    }
  }, []);
  return (
    <>
      <NavigationBar />
      <SideNavigation activatedItem={"ORGANIZTAION"} />
      <ListOrganization listOrganization={listOrganization} />
    </>
  );
};

export default ListOrganizationPage;
