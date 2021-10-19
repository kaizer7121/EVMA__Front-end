import { useState, useEffect } from "react";
import NavigationBar from "../Components/Navigation/Navigationbar";
import SideNavigation from "../Components/Navigation/SideNavigation";
import ListOrganization from "../Components/Organizations/ListOrganization";
import { getAllOrganization } from "../Service/api/organizationApi";

const ListOrganizationPage = () => {
  const [listOrganization, setListOrganization] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      const getListOrganization = async () => {
        const params = {
          size: 50,
        };
        const list = await getAllOrganization(params);
        if (list && list.content) {
          console.log(list.content);
          setListOrganization(list.content);
        }
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
