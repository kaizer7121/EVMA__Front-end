import ListPost from "./Posts/ListPost";

import styles from "./EventDetail.module.scss";
import commonStyles from "../Auth/Auth.module.scss";
import { useState, useEffect } from "react";
import {
  clearUnfollowNotification,
  converISOToSimpleDate,
  isPastedEvent,
} from "../../Service/functions";
import {
  detachListenNotificationOfDocID,
  getURLImage,
  listenNotificationOfDocID,
} from "../../Service/firebaseFunctions";
import { useHistory } from "react-router";
import ConfirmDelete from "../Popup/ConfirmDelete";
import {
  changeEventStatus,
  followEvent,
  unfollowEvent,
} from "../../Service/api/eventApi";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../../Store/profileSlice";
import LoadingComponent from "../Loading/LoadingComponent";
import { notificationAction } from "../../Store/notificationSlice";

let locations = { offline: [], online: [] };

const EventDetail = (props) => {
  const listNotification = useSelector(
    (state) => state.notifications.notifications
  );
  const profile = useSelector((state) => state.profile);
  const { followedEvents } = profile;
  const token = useSelector((state) => state.token.token);

  const [eventStatus, setEventStatus] = useState({
    ...props.information.status,
  });
  const [coverURL, setCoverURL] = useState("/images/default-cover.jpg");
  const isOwnEvent = props.information.userProfileId === profile.id;
  const [displayType, setDisplayType] = useState("detail");
  const descriptionArr = props.information.content.split("\n");

  const startDate = converISOToSimpleDate(props.information.startDate);
  const endDate = props.information.endDate
    ? converISOToSimpleDate(props.information.endDate)
    : null;
  const [choosingDelete, setChoosingDelete] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const listID = followedEvents.map((docID) => {
      const id = docID.split("_")[0];
      return id;
    });
    setIsFollow(listID.includes(props.information.id.toString()));
  }, [followedEvents, props.information.id]);

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
  }, [props.information.coverURL]);

  useEffect(() => {
    setEventStatus({ ...props.information.status });
  }, [props.information.status]);

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
    const name = id === 3 ? "Cancelled" : "Deleted";
    changeEventStatus(eventID, id);

    setEventStatus((prevValue) => ({ ...prevValue, id, name }));
    setChoosingDelete(false);
  };

  const followEventHandler = async () => {
    if (!token) {
      history.push("/sign-in");
    } else {
      try {
        const eventID = props.information.id;
        followEvent(eventID).then(() => {
          dispatch(notificationAction.preventToStoreInstantEventNoti());
          listenNotificationOfDocID(`${eventID}_e`, dispatch);
        });
        dispatch(profileAction.addFollowedEvents([`${eventID}_e`]));
      } catch (error) {
        console.log("Error when follow event " + error);

        dispatch(
          profileAction.removeFollowedEvent([`${props.information.id}_e`])
        );
      }
    }
  };

  const unfollowEventHandler = async () => {
    if (!token) {
      history.push("/sign-in");
    } else {
      try {
        const eventID = props.information.id;
        unfollowEvent(eventID).then(() => {
          detachListenNotificationOfDocID(`${eventID}_e`);
        });
        dispatch(profileAction.removeFollowedEvent([`${eventID}_e`]));
        clearUnfollowNotification(listNotification, "Event", eventID, dispatch);
      } catch (error) {
        console.log("Error when follow event " + error);
        dispatch(
          profileAction.addFollowedEvents([`${props.information.id}_e`])
        );
      }
    }
  };
  const onShareUrl = () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setIsShared(true);
  };
  console.log(eventStatus);
  const reloadPost = () => {
    props.reloadPost();
  };

  const clearAndReloadPost = () => {
    props.clearAndReloadPost();
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
    <>
      {props.isLoading && <LoadingComponent />}
      {!props.isLoading && (
        <section className={`${styles.detail}`}>
          <header className={`${styles.detail__header}`}>
            <div className={`${styles.detail__poster}`}>
              {eventStatus.name === "Published" &&
                (isPastedEvent(props.information) ? (
                  <div
                    className={`${styles.detail__status} ${styles.detail__status_past}`}
                  >
                    Past
                  </div>
                ) : (
                  <div
                    className={`${styles.detail__status} ${styles.detail__status_published}`}
                  >
                    Published
                  </div>
                ))}
              {eventStatus.name === "Cancelled" && (
                <div
                  className={`${styles.detail__status} ${styles.detail__status_cancel}`}
                >
                  {eventStatus.name}
                </div>
              )}
              {eventStatus.name === "Deleted" && (
                <div
                  className={`${styles.detail__status} ${styles.detail__status_delete}`}
                >
                  {eventStatus.name}
                </div>
              )}
              {eventStatus.name === "Draft" && (
                <div
                  className={`${styles.detail__status} ${styles.detail__status_draft}`}
                >
                  {eventStatus.name}
                </div>
              )}
              <img src={coverURL} alt="Poster" />
            </div>
            <div className={`${styles.detail__register}`}>
              <h3 className={`${styles.detail__topic}`}>Date:</h3>
              <p className={`${styles.detail__registerText}`}>
                <>
                  Start: {startDate} <br />{" "}
                </>
                {props.information.endDate !== null ? `End: ${endDate}` : ""}
              </p>

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
                {props.information.organizerNames.map(
                  (organizerName, index) => {
                    const isLast =
                      index === props.information.organizerNames.length - 1;
                    return isLast ? organizerName : `${organizerName}, `;
                  }
                )}
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
              {!isPastedEvent(props.information) &&
                (eventStatus.name === "Published" ||
                  eventStatus.name === "Draft") && (
                  <div className={`${styles.detail__buttons}`}>
                    {!isOwnEvent &&
                      profile.role === "Attendees" &&
                      (isFollow ? (
                        <button
                          className={`${commonStyles.btn} ${commonStyles.btn_danger} ${styles.btn_small}`}
                          onClick={unfollowEventHandler}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className={`${commonStyles.btn} ${commonStyles.btn_primary_light} ${styles.btn_small}`}
                          onClick={followEventHandler}
                        >
                          Follow
                        </button>
                      ))}
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

                    {eventStatus.name !== "Draft" && (
                      <>
                        {!isShared && (
                          <button
                            className={`${commonStyles.btn} ${commonStyles.btn_tertiary_dark} ${styles.btn_small}`}
                            onClick={onShareUrl}
                          >
                            SHARE
                          </button>
                        )}
                        {isShared && (
                          <button
                            className={`${commonStyles.btn} ${commonStyles.btn_disable} ${commonStyles.btn_grey_dark} ${styles.btn_small}`}
                          >
                            Copied
                          </button>
                        )}
                      </>
                    )}
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
              eventStatus={eventStatus.name}
              isOwnEvent={isOwnEvent}
              information={props.listPost}
              reloadPost={reloadPost}
              changeDisplayType={changeDisplayType}
              clearAndReloadPost={clearAndReloadPost}
            />
          )}
          {choosingDelete && (
            <ConfirmDelete
              onClose={onCloseDelete}
              onConfirm={onConfirmDelete}
            />
          )}
        </section>
      )}
    </>
  );
};

export default EventDetail;
