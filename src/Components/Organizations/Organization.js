import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  followOrganization,
  unfollowOrganization,
} from "../../Service/api/organizationApi";
import {
  detachListenNotificationOfDocID,
  getURLImage,
  listenNotificationOfDocID,
} from "../../Service/firebaseFunctions";
import { clearUnfollowNotification } from "../../Service/functions";
import { notificationAction } from "../../Store/notificationSlice";
import { profileAction } from "../../Store/profileSlice";
import styles from "./Organization.module.scss";

const Organization = (props) => {
  const listNotification = useSelector(
    (state) => state.notifications.notifications
  );
  const profile = useSelector((state) => state.profile);
  const token = useSelector((state) => state.token.token);
  const { followedOrganizations } = profile;
  const [avatarURL, setAvatarURL] = useState("/images/default-avatar.png");
  const [isFollow, setIsFollow] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const listID = followedOrganizations.map((docID) => {
      const id = docID.split("_")[0];
      return id;
    });
    setIsFollow(listID.includes(props.information.id.toString()));
  }, [followedOrganizations, props.information.id]);

  useEffect(() => {
    const getURLImg = async () => {
      const fileName = `userAvatar_${props.information.id}`;
      const url = await getURLImage(fileName);
      if (url) {
        setAvatarURL(url);
      }
    };
    getURLImg();
  }, [props.information.id]);

  const followOrganizationHandler = async () => {
    if (!token) {
      history.push("/sign-in");
    } else {
      try {
        const organizationID = props.information.id;
        followOrganization(organizationID).then(() => {
          dispatch(notificationAction.preventToStoreInstantOrganizationNoti());
          listenNotificationOfDocID(`${organizationID}_o`, dispatch);
        });
        dispatch(profileAction.addFollowedOrganizers([`${organizationID}_o`]));
      } catch (error) {
        console.log("Error when follow organization " + error);

        dispatch(
          profileAction.removeFollowedOrganization([
            `${props.information.id}_o`,
          ])
        );
      }
    }
  };

  const unfollowOrganizationHandler = async () => {
    if (!token) {
      history.push("/sign-in");
    } else {
      try {
        const organizationID = props.information.id;
        unfollowOrganization(organizationID).then(() => {
          detachListenNotificationOfDocID(`${organizationID}_o`);
        });
        dispatch(
          profileAction.removeFollowedOrganization([`${organizationID}_o`])
        );
        clearUnfollowNotification(
          listNotification,
          "Organization",
          organizationID,
          dispatch
        );
      } catch (error) {
        console.log("Error when follow organization " + error);
        dispatch(
          profileAction.addFollowedOrganizers([`${props.information.id}_o`])
        );
      }
    }
  };

  return (
    <div
      key={`ORGANIZATION_${props.information.id} `}
      className={`${styles.organization}`}
    >
      <Link to={`/organization/${props.information.id}`}>
        <img src={avatarURL} alt="logo" />
      </Link>
      <div className={styles.organization__information}>
        <Link to={`/organization/${props.information.id}`}>
          <h3>{props.information.name}</h3>
        </Link>

        <p>{props.information.summary}</p>
      </div>
      {(profile.role === "Attendees" || profile.role === "") && (
        <div className={styles.organization__button}>
          {isFollow ? (
            <button
              className={`${styles.organization__button__btn} ${styles.organization__button__btn_danger}`}
              onClick={unfollowOrganizationHandler}
            >
              Unfollow
            </button>
          ) : (
            <button
              className={`${styles.organization__button__btn} ${styles.organization__button__btn_primary}`}
              onClick={followOrganizationHandler}
            >
              Follow
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Organization;
