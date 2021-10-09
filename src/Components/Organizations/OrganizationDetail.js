import { useCallback, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import {
  getAllEvent,
  getAllEventByProfileID,
} from "../../Service/api/eventApi";
import { getURLImage } from "../../Service/firebaseFunctions";
import CompactedEvent from "../Events/CompactedEvent";
import styles from "./OrganizationDetail.module.scss";

const OrganizationDetail = (props) => {
  const [avatarURL, setAvatarURL] = useState("/images/default-avatar.png");
  const [backgroundURL, setBackgroundURL] = useState(
    "/images/default-cover.jpg"
  );
  const [listEvent, setListEvent] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    end: false,
  });
  const description = props.information.summary
    ? props.information.summary.split("\n")
    : [];

  const trackScrolling = useCallback(() => {
    const wrappedElement = document.getElementById("header");

    if (wrappedElement) {
      const isBottom =
        wrappedElement.getBoundingClientRect().bottom * 0.9 <=
        window.innerHeight;

      if (isBottom) {
        setPagination((prevValue) => ({
          ...prevValue,
          page: pagination.page + 1,
        }));
      }
    } else {
      window.removeEventListener("scroll", trackScrolling);
    }
  }, [pagination.page]);

  useEffect(() => {
    window.addEventListener("scroll", trackScrolling);

    return function cleanup() {
      window.removeEventListener("scroll", trackScrolling);
    };
  }, [trackScrolling, pagination.page, pagination.maxPage]);

  useEffect(() => {
    const fetchAllRelatedEvent = async () => {
      try {
        const params = {
          page: pagination.page,
        };
        const organizationID = props.id;
        const response = await getAllEventByProfileID(organizationID, params);
        setPagination((prevValue) => ({
          ...prevValue,
          end: true,
        }));
        setListEvent((prevValue) => [...prevValue, ...response.content]);
      } catch (err) {
        console.log("Fail when get all event: " + err);
      }
    };
    if (!pagination.end) {
      fetchAllRelatedEvent();
    }
  }, [trackScrolling, pagination.end, pagination.page, props.id]);

  useEffect(() => {
    const getURLAvatar = async () => {
      const fileName = `userAvatar_${props.information.id}`;
      const url = await getURLImage(fileName);
      if (url) {
        setAvatarURL(url);
      }
    };
    const getURLBackGround = async () => {
      const fileName = `userBackground_${props.information.id}`;
      const url = await getURLImage(fileName);
      if (url) {
        setBackgroundURL(url);
      }
    };

    getURLAvatar();
    getURLBackGround();
  }, [props.information.id]);

  return (
    <div className={`${styles.organizationDetail}`}>
      <div className={`${styles.organizationDetail__image}`}>
        <img
          src={backgroundURL}
          alt="cover"
          className={`${styles.organizationDetail__image_cover}`}
        />
        <div className={`${styles.organizationDetail__image_avatar}`}>
          <img src={avatarURL} alt="avatar" />
          <h3>{props.information.name}</h3>
        </div>
      </div>
      <hr />
      <div className={`${styles.organizationDetail__description}`}>
        <div className={`${styles.organizationDetail__description_part}`}>
          <h3 className={`${styles.organizationDetail__description_topic}`}>
            Description:{" "}
          </h3>
          <p className={`${styles.organizationDetail__description_param}`}></p>
          {description.map((sentence, index) => (
            <p key={`SENTENCE_${index}`} className={`${styles.organizationDetail__description_param}`}>
              {sentence}
            </p>
          ))}
        </div>
        <div className={`${styles.organizationDetail__description_part}`}>
          <h3 className={`${styles.organizationDetail__description_topic}`}>
            Related events:{" "}
          </h3>
          <div className={`${styles.organizationDetail__relatedEvent}`}>
            {listEvent.map((event) => (
              <CompactedEvent key={`CPEVENT_${event.id}`} information={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetail;
