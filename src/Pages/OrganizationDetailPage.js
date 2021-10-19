import { useState, useEffect } from "react";
import { useParams } from "react-router";
import NavigationBar from "../Components/Navigation/Navigationbar";
import SideNavigation from "../Components/Navigation/SideNavigation";
import OrganizationDetail from "../Components/Organizations/OrganizationDetail";
import { getOrganizationDetail } from "../Service/api/organizationApi";

const OrganizationDetailPage = () => {
  const [organizationDetail, setOrganizationDetail] = useState({});
  const urlParam = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const organizationID = urlParam.id;
    const getDetailInfo = async () => {
      const organizationDetail = await getOrganizationDetail(organizationID);
      setOrganizationDetail(organizationDetail);
    };
    getDetailInfo();
  }, [urlParam.id]);
  return (
    <>
      <NavigationBar />
      <SideNavigation activatedItem={"NONE"} />
      <OrganizationDetail id={urlParam.id} information={organizationDetail} />
    </>
  );
};

export default OrganizationDetailPage;
