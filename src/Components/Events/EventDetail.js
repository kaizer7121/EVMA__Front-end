import ListPost from "./Posts/ListPost";

import styles from "./EventDetail.module.scss";
import commonStyles from "../Auth/Auth.module.scss";
import { useState } from "react";
import { converISOToSimpleDate } from "../../Service/functions";
import { useEffect } from "react/cjs/react.development";
import { getURLImage } from "../../Service/firebaseFunctions";
import { useHistory } from "react-router";
import ConfirmDelete from "../Popup/ConfirmDelete";
import { changeEventStatus } from "../../Service/api/eventApi";
import { useSelector } from "react-redux";

let locations = { offline: [], online: [] };

const EventDetail = (props) => {
  const profile = useSelector((state) => state.profile);
  const [coverURL, setCoverURL] = useState("/images/default-cover.jpg");
  const isOwnEvent = props.information.userProfileId === profile.id;
  const [displayType, setDisplayType] = useState("detail");
  const descriptionArr = props.information.content.split("\n");
  const startDate = converISOToSimpleDate(props.information.startDate);
  const endDate = props.information.endDate
    ? converISOToSimpleDate(props.information.endDate)
    : null;
  const [choosingDelete, setChoosingDelete] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const listOffline = [];
    const listOnline = [];
    props.information.addresses.forEach((location) => {
      if (location.url) {
        listOnline.push({
          locationName: location.name,
          locationDetail: location.fullText,
        });
      } else {
        listOffline.push({
          locationName: location.name,
          locationDetail: location.fullText,
        });
      }
      locations = { offline: listOffline, online: listOnline };
    });
  }, [props.information.addresses]);

  useEffect(() => {
    const getURLImg = async () => {
      const fileName = props.information.coverURL;
      const url = await getURLImage(fileName);
      if (url) {
        setCoverURL(url);
      }
    };
    getURLImg();
  });

  const changeDisplayType = (type) => {
    if (displayType !== type) {
      setDisplayType(type);
    }
  };

  const onEditEvent = () => {
    history.push(`/edit/${props.information.id}`);
  };

  const onDeleteEvent = () => {
    setChoosingDelete(true);
  };

  const onCloseDelete = () => {
    setChoosingDelete(false);
  };

  const onConfirmDelete = (type) => {
    const id = type === "Cancel" ? 3 : 4;
    const eventID = props.information.id;
    changeEventStatus(eventID, id);
    window.location.reload();
    setChoosingDelete(false);
  };

  const mainContent = (
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
  );

  return (
    <section className={`${styles.detail}`}>
      <header className={`${styles.detail__header}`}>
        <div className={`${styles.detail__poster}`}>
          {props.information.status.name === "Published" && (
            <div
              className={`${styles.detail__status} ${styles.detail__status_published}`}
            >
              {props.information.status.name}
            </div>
          )}
          {props.information.status.name === "Cancelled" && (
            <div
              className={`${styles.detail__status} ${styles.detail__status_cancel}`}
            >
              {props.information.status.name}
            </div>
          )}
          {props.information.status.name === "Deleted" && (
            <div
              className={`${styles.detail__status} ${styles.detail__status_delete}`}
            >
              {props.information.status.name}
            </div>
          )}
          {props.information.status.name === "Draft" && (
            <div
              className={`${styles.detail__status} ${styles.detail__status_draft}`}
            >
              {props.information.status.name}
            </div>
          )}
          <img src={coverURL} alt="Poster" />
        </div>
        <div className={`${styles.detail__register}`}>
          <h3 className={`${styles.detail__topic}`}>Date:</h3>
          <p className={`${styles.detail__registerText}`}>{`${startDate} ${
            props.information.endDate !== null ? `- ${endDate}` : ""
          }`}</p>

          <h3 className={`${styles.detail__topic}`}>Location</h3>
          <br />
          {locations.offline.map((location, index) => {
            return (
              <span
                key={`offline_${index}`}
                className={`${styles.detail__registerText}`}
              >
                {`${location.locationName}: ${
                  location.locationDetail !== null ? (
                    `${location.locationDetail}`
                  ) : (
                    <span>Location</span>
                  )
                }`}
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
                key={`online_link_${index}`}
                href={location.locationDetail}
                className={`${styles.detail__registerText} `}
              >
                <span key={`online_name_${index}`}>{`${
                  location.locationName !== null
                    ? `${location.locationName}`
                    : "link"
                }`}</span>
              </a>
            ) : (
              <span key={`online_${index}`}>
                <a
                  key={`online_link_${index}`}
                  href={location.locationDetail}
                  className={`${styles.detail__registerText} `}
                >
                  <span key={`online_name_${index}`}>{`${
                    location.locationName !== null
                      ? `${location.locationName}`
                      : "link"
                  }`}</span>
                </a>
                <span key={`online_blank_${index}`}>{`, ${" "}`} </span>
              </span>
            );
          })}
          <p></p>

          <h3 className={`${styles.detail__topic} ${styles.mb_small}`}>
            Categories:
          </h3>
          {props.information.categories.map((category, index) => (
            <p
              key={`category__${index}`}
              className={`${styles.detail__category}`}
            >
              {category.name}
            </p>
          ))}
          <h3 className={`${styles.detail__topic}`}>Organization:</h3>
          <p className={`${styles.detail__registerText}`}>
            {props.information.organizerNames.map((organizerName, index) => {
              const isLast =
                index === props.information.organizerNames.length - 1;
              return isLast ? organizerName : `${organizerName}, `;
            })}
          </p>
          <h3 className={`${styles.detail__topic} ${styles.mb_small}`}>
            Hashtags:
          </h3>
          {props.information.tags[0] !== "" &&
            props.information.tags.map((tag, index) => {
              const isLast = index + 1 === props.information.tags.length;
              return isLast ? (
                <span
                  key={`hashtag_${index}`}
                  className={`${styles.detail__registerText}`}
                >{`${tag}`}</span>
              ) : (
                <span
                  key={`hashtag_${index}`}
                  className={`${styles.detail__registerText}`}
                >{`${tag}, `}</span>
              );
            })}
          <p></p>
          {props.information.status.name === "Published" && (
            <div className={`${styles.detail__buttons}`}>
              {!isOwnEvent && (
                <button
                  className={`${commonStyles.btn} ${commonStyles.btn_primary_light} ${styles.btn_small}`}
                >
                  Follow
                </button>
              )}
              {isOwnEvent && (
                <>
                  <button
                    className={`${commonStyles.btn} ${commonStyles.btn_danger} ${styles.btn_small}`}
                    onClick={onDeleteEvent}
                  >
                    Delete
                  </button>
                  <button
                    className={`${commonStyles.btn} ${commonStyles.btn_secondary_dark} ${styles.btn_small}`}
                    onClick={onEditEvent}
                  >
                    Edit
                  </button>
                </>
              )}

              <button
                className={`${commonStyles.btn} ${commonStyles.btn_tertiary_dark} ${styles.btn_small}`}
              >
                SHARE
              </button>
            </div>
          )}
        </div>
      </header>
      <hr />
      <section className={`${styles.detail_subNav}`}>
        <div
          className={`${styles.detail_subNav_item} ${
            displayType === "detail" && styles.detail_subNav_item_choice
          }`}
          onClick={() => {
            changeDisplayType("detail");
          }}
        >
          Detail
        </div>
        <div
          className={`${styles.detail_subNav_item} ${
            displayType === "posts" && styles.detail_subNav_item_choice
          }`}
          onClick={() => {
            changeDisplayType("posts");
          }}
        >
          Posts
        </div>
      </section>
      {displayType === "detail" && mainContent}
      {displayType === "posts" && (
        <ListPost
          eventStatus={props.information.status.name}
          isOwnEvent={isOwnEvent}
          information={props.listPost}
        />
      )}
      {choosingDelete && (
        <ConfirmDelete onClose={onCloseDelete} onConfirm={onConfirmDelete} />
      )}
    </section>
  );
};

export default EventDetail;
