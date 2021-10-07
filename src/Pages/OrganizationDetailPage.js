import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";
import NavigationBar from "../Components/Navigation/Navigationbar";
import SideNavigation from "../Components/Navigation/SideNavigation";
import OrganizationDetail from "../Components/Organizations/OrganizationDetail";
import { getOrganizationDetail } from "../Service/api/organizationApi";

const OrganizationDetailPage = () => {
  const [organizationDetail, setOrganizationDetail] = useState({});
  const urlParam = useParams();
  useEffect(() => {
    console.log("EFFECT");
    const organizationID = urlParam.id;
    const getDetailInfo = async () => {
      const organizationDetail = await getOrganizationDetail(organizationID);
      setOrganizationDetail(organizationDetail);
      console.log(organizationDetail)
    };
    getDetailInfo();
  }, [urlParam.id]);
  return (
    <>
      <NavigationBar />
      <SideNavigation activatedItem={"NONE"} />
      <OrganizationDetail information={organizationDetail} />
    </>
  );
};

export default OrganizationDetailPage;
