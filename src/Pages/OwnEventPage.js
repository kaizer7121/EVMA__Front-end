import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import ListEvent from "../Components/Events/ListEvent";
import EventFilter from "../Components/Filter/EventFilter";
import NavigationBar from "../Components/Navigation/Navigationbar";
import SideNavigation from "../Components/Navigation/SideNavigation";
import { getEventByStatus } from "../Service/api/eventApi";

const OwnEventPage = () => {
  const profile = useSelector((state) => state.profile);
  const token = useSelector((state) => state.token.token);

  const [listEventView, setListEventView] = useState([]);
  const [type, setType] = useState("Published");
  const [listEventByStatus, setListEventByStatus] = useState({
    published: [],
    draft: [],
    cancelled: [],
    deleted: [],
  });
  const [viewType, setViewType] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token || profile.role !== "Event Organizer") {
      history.replace("/event");
    }
  }, [history, token, profile.role]);

  useEffect(() => {
    const getEvent = async () => {
      const response = await getEventByStatus(profile.id, type);
      setListEventView((prevValue) => [...prevValue, ...response.content]);
      if (type === "Published") {
        setType("Draft");
        setListEventByStatus((prevValue) => ({
          ...prevValue,
          published: [...response.content],
        }));
      }
      if (type === "Draft") {
        setType("Cancelled");
        setListEventByStatus((prevValue) => ({
          ...prevValue,
          draft: [...response.content],
        }));
      }
      if (type === "Cancelled") {
        setType("Deleted");
        setListEventByStatus((prevValue) => ({
          ...prevValue,
          cancelled: [...response.content],
        }));
      }
      if (type === "Deleted") {
        setListEventByStatus((prevValue) => ({
          ...prevValue,
          deleted: [...response.content],
        }));
        setIsLoading(false);
      }
    };
    getEvent();
  }, [type, profile.id]);

  useEffect(() => {
    if (viewType === "All") {
      setListEventView([
        ...listEventByStatus.published,
        ...listEventByStatus.draft,
        ...listEventByStatus.cancelled,
        ...listEventByStatus.deleted,
      ]);
    } else if (viewType === "Published") {
      setListEventView([...listEventByStatus.published]);
    } else if (viewType === "Draft") {
      setListEventView([...listEventByStatus.draft]);
    } else if (viewType === "Cancelled") {
      setListEventView([...listEventByStatus.cancelled]);
    } else if (viewType === "Deleted") {
      setListEventView([...listEventByStatus.deleted]);
    }
  }, [
    viewType,
    listEventByStatus.published,
    listEventByStatus.draft,
    listEventByStatus.cancelled,
    listEventByStatus.deleted,
  ]);

  const onChangeViewType = (type) => {
    setViewType(type);
  };

  return (
    <div id="header">
      <NavigationBar />
      <SideNavigation activatedItem="TYPE_3" />
      <EventFilter onChangeViewType={onChangeViewType} />
      <ListEvent isLoading={isLoading} listEvent={listEventView} />
    </div>
  );
};

export default OwnEventPage;
