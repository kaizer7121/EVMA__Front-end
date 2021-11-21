import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getURLImage } from "../../Service/firebaseFunctions";
import { isPastedEvent } from "../../Service/functions";

import styles from "./CompactedEvent.module.scss";

const CompactedEvent = (props) => {
  const [backgroundURL, setBackgroundURL] = useState(
    "/images/default-cover.jpg"
  );

  useEffect(() => {
    const getURLImg = async () => {
      const fileName = `EventCover_${props.information.id}`;
      const url = await getURLImage(fileName);
      if (url) {
        setBackgroundURL(url);
      }
    };
    getURLImg();
  }, [props.information.id]);

  const description = props.information.summary
    ? props.information.summary.split("\n")
    : [];
  return (
    <div className={`${styles.cpEvent}`}>
      {isPastedEvent(props.information) ? (
        <div
          className={`${styles.cpEvent__status}  ${styles.cpEvent__status_past}`}
        >
          Past
        </div>
      ) : (
        <div
          className={`${styles.cpEvent__status} ${styles.cpEvent__status_published}`}
        >
          {props.information.status.name}
        </div>
      )}

      <Link to={`/event/${props.information.id}`}>
        <img src={backgroundURL} alt="Cover" />
      </Link>
      <div className={styles.cpEvent__detail}>
        <Link to={`/event/${props.information.id}`}>
          <h1>{props.information.title}</h1>
        </Link>
        <h3>Summary</h3>
        {description.map((sentence, index) => (
          <p key={`SENTENCE_${index}`}>{sentence}</p>
        ))}
        <h3 className={`${styles.cpEvent__inline}`}>Categories: </h3>
        {props.information.categories.map((category) => (
          <p
            key={`CATEGORY_${category.id}`}
            className={`${styles.cpEvent__category}`}
          >
            {category.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CompactedEvent;
