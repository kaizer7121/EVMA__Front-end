import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Backdrop from "./Backdrop";
import styles from "./CreatePost.module.scss";
import commonStyles from "../Auth/Auth.module.scss";
import Picker from "emoji-picker-react";

const CreatePost = (props) => {
  const actionType = props.initData.isEmpty ? "Create" : "Edit";

  const [postInfo, setPostInfo] = useState({
    content: actionType === "Edit" ? props.initData.content : "",
    image: actionType === "Edit" ? "Init" : "",
    imgSrc: actionType === "Edit" ? props.initData.imgSrc : "",
  });
  const [errorPost, setErrorPost] = useState({
    content: false,
  });
  const [isChoosingEmoji, setIsChoosingEmoji] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const onChangeContent = (event) => {
    setPostInfo((prevValue) => ({ ...prevValue, content: event.target.value }));
  };

  const addEmoji = (emoji) => {
    const oldContent = postInfo.content;
    setPostInfo((prevValue) => ({ ...prevValue, content: oldContent + emoji }));
  };

  const onUploadImage = (file) => {
    const imgSrc = URL.createObjectURL(file);
    setPostInfo((prevValue) => ({ ...prevValue, image: file, imgSrc }));
  };

  const onToggleEmojiPicker = () => {
    setIsChoosingEmoji(!isChoosingEmoji);
  };

  const closeConfirmImage = () => {
    props.onClose();
  };

  const removeImage = () => {
    setPostInfo((prevValue) => ({ ...prevValue, image: "", imgSrc: "" }));
    if (postInfo.image === "Init") {
      props.onRemoveImg();
    }
  };

  const checkValidData = () => {
    let content = false;
    if (postInfo.content.length <= 0 || postInfo.content.length > 2500) {
      content = true;
    }

    setErrorPost({ content });
    return !content;
  };

  const onSubmit = () => {
    if (checkValidData()) {
      setIsWaiting(true);
      props.onConfirm(postInfo);
    }
  };
  return (
    <Backdrop>
      <section className={`${styles.createPost}`}>
        <div className={`${styles.createPost__header}`}>
          <h1>Create a post</h1>
          <img
            src="/images/icon/cancel-icon.png"
            alt="cancel"
            className={`${styles.createPost__cancelIcon}`}
            onClick={closeConfirmImage}
          />
        </div>
        <div className={`${styles.createPost__detail}`}>
          <div className={`${styles.createPost__detail_input}`}>
            <h3 className={`${styles.createPost__topic}`}>Content:</h3>
            <TextareaAutosize
              minRows={7}
              maxRows={15}
              placeholder="Type short description of event"
              onChange={onChangeContent}
              value={postInfo.content}
            />
            {errorPost.content && (
              <p className={`${styles.createPost__error}`}>
                The number of character must between 1 - 2500
              </p>
            )}
            <div
              className={`${styles.createPost__detail_emoji}`}
              onClick={onToggleEmojiPicker}
            >
              <img src="/images/icon/smile.png" alt="emoji" />
            </div>
            <div className={`${styles.createPost__detail_emojiPicker}`}>
              {isChoosingEmoji && (
                <Picker
                  onEmojiClick={(e, emojiObject) => {
                    addEmoji(emojiObject.emoji, "summary");
                  }}
                  disableAutoFocus={true}
                  disableSkinTonePicker={true}
                  groupNames={{ smileys_people: "PEOPLE" }}
                  native
                />
              )}
            </div>
          </div>
          <section className={`${styles.createPost__cover}`}>
            <h3 className={`${styles.createPost__topic}`}>
              Image<small>(optional)</small>:
            </h3>
            <div className={`${styles.createPost__fileUpload}`}>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className={`${styles.createPost__fileUpload__upload}`}
                onInput={(event) => {
                  onUploadImage(event.target.files[0]);

                  setTimeout(() => {
                    event.target.value = null;
                  }, 500);
                }}
              />
              <span>Upload</span>
            </div>
            {postInfo.imgSrc && (
              <div className={styles.createPost__image} onClick={removeImage}>
                <img src={postInfo.imgSrc} alt="cover" />
                <p>Click to remove image</p>
              </div>
            )}
            {!postInfo.imgSrc && (
              <div className={`${styles.createPost__blank}`}>Empty</div>
            )}
          </section>
          <div className={`${styles.createPost__button}`}>
            {!isWaiting && (
              <button
                className={`${commonStyles.btn} ${commonStyles.btn_primary}`}
                onClick={onSubmit}
              >
                Submit
              </button>
            )}
            {isWaiting && (
              <button
                className={`${commonStyles.btn} ${commonStyles.btn_wait} ${commonStyles.btn_grey_dark}`}
                onClick={onSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </section>
    </Backdrop>
  );
};

export default CreatePost;
