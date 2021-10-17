import { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { getURLImage } from "../../Service/firebaseFunctions";

import styles from "./CompactedEvent.module.scss";

const CompactedEvent = (props) => {
  const [backgroundURL, setBackgroundURL] = useState(
    "/images/default-cover.jpg"
  );

  const history = useHistory();

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

  const goToDetailEvent = () => {
    history.push(`/event/${props.information.id}`);
  };

  const description = props.information.summary
    ? props.information.summary.split("\n")
    : [];
  return (
    <div className={`${styles.cpEvent}`}>
      <div className={`${styles.cpEvent__status}`}>
        {props.information.status.name}
      </div>
      <img src={backgroundURL} alt="Cover" onClick={goToDetailEvent} />
      <div className={styles.cpEvent__detail}>
        <h1 onClick={goToDetailEvent}>{props.information.title}</h1>
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
