import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import Picker from "emoji-picker-react";
import TextareaAutosize from "react-textarea-autosize";
import TimePicker from "rc-time-picker";
import moment from "moment";

import { useState, useEffect } from "react";

import "rc-time-picker/assets/index.css";
import styles from "./CreationBar.module.scss";

let startMoment;
let endMoment;

const CreationBar = (props) => {
  const [isChoosingEmoji, setIsChoosingEmoji] = useState({
    shortDesc: false,
    desc: false,
  });
  const [numberOfMultiInput, setNumberOfMultiInput] = useState({
    location: 1,
    hashtag: 1,
    otherOrganizations: 1,
  });
  useEffect(() => {
    setNumberOfMultiInput((prevValue) => ({
      ...prevValue,
      location: props.information.locationName.length,
      hashtag: props.information.hashtag.length,
      otherOrganizations: props.information.otherOrganizations.length,
    }));
  }, [
    props.information.locationName.length,
    props.information.hashtag.length,
    props.information.otherOrganizations.length,
  ]);

  useEffect(() => {
    startMoment = moment();
    endMoment = moment();
    if (props.information.startTime.length > 0) {
      const timeArr = props.information.startTime.split(":");
      const currentDate = new Date();
      currentDate.setHours(timeArr[0], timeArr[1]);
      startMoment._d = currentDate;
    } else {
      startMoment = "";
    }
    if (props.information.endTime.length > 0) {
      const timeArr = props.information.endTime.split(":");
      const currentDate = new Date();
      currentDate.setHours(timeArr[0], timeArr[1]);
      endMoment._d = currentDate;
    } else {
      endMoment = "";
    }
  }, [props.information.startTime, props.information.endTime]);

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

  const uploadImage = (e, type) => {
    console.log("UPLOAD");
    props.uploadImage(e, type);
  };

  const onSubmit = () => {
    props.onSubmit();
  };

  const onSavetoDraft = () => {
    props.onSavetoDraft();
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
      {props.eventError.title && (
        <p
          className={`${styles.creationBar__error} ${styles.creationBar__error_mt_smallNegative}`}
        >
          Title length must between 3 - 50 characters
        </p>
      )}
      <h3 className={`${styles.creationBar__picker__title}`}>Start</h3>
      <section className={`${styles.creationBar__picker}`}>
        <label className={`${styles.creationBar__datePicker}`}>
          <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            placeholder=""
            onDayChange={(date) => {
              if (date === undefined) date = "";
              inputValue(date, "startDate");
            }}
            value={props.information.date}
          />
          <span className={`${styles.creationBar__datePicker__label}`}>
            Date
          </span>
        </label>
        <label className={`${styles.creationBar__timePicker}`}>
          <TimePicker
            showSecond={false}
            minuteStep={5}
            onChange={(value) => {
              if (value && value !== "") {
                const currentDate = value._d;
                const timeValue = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
                inputValue(timeValue, "startTime");
              } else {
                inputValue("", "startTime");
              }
            }}
            defaultValue={startMoment}
          />
          <span className={`${styles.creationBar__timePicker__label}`}>
            Time
          </span>
        </label>
      </section>
      {props.eventError.start && (
        <p
          className={`${styles.creationBar__error} ${styles.creationBar__error_mt_smallerNegative}`}
        >
          Date and time must not be empty and correct date format
        </p>
      )}
      <h3 className={`${styles.creationBar__picker__title}`}>End (Opional)</h3>
      <section className={`${styles.creationBar__picker}`}>
        <label className={`${styles.creationBar__datePicker}`}>
          <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            placeholder=""
            onDayChange={(date) => {
              if (date === undefined) date = "";
              inputValue(date, "endDate");
            }}
            value={props.information.date}
          />
          <span className={`${styles.creationBar__datePicker__label}`}>
            Date
          </span>
        </label>
        <label className={`${styles.creationBar__timePicker}`}>
          <TimePicker
            showSecond={false}
            minuteStep={5}
            onChange={(value) => {
              if (value && value !== "") {
                const currentDate = value._d;
                const timeValue = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
                inputValue(timeValue, "endTime");
              } else {
                inputValue("", "endTime");
              }
            }}
            defaultValue={endMoment}
          />

          <span className={`${styles.creationBar__timePicker__label}`}>
            Time
          </span>
        </label>
      </section>
      {props.eventError.end && (
        <p
          className={`${styles.creationBar__error} ${styles.creationBar__error_mt_smallerNegative} ${styles.creationBar__error_mb_smaller}`}
        >
          Date and time must both empty or both have text and correct date
          format
        </p>
      )}

      <h3 className={`${styles.creationBar__topic}`}>Location:</h3>
      {props.information.locationName.map((location, index) => {
        console.log(location);
        return (
          <section key={index} className={`${styles.creationBar__multiInput}`}>
            <label
              className={`${styles.creationBar__input} ${styles.creationBar__multiInput_short}`}
            >
              <input
                className={`${styles.creationBar__input__field}`}
                type="text"
                placeholder=""
                onChange={(event) => {
                  props.changeMultiInputValue(
                    event.target.value,
                    "LOCATIONNAME",
                    index
                  );
                }}
                value={props.information.locationName[index]}
              />
              <span className={`${styles.creationBar__input__label}`}>
                Name
              </span>
            </label>
            <label className={`${styles.creationBar__input}`}>
              <input
                className={`${styles.creationBar__input__field}`}
                type="text"
                placeholder=""
                onChange={(event) => {
                  props.changeMultiInputValue(
                    event.target.value,
                    "LOCATIONDETAIL",
                    index
                  );
                }}
                value={props.information.locationDetail[index]}
              />
              <span className={`${styles.creationBar__input__label}`}>
                Detail(URL)
              </span>
            </label>
          </section>
        );
      })}
      {numberOfMultiInput.location > 1 && (
        <p
          className={`${styles.creationBar__multiInput_remove}`}
          onClick={() => {
            props.changeMultiInput("LOCATION", "REMOVE");
          }}
        >
          Remove last location (-)
        </p>
      )}

      <p
        className={`${styles.creationBar__multiInput_add}`}
        onClick={() => {
          props.changeMultiInput("LOCATION", "ADD");
        }}
      >
        Add more location (+)
      </p>
      {props.eventError.location && (
        <p
          className={`${styles.creationBar__error} ${styles.creationBar__error_mt_smallNegative}`}
        >
          Location must not be empty
        </p>
      )}

      <h3 className={`${styles.creationBar__topic}`}>Hashtag:</h3>
      {props.information.hashtag.map((location, index) => {
        return (
          <section key={index} className={`${styles.creationBar__multiInput}`}>
            <label
              className={`${styles.creationBar__input} ${styles.creationBar__multiInput_long}`}
            >
              <input
                className={`${styles.creationBar__input__field}`}
                type="text"
                placeholder=""
                onChange={(event) => {
                  props.changeMultiInputValue(
                    event.target.value,
                    "HASHTAG",
                    index
                  );
                }}
                value={props.information.hashtag[index]}
              />
              <span className={`${styles.creationBar__input__label}`}>
                Hashtag name
              </span>
            </label>
          </section>
        );
      })}
      {numberOfMultiInput.hashtag > 1 && (
        <p
          className={`${styles.creationBar__multiInput_remove}`}
          onClick={() => {
            props.changeMultiInput("HASHTAG", "REMOVE");
          }}
        >
          Remove last hashtag (-)
        </p>
      )}

      <p
        className={`${styles.creationBar__multiInput_add}`}
        onClick={() => {
          props.changeMultiInput("HASHTAG", "ADD");
        }}
      >
        Add more hashtag (+)
      </p>

      <section className={`${styles.creationBar__categories}`}>
        <h3 className={`${styles.creationBar__topic}`}>Categories:</h3>
        <p className={`${styles.creationBar__category}`}>Education</p>
        <p className={`${styles.creationBar__category}`}>Online</p>
        <div className={`${styles.creationBar__addCategory}`}>
          <img src="/images/icon/plus-icon.png" alt="Add" />
          <span>Add</span>
        </div>
      </section>
      {props.eventError.categories && (
        <p
          className={`${styles.creationBar__error} ${styles.creationBar__error_mt_smallerNegative} ${styles.creationBar__error_mb_smaller}`}
        >
          Number of category must between (0 - 10)
        </p>
      )}

      <h3 className={`${styles.creationBar__topic}`}>Other organizations:</h3>
      {props.information.otherOrganizations.map((location, index) => {
        return (
          <section key={index} className={`${styles.creationBar__multiInput}`}>
            <label
              className={`${styles.creationBar__input} ${styles.creationBar__multiInput_long}`}
            >
              <input
                className={`${styles.creationBar__input__field}`}
                type="text"
                placeholder=""
                onChange={(event) => {
                  props.changeMultiInputValue(
                    event.target.value,
                    "OTHER_ORGANIZATIONS",
                    index
                  );
                }}
                value={props.information.otherOrganizations[index]}
              />
              <span className={`${styles.creationBar__input__label}`}>
                Organiztion name
              </span>
            </label>
          </section>
        );
      })}
      {numberOfMultiInput.otherOrganizations > 1 && (
        <p
          className={`${styles.creationBar__multiInput_remove}`}
          onClick={() => {
            props.changeMultiInput("OTHER_ORGANIZATIONS", "REMOVE");
          }}
        >
          Remove last organization (-)
        </p>
      )}

      <p
        className={`${styles.creationBar__multiInput_add}`}
        onClick={() => {
          props.changeMultiInput("OTHER_ORGANIZATIONS", "ADD");
        }}
      >
        Add more organization (+)
      </p>

      <section className={`${styles.creationBar__description}`}>
        <h3 className={`${styles.creationBar__topic}`}>Summary:</h3>
        <TextareaAutosize
          minRows={4}
          placeholder="Type short description of event"
          onChange={(event) => {
            inputValue(event.target.value, "summary");
          }}
          value={props.information.summary}
        />
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
                addEmoji(emojiObject.emoji, "summary");
              }}
              disableAutoFocus={true}
              disableSkinTonePicker={true}
              groupNames={{ smileys_people: "PEOPLE" }}
              native
            />
          )}
        </div>
      </section>
      {props.eventError.summary && (
        <p
          className={`${styles.creationBar__error} ${styles.creationBar__error_mt_smallerNegative}`}
        >
          Summary must not empty and not exceed 140 characters
        </p>
      )}
      <section className={`${styles.creationBar__description}`}>
        <h3 className={`${styles.creationBar__topic}`}>Content:</h3>
        <TextareaAutosize
          minRows={6}
          placeholder="Describe the content of event"
          onChange={(event) => {
            inputValue(event.target.value, "content");
          }}
          value={props.information.content}
        />
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
                addEmoji(emojiObject.emoji, "content");
              }}
              disableAutoFocus={true}
              disableSkinTonePicker={true}
              groupNames={{ smileys_people: "PEOPLE" }}
              native
            />
          )}
        </div>
      </section>
      {props.eventError.content && (
        <p
          className={`${styles.creationBar__error} ${styles.creationBar__error_mt_smallerNegative}`}
        >
          Content must not empty and not exceed 2500 characters
        </p>
      )}
      <section className={`${styles.creationBar__cover}`}>
        <h3 className={`${styles.creationBar__topic}`}>Cover:</h3>
        <div className={`${styles.creationBar__fileUpload}`}>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className={`${styles.creationBar__fileUpload__upload}`}
            onInput={(e) => {
              const info = e;
              uploadImage(info, "cover");
              setTimeout(() => {
                e.target.value = null;
              }, 500);
            }}
          />
          <span>Upload</span>
        </div>
        {props.information.image && (
          <img src={props.information.image} alt="cover" />
        )}
      </section>
      {props.eventError.image && (
        <p className={`${styles.creationBar__error}`}>
          This event don't have cover image
        </p>
      )}
      <section className={`${styles.creationBar__buttons}`}>
        <button
          className={`${styles.creationBar__buttons__btn} ${styles.creationBar__buttons__cancel}`}
        >
          Cancel
        </button>
        <button
          className={`${styles.creationBar__buttons__btn} ${styles.creationBar__buttons__saveDraft}`}
          onClick={onSavetoDraft}
        >
          Save to draft
        </button>
        <button
          className={`${styles.creationBar__buttons__btn} ${styles.creationBar__buttons__submit}`}
          onClick={onSubmit}
        >
          Submit
        </button>
      </section>
    </div>
  );
};

export default CreationBar;
