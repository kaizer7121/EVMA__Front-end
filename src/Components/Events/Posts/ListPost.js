import { useState } from "react";

import CreatePost from "../../Popup/CreatePost";

import styles from "./ListPost.module.scss";

import commonStyles from "../../Auth/Auth.module.scss";
import Post from "./Post";
import { useParams } from "react-router";
import {
  createEventPost,
  deleteEventPost,
  editEventPost,
} from "../../../Service/api/eventApi";
import {
  deleteImageFile,
  uploadImgToStorage,
} from "../../../Service/firebaseFunctions";
import ConfirmDeletePost from "../../Popup/ConfirmDeletePost";

const ListPost = (props) => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [idDeletedPost, setIdDeletedPost] = useState("");
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
    let currentDate = "";
    if (actionType === "Create") {
      currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 7);
    } else if (actionType === "Edit") {
      currentDate = initData.createdDate;
    }
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
        const imageAsFile = postInfo.image;
        const fileName = response.imageURL;
        await uploadImgToStorage(imageAsFile, fileName);
        closePostCreation();
        if (actionType === "Edit") {
          props.clearAndReloadPost();
        } else {
          props.reloadPost();
        }
      } else {
        if (removeImg) {
          setRemoveImg(false);
          const fileName = `postImg_${initData.postId}`;
          await deleteImageFile(fileName);
          closePostCreation();
          if (actionType === "Edit") {
            props.clearAndReloadPost();
          } else {
            props.reloadPost();
          }
        } else {
          closePostCreation();
          props.reloadPost();
        }
      }
    } catch (error) {
      console.log("Error when create post: ");
      console.log(error);
      console.log(error.response);
    }
  };

  const confirmDeletePost = (postID) => {
    setIdDeletedPost(postID);
    setIsDeletingPost(true);
  };

  const onCloseConfirmDeletePost = () => {
    setIsDeletingPost(false);
    setIsDeletingPost("");
  };

  const onDeletePost = async () => {
    try {
      await deleteEventPost(idDeletedPost);
      const fileName = `postImg_${idDeletedPost}`;
      await deleteImageFile(fileName);
      setIsDeletingPost(false);
      props.reloadPost();
    } catch (error) {
      alert("Some thing wrong when delete post!");
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
      {isDeletingPost && (
        <ConfirmDeletePost
          onClose={onCloseConfirmDeletePost}
          onConfirm={onDeletePost}
        />
      )}
      <section className={`${styles.listPost}`}>
        {props.eventStatus === "Published" && (
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
        )}
        <div className={styles.listPost__list}>
          {props.information.map((post) => (
            <Post
              eventStatus={props.eventStatus}
              key={`POST_${post.id}`}
              isOwnEvent={props.isOwnEvent}
              information={post}
              onEditEvent={onEditEvent}
              onDelete={confirmDeletePost}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ListPost;
