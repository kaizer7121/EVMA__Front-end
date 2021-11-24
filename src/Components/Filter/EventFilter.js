import { useState, useEffect } from "react";
import styles from "./EventFilter.module.scss";

const EventFilter = (props) => {
  const [filterType, setFilterType] = useState("All");
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  useEffect(() => {
    props.onChangeViewType(filterType);
  }, [filterType, props]);

  const onSelectFilter = (type) => {
    if (filterType === type) {
      setFilterType("All");
    } else {
      setFilterType(type);
    }
  };

  const onOpenFilter = () => {
    setIsOpenSelect(!isOpenSelect);
  };

  return (
    <div
      className={`${styles.eventFilter} ${
        isOpenSelect ? styles.eventFilter__extend : ""
      }`}
    >
      <h3 className={`${styles.eventFilter__title} `} onClick={onOpenFilter}>
        Filter
      </h3>
      {isOpenSelect && (
        <>
          {" "}
          <p
            className={`${styles.eventFilter__option} ${
              filterType === "Published"
                ? styles.eventFilter__option_seleteced
                : ""
            }`}
            onClick={() => {
              onSelectFilter("Published");
            }}
          >
            Published events
          </p>
          <p
            className={`${styles.eventFilter__option} ${
              filterType === "Draft" ? styles.eventFilter__option_seleteced : ""
            }`}
            onClick={() => {
              onSelectFilter("Draft");
            }}
          >
            Draft events
          </p>
          <p
            className={`${styles.eventFilter__option} ${
              filterType === "Cancelled"
                ? styles.eventFilter__option_seleteced
                : ""
            }`}
            onClick={() => {
              onSelectFilter("Cancelled");
            }}
          >
            Cancelled events
          </p>
          <p
            className={`${styles.eventFilter__option} ${
              filterType === "Deleted"
                ? styles.eventFilter__option_seleteced
                : ""
            }`}
            onClick={() => {
              onSelectFilter("Deleted");
            }}
          >
            Deleted events
          </p>{" "}
        </>
      )}
    </div>
  );
};

export default EventFilter;
