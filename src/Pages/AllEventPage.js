import { useCallback, useEffect, useState } from "react";
import ListEvent from "../Components/Events/ListEvent";
import NavigationBar from "../Components/Navigation/Navigationbar";
import SideNavigation from "../Components/Navigation/SideNavigation";
import { getAllEvent } from "../Service/api/eventApi";

const AllEventPage = () => {
  const [listEvent, setListEvent] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    end: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isGettingNewEvent, setIsGettingNewEvent] = useState(false);
  const [gottonPage, SetGottenPage] = useState(-1);

  const trackScrolling = useCallback(() => {
    const wrappedElement = document.getElementById("header");

    if (wrappedElement) {
      if (!isGettingNewEvent) {
        const isBottom =
          wrappedElement.getBoundingClientRect().bottom * 0.75 <=
          window.innerHeight;

        if (isBottom) {
          setPagination((prevValue) => ({
            ...prevValue,
            page: pagination.page + 1,
          }));
          setIsGettingNewEvent(true);
        }
      }
    } else {
      window.removeEventListener("scroll", trackScrolling);
    }
  }, [pagination.page, isGettingNewEvent]);

  useEffect(() => {
    window.removeEventListener("scroll", trackScrolling);
    window.addEventListener("scroll", trackScrolling);

    return function cleanup() {
      window.removeEventListener("scroll", trackScrolling);
    };
  }, [trackScrolling]);

  useEffect(() => {
    const fetchAllEvent = async () => {
      try {
        const params = {
          page: pagination.page,
        };
        SetGottenPage(pagination.page);
        const response = await getAllEvent(params);

        if (response.content && response.content.length === 0) {
          window.removeEventListener("scroll", trackScrolling);
          setPagination((prevValue) => ({
            ...prevValue,
            end: true,
          }));
        }
        setListEvent((prevValue) => [...prevValue, ...response.content]);
        setIsGettingNewEvent(false);
        setIsLoading(false);
      } catch (err) {
        console.log("Fail when get all event: " + err);
      }
    };
    if (!pagination.end && gottonPage < pagination.page) {
      fetchAllEvent();
    }
  }, [trackScrolling, pagination.end, pagination.page, gottonPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="header">
      <NavigationBar />
      <SideNavigation activatedItem={"HOME"} />
      <ListEvent isLoading={isLoading} listEvent={listEvent} />
    </div>
  );
};

export default AllEventPage;
