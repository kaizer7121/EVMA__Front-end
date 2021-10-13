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

  const trackScrolling = useCallback(() => {
    const wrappedElement = document.getElementById("header");

    if (wrappedElement) {
      const isBottom =
        wrappedElement.getBoundingClientRect().bottom * 0.8 <=
        window.innerHeight;

      if (isBottom) {
        setPagination((prevValue) => ({
          ...prevValue,
          page: pagination.page + 1,
        }));
      }
    } else {
      window.removeEventListener("scroll", trackScrolling);
    }
  }, [pagination.page]);

  useEffect(() => {
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
        const response = await getAllEvent(params);

        if (response.content && response.content.length === 0) {
          window.removeEventListener("scroll", trackScrolling);
          setPagination((prevValue) => ({
            ...prevValue,
            end: true,
          }));
        }
        setListEvent((prevValue) => [...prevValue, ...response.content]);
      } catch (err) {
        console.log("Fail when get all event: " + err);
      }
    };
    if (!pagination.end) {
      fetchAllEvent();
    }
  }, [trackScrolling, pagination.end, pagination.page]);

  window.scrollTo(0, 0);
  return (
    <div id="header">
      <NavigationBar />
      <SideNavigation activatedItem={"HOME"} />
      <ListEvent listEvent={listEvent} />
    </div>
  );
};

export default AllEventPage;
