import { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { getURLImage } from "../../Service/firebaseFunctions";
import styles from "./Organization.module.scss";


const Organization = (props) => {
  const [avatarURL, setAvatarURL] = useState("/images/default-avatar.png");

  const history = useHistory();

  useEffect(() => {
    const getURLImg = async () => {
      const fileName = props.information.avatarURL;
      await getURLImage(fileName, setAvatarURL);
    };
    getURLImg();
  }, [props.information.avatarURL]);

  const showOrganizationDetail = () => {
    history.push(`/organization/${props.information.id}`);
  };

  return (
    <div
      key={`ORGANIZATION_${props.information.id} `}
      className={`${styles.organization}`}
    >
      <img
        src={avatarURL}
        alt="logo"
        onClick={showOrganizationDetail}
      />
      <div className={styles.organization__information}>
        <h3 onClick={showOrganizationDetail}>{props.information.name}</h3>
        <p>{props.information.summary}</p>
      </div>
      <div className={styles.organization__button}>
        <button
          className={`${styles.organization__button__btn} ${styles.organization__button__btn_primary}`}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default Organization;
