import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";
import EventDetail from "../Components/Events/EventDetail";
import NavigationBar from "../Components/Navigation/Navigationbar";
import SideNavigation from "../Components/Navigation/SideNavigation";
import { getEventByID, getEventPost } from "../Service/api/eventApi";

const EventDetaiPage = () => {
  const [eventDetail, setEventDetail] = useState({
    id: "",
    title: "",
    categories: [],
    tags: [],
    organizerNames: [],
    userProfileId: 0,
    online: false,
    addresses: [],
    startDate: "",
    endDate: null,
    status: {
      id: 0,
      name: "",
    },
    coverURL: "",
    summary: "",
    content: "",
  });
  const [listPost, setListPost] = useState([]);
  const urlParam = useParams();
  useEffect(() => {
    const eventID = urlParam.id;

    // Get event information
    const getDetailInfo = async () => {
      const eventDetail = await getEventByID(eventID);
      console.log(eventDetail);
      setEventDetail(eventDetail);
    };
    getDetailInfo();

    // Get list post
    const getListPost = async () => {
      const list = await getEventPost(eventID);
      setListPost(list.content);
    };
    getListPost();
  }, [urlParam.id]);

  return (
    <>
      <NavigationBar />
      <SideNavigation activatedItem={"NONE"} />
      <EventDetail information={eventDetail} listPost={listPost} />
    </>
  );
};

export default EventDetaiPage;
