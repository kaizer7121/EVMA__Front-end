import { useState } from "react";
import { converISOToDate, convertDate } from "../../../Service/functions";
import styles from "./Post.module.scss";
import commonStyles from "../../Auth/Auth.module.scss";
import { useEffect } from "react";
import { getURLImage } from "../../../Service/firebaseFunctions";

const Post = (props) => {
  const [viewFullContent, setViewFullContent] = useState(false);
  const [coverURL, setCoverURL] = useState("/images/default-cover.jpg");

  const summrayContent = props.information.content.slice(0, 800);
  const fullContent = props.information.content;
  const date = convertDate(converISOToDate(props.information.createdDate));
  const changeView = () => {
    setViewFullContent(!viewFullContent);
  };

  useEffect(() => {
    const getURLImg = async () => {
      const fileName = `postImg_${props.information.id}`;
      const url = await getURLImage(fileName);
      setCoverURL(url);
    };
    getURLImg();
  }, [props.information.id]);

  const onEditPost = () => {
    const initData = {
      content: props.information.content,
      createdDate: props.information.createdDate,
      eventId: props.information.eventId,
      postId: props.information.id,
      imgSrc: coverURL ? coverURL : "",
    };

    props.onEditEvent(initData);
  };

  return (
    <div className={`${styles.post}`}>
      <header className={`${styles.post__header}`}>
        {/* <span>{convertDate(props.information.date)}</span> */}
        <span>{date}</span>
        {props.isOwnEvent && (
          <>
            {" "}
            <button
              className={`${commonStyles.btn} ${commonStyles.btn_secondary_dark}`}
              onClick={onEditPost}
            >
              Edit
            </button>
            <button
              className={`${commonStyles.btn} ${commonStyles.btn_danger}`}
            >
              Delete
            </button>
          </>
        )}
      </header>
      {!coverURL || coverURL === 0 ? (
        <div className={`${styles.post_detail}`}>
          {viewFullContent ? (
            <p>
              {fullContent}
              <span onClick={changeView}>Less</span>
            </p>
          ) : (
            <p>
              {summrayContent}
              <span onClick={changeView}>...More</span>
            </p>
          )}
        </div>
      ) : (
        <div className={`${styles.post_detail}`}>
          {viewFullContent ? (
            <div>
              <p>
                {fullContent} <span onClick={changeView}>Less</span>
              </p>

              <img src={coverURL} alt="post_image" />
            </div>
          ) : (
            <div className={`${styles.post_detail_cut}`}>
              <p>
                {summrayContent} <span onClick={changeView}>...More</span>
              </p>
              <img src={coverURL} alt="post_image" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
