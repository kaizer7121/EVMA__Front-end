import { Link } from "react-router-dom";

import styles from "./Event.module.scss";

import { useEffect, useState } from "react";
import { getURLImage } from "../../Service/firebaseFunctions";

const Event = (props) => {
  const [coverURL, setCoverURL] = useState("/images/default-cover.jpg");
  const shortDescriptionArr = props.information.summary.split("\n");
  useEffect(() => {
    const getURLImg = async () => {
      const fileName = props.information.coverURL;
      const url = await getURLImage(fileName);
      if (url) {
        setCoverURL(url);
      }
    };
    getURLImg();
  }, [props.information.coverURL]);

  return (
    <section className={`${styles.event}`}>
      {props.information.status.name === "Published" && (
        <div
          className={`${styles.event__status} ${styles.event__status_published}`}
        >
          {props.information.status.name}
        </div>
      )}
      {props.information.status.name === "Cancelled" && (
        <div
          className={`${styles.event__status} ${styles.event__status_cancel}`}
        >
          {props.information.status.name}
        </div>
      )}
      {props.information.status.name === "Deleted" && (
        <div
          className={`${styles.event__status} ${styles.event__status_delete}`}
        >
          {props.information.status.name}
        </div>
      )}
      {props.information.status.name === "Draft" && (
        <div
          className={`${styles.event__status} ${styles.event__status_draft}`}
        >
          {props.information.status.name}
        </div>
      )}
      <h1 className={`${styles.event__title}`}>{props.information.title}</h1>
      <div className={`${styles.event__information}`}>
        <div className={`${styles.event__detail}`}>
          <div>
            <h3 className={`${styles.event__topic}`}>Summary: </h3>
            {shortDescriptionArr.map((sentence, index) => (
              <p
                key={`SENTENCE_${index}`}
                className={`${styles.event__shortDescription}`}
              >
                {sentence}
              </p>
            ))}
          </div>
          <div>
            <h3 className={`${styles.event__topic}`}>Categories: </h3>
            {props.information.categories.map((category) => (
              <p
                key={`CATEGORY_${category.id}`}
                className={`${styles.event__category}`}
              >
                {category.name}
              </p>
            ))}
          </div>
          <Link
            to={`/event/${props.information.id}`}
            className={`${styles.event__btnText}`}
          >
            Learn more &rarr;
          </Link>
        </div>
        <div className={`${styles.event__poster}`}>
          <img src={coverURL} alt="Poster" />
        </div>
      </div>
    </section>
  );
};

export default Event;
