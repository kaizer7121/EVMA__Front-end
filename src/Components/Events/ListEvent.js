import Event from "./Event";

import { useEffect, useState } from "react";

import styles from "./ListEvent.module.scss";

const ListEvent = (props) => {
  const [listEvent, setListEvent] = useState([]);

  useEffect(() => {
    setListEvent(props.listEvent);
  }, [props.listEvent]);

  return (
    <div className={`${styles.listEvent}`} id="header">
      {listEvent.length > 0 &&
        listEvent.map((event) => {
          return <Event key={`EVENT_${event.id}`} information={event} />;
        })}
    </div>
  );
};

export default ListEvent;
