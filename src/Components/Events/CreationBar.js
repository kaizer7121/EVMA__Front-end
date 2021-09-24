import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import Picker from "emoji-picker-react";
import TextareaAutosize from "react-textarea-autosize";

import { useState } from "react";

import styles from "./CreationBar.module.scss";

const DUMMY_IMAGE =
  "https://scontent.fsgn8-1.fna.fbcdn.net/v/t39.30808-6/242145009_222288139941640_6679877824071632444_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=340051&_nc_ohc=GDEukTT17DoAX-iw0PH&tn=AcLQveYFpgLxAnDM&_nc_ht=scontent.fsgn8-1.fna&oh=632f09b64830fbf22d075142cd6e8141&oe=614D4AD3";

const CreationBar = (props) => {
  const [isChoosingEmoji, setIsChoosingEmoji] = useState({
    shortDesc: false,
    desc: false,
  });

  const openShortDescEmojiPickerHandler = () => {
    setIsChoosingEmoji((prevValue) => ({
      ...prevValue,
      shortDesc: !prevValue.shortDesc,
    }));
  };

  const openDescEmojiPickerHandler = () => {
    setIsChoosingEmoji((prevValue) => ({
      ...prevValue,
      desc: !prevValue.desc,
    }));
  };

  const inputValue = (value, type) => {
    props.inputValue(value, type);
  };

  const addEmoji = (emoji, type) => {
    props.addEmoji(emoji, type);
  };

  const uploadImage = () => {
    props.uploadImage();
  };

  return (
    <div className={`${styles.creationBar}`}>
      <h1 className={`${styles.creationBar__title}`}>Create event</h1>
      <label className={`${styles.creationBar__input}`}>
        <input
          className={`${styles.creationBar__input__field}`}
          type="text"
          placeholder=" "
          onChange={(event) => {
            inputValue(event.target.value, "title");
          }}
          value={props.information.title}
        />
        <span className={`${styles.creationBar__input__label}`}>
          Event title
        </span>
      </label>

      <section className={`${styles.creationBar__picker}`}>
        <label className={`${styles.creationBar__datePicker}`}>
          <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            placeholder={`${formatDate(new Date())}`}
            onDayChange={(date) => {
              inputValue(date, "date");
            }}
            value={props.information.date}
          />
          <span className={`${styles.creationBar__datePicker__label}`}>
            Date
          </span>
        </label>
        <label className={`${styles.creationBar__timePicker}`}>
          <input
            type="text"
            placeholder="00:00"
            onChange={(event) => {
              inputValue(event.target.value, "time");
            }}
            value={props.information.time}
          />
          <span className={`${styles.creationBar__timePicker__label}`}>
            Time
          </span>
        </label>
      </section>

      <label className={`${styles.creationBar__input}`}>
        <input
          className={`${styles.creationBar__input__field}`}
          type="text"
          placeholder=" "
          onChange={(event) => {
            inputValue(event.target.value, "location");
          }}
          value={props.information.location}
        />
        <span className={`${styles.creationBar__input__label}`}>Location</span>
      </label>
      <section className={`${styles.creationBar__categories}`}>
        <h3 className={`${styles.creationBar__topic}`}>Categories:</h3>
        <p className={`${styles.creationBar__category}`}>Education</p>
        <p className={`${styles.creationBar__category}`}>Online</p>
        <div className={`${styles.creationBar__addCategory}`}>
          <img src="/images/icon/plus-icon.png" alt="Add" />
          <span>Add</span>
        </div>
      </section>
      <section className={`${styles.creationBar__description}`}>
        <h3 className={`${styles.creationBar__topic}`}>Short description:</h3>
        <div
          className={`${styles.creationBar__emoji}`}
          onClick={openShortDescEmojiPickerHandler}
        >
          <img src="/images/icon/smile.png" alt="emoji" />
        </div>
        <div className={`${styles.creationBar__emojiPicker}`}>
          {isChoosingEmoji.shortDesc && (
            <Picker
              onEmojiClick={(e, emojiObject) => {
                addEmoji(emojiObject.emoji, "shortDescription");
              }}
              disableAutoFocus={true}
              disableSkinTonePicker={true}
              groupNames={{ smileys_people: "PEOPLE" }}
              native
            />
          )}
        </div>
        <TextareaAutosize
          minRows={4}
          placeholder="Type short description of event"
          onChange={(event) => {
            inputValue(event.target.value, "shortDescription");
          }}
          value={props.information.shortDescription}
        />
      </section>
      <section className={`${styles.creationBar__description}`}>
        <h3 className={`${styles.creationBar__topic}`}>Description:</h3>
        <div
          className={`${styles.creationBar__emoji}`}
          onClick={openDescEmojiPickerHandler}
        >
          <img src="/images/icon/smile.png" alt="emoji" />
        </div>
        <div className={`${styles.creationBar__emojiPicker}`}>
          {isChoosingEmoji.desc && (
            <Picker
              onEmojiClick={(e, emojiObject) => {
                addEmoji(emojiObject.emoji, "description");
              }}
              disableAutoFocus={true}
              disableSkinTonePicker={true}
              groupNames={{ smileys_people: "PEOPLE" }}
              native
            />
          )}
        </div>
        <TextareaAutosize
          minRows={6}
          placeholder="Describe the content of event"
          onChange={(event) => {
            inputValue(event.target.value, "description");
          }}
          value={props.information.description}
        />
      </section>

      <section className={`${styles.creationBar__cover}`}>
        <h3 className={`${styles.creationBar__topic}`}>Cover:</h3>
        <div className={`${styles.creationBar__fileUpload}`}>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className={`${styles.creationBar__fileUpload__upload}`}
            onInput={uploadImage}
          />
          <span>Upload</span>
        </div>
        {props.information.image && (
          <img src={props.information.image} alt="cover" />
        )}
      </section>

      <section className={`${styles.creationBar__buttons}`}>
        <button
          className={`${styles.creationBar__buttons__btn} ${styles.creationBar__buttons__cancel}`}
        >
          Cancel
        </button>
        <button
          className={`${styles.creationBar__buttons__btn} ${styles.creationBar__buttons__submit}`}
        >
          Submit
        </button>
      </section>
    </div>
  );
};

export default CreationBar;
