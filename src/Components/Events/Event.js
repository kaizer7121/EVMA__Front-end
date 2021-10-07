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
      await getURLImage(fileName, setCoverURL);
    };
    getURLImg();
  }, [props.information.coverURL]);

  return (
    <section className={`${styles.event}`}>
      <div className={`${styles.event__status}`}>
        {props.information.status.name}
      </div>
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
