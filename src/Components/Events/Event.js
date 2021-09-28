import { Link } from "react-router-dom";

import styles from "./Event.module.scss";

const Event = (props) => {
  const shortDescriptionArr = props.shortDescription.split("\n");

  return (
    <section className={`${styles.event}`}>
      <h1 className={`${styles.event__title}`}>{props.title}</h1>
      <div className={`${styles.event__information}`}>
        <div className={`${styles.event__detail}`}>
          <div>
            <h3 className={`${styles.event__topic}`}>Short description: </h3>
            {shortDescriptionArr.map((sentence) => (
              <p className={`${styles.event__shortDescription}`}>{sentence}</p>
            ))}
          </div>
          <div>
            <h3 className={`${styles.event__topic}`}>Categories: </h3>
            {props.categories.map((category) => (
              <p className={`${styles.event__category}`}>{category}</p>
            ))}
          </div>
          <Link to="/event-detail" className={`${styles.event__btnText}`}>
            Learn more &rarr;
          </Link>
        </div>
        <div className={`${styles.event__poster}`}>
          <img src={props.image} alt="Poster" />
        </div>
      </div>
    </section>
  );
};

export default Event;
