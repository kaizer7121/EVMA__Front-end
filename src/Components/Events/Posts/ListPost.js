import { useState } from "react";

import CreatePost from "../../Popup/CreatePost";

import styles from "./ListPost.module.scss";

import commonStyles from "../../Auth/Auth.module.scss";
import Post from "./Post";
import { useParams } from "react-router";

const ListPost = (props) => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const urlParam = useParams();

  const openPostCreation = () => {
    setIsCreatingPost(true);
  };

  const closePostCreation = () => {
    setIsCreatingPost(false);
  };

  const confirmCreatePost = (postInfo) => {
    const data = { ...postInfo, id: urlParam.id };
    setIsCreatingPost(false);
  };

  return (
    <>
      {isCreatingPost && (
        <CreatePost onClose={closePostCreation} onConfirm={confirmCreatePost} />
      )}
      <section className={`${styles.listPost}`}>
        <div className={`${styles.listPost__button}`}>
          {props.isOwnEvent && (
            <button
              className={`${commonStyles.btn} ${commonStyles.btn_tertiary_light}`}
              onClick={openPostCreation}
            >
              Create
            </button>
          )}
        </div>
        <div className={styles.listPost__list}>
          {props.information.map((post) => (
            <Post isOwnEvent={props.isOwnEvent} information={post} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ListPost;
