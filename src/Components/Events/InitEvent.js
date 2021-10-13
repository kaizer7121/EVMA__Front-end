import styles from "./InitEvent.module.scss";
import commonStyles from "../Auth/Auth.module.scss";
import { getDate, validURL } from "../../Service/functions";
import { useEffect, useState } from "react";

const InitEvent = (props) => {
  const [locations, setLocations] = useState({
    offline: [],
    online: [],
  });
  const descriptionArr = props.information.content.split("\n");
  const startDate = getDate(props.information.startDate);
  const endDate = getDate(props.information.endDate);

  useEffect(() => {
    const listOffline = [];
    const listOnline = [];
    props.information.locationDetail.forEach((location, index) => {
      if (validURL(location)) {
        listOnline.push({
          locationName: props.information.locationName[index],
          locationDetail: props.information.locationDetail[index],
        });
      } else {
        listOffline.push({
          locationName: props.information.locationName[index],
          locationDetail: props.information.locationDetail[index],
        });
      }
      setLocations({
        offline: listOffline,
        online: listOnline,
      });
    });
  }, [props.information.locationDetail, props.information.locationName]);

  return (
    <section className={`${styles.detail}`}>
      <header className={`${styles.detail__header}`}>
        <div className={`${styles.detail__poster}`}>
          {props.information.image && (
            <img src={props.information.image} alt="Poster" />
          )}
        </div>
        <div className={`${styles.detail__register}`}>
          <h3 className={`${styles.detail__topic}`}>Date:</h3>
          <p className={`${styles.detail__registerText}`}>
            <>
              Start: {startDate}, {props.information.startTime}
              <br/>
            </>
            {endDate.length > 0 &&
              `End:  ${endDate}, ${props.information.endTime}`}
          </p>
          <h3 className={`${styles.detail__topic}`}>Location</h3>
          <br />
          {locations.offline.map((location, index) => {
            return (
              <span
                key={`offline_${index}`}
                className={`${styles.detail__registerText}`}
              >
                {(location.locationName !== "" ||
                  location.locationDetail !== "") &&
                  `${location.locationName}: ${location.locationDetail}`}
                <br />
              </span>
            );
          })}
          {locations.online.length > 0 && (
            <span className={`${styles.detail__registerText} `}>URL: </span>
          )}

          {locations.online.map((location, index) => {
            const isLast = index + 1 === locations.online.length;
            return isLast ? (
              <a
                key={`online_${index}`}
                href={location.locationDetail}
                className={`${styles.detail__registerText} `}
              >
                <span
                  key={`online_${index}`}
                >{`${location.locationName}`}</span>
              </a>
            ) : (
              <>
                <a
                  key={`online_${index}`}
                  href={props.information.locationDetail}
                  className={`${styles.detail__registerText}`}
                >
                  <span
                    key={`online_${index}`}
                  >{`${location.locationName},`}</span>
                </a>
                <span key={`online_${index}`}> </span>
              </>
            );
          })}
          <p></p>
          <h3 className={`${styles.detail__topic} ${styles.mb_small}`}>
            Categories:
          </h3>
          {props.information.categories.map((category, index) => (
            <p
              key={`category_${index}`}
              className={`${styles.detail__category}`}
            >
              {category}
            </p>
          ))}
          <h3 className={`${styles.detail__topic}`}>Organization:</h3>
          <p className={`${styles.detail__registerText}`}>
            {props.information.organization}

            {props.information.otherOrganizations &&
              props.information.otherOrganizations[0] !== "" &&
              props.information.otherOrganizations.map(
                (organization) => `, ${organization}`
              )}
          </p>
          <h3 className={`${styles.detail__topic} ${styles.mb_small}`}>
            Hashtags:
          </h3>
          {props.information.hashtag[0] !== "" &&
            props.information.hashtag.map((tag, index) => {
              const isLast = index + 1 === props.information.hashtag.length;
              return isLast ? (
                <span
                  key={`hashtag_${index}`}
                  className={`${styles.detail__registerText}`}
                >{`#${tag}`}</span>
              ) : (
                <span
                  key={`hashtag_${index}`}
                  className={`${styles.detail__registerText}`}
                >{`#${tag}, `}</span>
              );
            })}
          <p></p>
          <div className={`${styles.detail__buttons}`}>
            <button
              className={`${commonStyles.btn} ${commonStyles.btn_primary_light} ${styles.btn_small}`}
            >
              Follow
            </button>

            <button
              className={`${commonStyles.btn} ${commonStyles.btn_tertiary_dark} ${styles.btn_small}`}
            >
              SHARE
            </button>
          </div>
        </div>
      </header>
      <hr />
      <div className={`${styles.detail__body}`}>
        <h1 className={`${styles.detail__title}`}>{props.information.title}</h1>
        {descriptionArr.map((sentence, index) => (
          <p
            key={`sentence_${index}`}
            className={`${styles.detail__description}`}
          >
            {sentence}
          </p>
        ))}
      </div>
    </section>
  );
};

export default InitEvent;
