import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  followOrganization,
  unfollowOrganization,
} from "../../Service/api/organizationApi";
import { getURLImage } from "../../Service/firebaseFunctions";
import { profileAction } from "../../Store/profileSlice";
import styles from "./Organization.module.scss";

const Organization = (props) => {
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

  const showOrganizationDetail = () => {
    history.push(`/organization/${props.information.id}`);
  };

  const followOrganizationHandler = async () => {
    if (!token) {
      history.push("/sign-in");
    } else {
      try {
        const organizationID = props.information.id;
        const response = await followOrganization(organizationID);
        if (response) {
          dispatch(
            profileAction.removeFollowedOrganization([`${organizationID}_o`])
          );
        }
      } catch (error) {
        console.log("Error when follow organization " + error);
      }
    }
  };

  const unfollowOrganizationHandler = async () => {
    if (!token) {
      history.push("/sign-in");
    } else {
      try {
        const organizationID = props.information.id;
        const response = await unfollowOrganization(organizationID);
        if (response) {
          dispatch(
            profileAction.removeFollowedOrganization([`${organizationID}_o`])
          );
        }
      } catch (error) {
        console.log("Error when follow organization " + error);
      }
    }
  };

  return (
    <div
      key={`ORGANIZATION_${props.information.id} `}
      className={`${styles.organization}`}
    >
      <img src={avatarURL} alt="logo" onClick={showOrganizationDetail} />
      <div className={styles.organization__information}>
        <h3 onClick={showOrganizationDetail}>{props.information.name}</h3>
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
