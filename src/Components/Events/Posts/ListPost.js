import { useState } from "react";

import CreatePost from "../../Popup/CreatePost";

import styles from "./ListPost.module.scss";

import commonStyles from "../../Auth/Auth.module.scss";
import Post from "./Post";
import { useParams } from "react-router";
import { createEventPost, editEventPost } from "../../../Service/api/eventApi";
import {
  deleteImageFile,
  uploadImgToStorage,
} from "../../../Service/firebaseFunctions";

const ListPost = (props) => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [initData, setInitData] = useState({ isEmpty: true });
  const [removeImg, setRemoveImg] = useState(false);

  const urlParam = useParams();

  const openPostCreation = () => {
    setIsCreatingPost(true);
  };

  const closePostCreation = () => {
    setIsCreatingPost(false);
    setInitData({ isEmpty: true });
    setRemoveImg(false);
  };

  const confirmCreatePost = async (postInfo) => {
    const actionType = initData.isEmpty ? "Create" : "Edit";
    const currentDate =
      actionType === "Create" ? new Date() : initData.createdDate;
    const data = {
      eventId: actionType === "Create" ? +urlParam.id : initData.eventId,
      content: postInfo.content,
      createdDate:
        actionType === "Create" ? currentDate.toISOString() : currentDate,
    };
    try {
      const response =
        actionType === "Create"
          ? await createEventPost(data)
          : await editEventPost(data, initData.postId);
      if (postInfo.image.size && postInfo.image.size > 0) {
        console.log("Upload");
        const imageAsFile = postInfo.image;
        const fileName = response.imageURL;
        await uploadImgToStorage(imageAsFile, fileName);
      } else {
        if (removeImg) {
          setRemoveImg(false);
          const fileName = `postImg_${initData.postId}`;
          await deleteImageFile(fileName);
        }
      }
      setIsCreatingPost(false);
    } catch (error) {
      console.log("Error when create post: ");
      console.log(error);
      console.log(error.response);
    }
  };

  const onEditEvent = (initData) => {
    setInitData(initData);
    setIsCreatingPost(true);
  };

  const onRemoveImg = () => {
    setRemoveImg(true);
  };

  return (
    <>
      {isCreatingPost && (
        <CreatePost
          initData={initData}
          onClose={closePostCreation}
          onConfirm={confirmCreatePost}
          onRemoveImg={onRemoveImg}
        />
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
            <Post
              key={`POST_${post.id}`}
              isOwnEvent={props.isOwnEvent}
              information={post}
              onEditEvent={onEditEvent}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ListPost;
