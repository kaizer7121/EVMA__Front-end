import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";
import EventDetail from "../Components/Events/EventDetail";
import NavigationBar from "../Components/Navigation/Navigationbar";
import SideNavigation from "../Components/Navigation/SideNavigation";
import { getEventByID, getEventPost } from "../Service/api/eventApi";

const EventDetaiPage = () => {
  window.scrollTo(0, 0);
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

  const history = useHistory();
  const urlParam = useParams();

  useEffect(() => {
    const eventID = urlParam.id;

    // Get event information
    const getDetailInfo = async () => {
      const eventDetail = await getEventByID(eventID);
      console.log(eventDetail);
      if (!eventDetail || !eventDetail.id) {
        history.push("/event");
      }
      setEventDetail(eventDetail);
    };
    getDetailInfo();

    // Get list post
    const params = {
      size: 50,
    };
    const getListPost = async () => {
      const list = await getEventPost(eventID);
      setListPost(list.content, params);
    };
    getListPost();
  }, [urlParam.id, history]);

  return (
    <>
      <NavigationBar />
      <SideNavigation activatedItem={"NONE"} />
      <EventDetail information={eventDetail} listPost={listPost} />
    </>
  );
};

export default EventDetaiPage;
