import { useState } from "react";
import styles from "./ListFollow.module.scss";

import Event from "../Events/Event";
import Organization from "../Organizations/Organization";

const ListFollow = (props) => {
  const [displayType, setDisplayType] = useState("Event");

  const changeDisplayType = (type) => {
    if (displayType !== type) {
      setDisplayType(type);
    }
  };
  return (
    <div className={styles.listFollow}>
      <section className={`${styles.listFollow_subNav}`}>
        <div
          className={`${styles.listFollow_subNav_item} ${
            displayType === "Event" && styles.listFollow_subNav_item_choice
          }`}
          onClick={() => {
            changeDisplayType("Event");
          }}
        >
          Events
        </div>
        <div
          className={`${styles.listFollow_subNav_item} ${
            displayType === "Organization" &&
            styles.listFollow_subNav_item_choice
          }`}
          onClick={() => {
            changeDisplayType("Organization");
          }}
        >
          Organizations
        </div>
      </section>
      {displayType === "Event" &&
        props.information &&
        props.information.followedEvents &&
        props.information.followedEvents.length > 0 &&
        props.information.followedEvents.map((event) => {
          return <Event key={`EVENT_${event.id}`} information={event} />;
        })}
      {displayType === "Organization" &&
        props.information &&
        props.information.followedOrganizations &&
        props.information.followedOrganizations.length > 0 &&
        props.information.followedOrganizations.map((organization) => {
          return (
            <Organization
              key={`ORGANIZATION_${organization.id}`}
              information={organization}
            />
          );
        })}
    </div>
  );
};

export default ListFollow;
