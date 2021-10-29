import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
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
  const [isReloadPost, setIsReloadPost] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const urlParam = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const eventID = urlParam.id;

    // Get event information
    const getDetailInfo = async () => {
      const eventDetail = await getEventByID(eventID);
      if (!eventDetail || !eventDetail.id) {
        history.push("/event");
      }
      setEventDetail(eventDetail);
    };
    getDetailInfo();
  }, [urlParam.id, history]);

  useEffect(() => {
    const eventID = urlParam.id;

    // Get list post
    if (isReloadPost) {
      const getListPost = async () => {
        try {
          const list = await getEventPost(eventID);
          setListPost(list.content);
          setIsLoading(false);
        } catch (err) {
          console.log("Error when get list post " + err);
        }
      };
      getListPost();
      setIsReloadPost(false);
    }
  }, [urlParam.id, isReloadPost]);

  const reloadPost = () => {
    setListPost([]);
    setIsReloadPost(true);
  };

  return (
    <>
      <NavigationBar />
      <SideNavigation activatedItem={"NONE"} />
      <EventDetail
        isLoading={isLoading}
        information={eventDetail}
        listPost={listPost}
        reloadPost={reloadPost}
      />
    </>
  );
};

export default EventDetaiPage;
