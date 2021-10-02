import { useState } from "react";
import { convertDate } from "../../Service/functions";
import styles from "./Post.module.scss";
import commonStyles from "../../Auth/Auth.module.scss";

const Post = (props) => {
  const [viewFullContent, setViewFullContent] = useState(false);

  const summrayContent = props.information.content.slice(0, 800);
  const fullContent = props.information.content;

  const changeView = () => {
    setViewFullContent(!viewFullContent);
  };

  return (
    <div className={`${styles.post}`}>
      <header className={`${styles.post__header}`}>
        <span>{convertDate(props.information.date)}</span>
        <button
          className={`${commonStyles.btn} ${commonStyles.btn_secondary_dark}`}
        >
          Edit
        </button>
        <button className={`${commonStyles.btn} ${commonStyles.btn_danger}`}>
          Delete
        </button>
      </header>
      {props.information.image.length === 0 ? (
        <div className={`${styles.post_detail}`}>
          {viewFullContent ? (
            <p>{fullContent}</p>
          ) : (
            <p>
              {summrayContent} <span onClick={changeView}>...More</span>
            </p>
          )}
        </div>
      ) : (
        <div className={`${styles.post_detail}`}>
          {viewFullContent ? (
            <div>
              <p>{fullContent}</p>
              <img src={props.information.image} alt="post_image" />
            </div>
          ) : (
            <div className={`${styles.post_detail_cut}`}>
              <p>
                {summrayContent} <span onClick={changeView}>...More</span>
              </p>
              <img src={props.information.image} alt="post_image" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
