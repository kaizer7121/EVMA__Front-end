import Event from "./Event";
import LoadingComponent from "../Loading/LoadingComponent";

import { useEffect, useState } from "react";

import styles from "./ListEvent.module.scss";
import commonStyles from "../Auth/Auth.module.scss";

const ListEvent = (props) => {
  const [listEvent, setListEvent] = useState([]);

  useEffect(() => {
    setListEvent(props.listEvent);
  }, [props.listEvent]);

  return (
    <div className={`${styles.listEvent}`} id="header">
      {props.isLoading && <LoadingComponent />}
      {!props.isLoading &&
        listEvent.length > 0 &&
        listEvent.map((event) => {
          return <Event key={`EVENT_${event.id}`} information={event} />;
        })}
      {props.isGettingNewEvent && !props.isEndOfEvent && (
        <div
          className={`${commonStyles.loader_icon_big} ${styles.listEvent__loading}`}
        ></div>
      )}
      {props.isEndOfEvent && (
        <div className={`${styles.listEvent__notification}`}>
          <p>There is no more event to view</p>
        </div>
      )}
    </div>
  );
};

export default ListEvent;
