import { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";

import styles from "./Profile.module.scss";

const Profile = () => {
  const [accountInformation, setAccountInformation] = useState({
    email: "daohuuduc.910@gmail.com",
    userAvatar: "",
    userCover: "",
    name: "",
    birthDate: "",
    phoneNumber: "",
    address: "",
    city: "",
    jobTitle: "",
    summary: "",
  });
  const [accountSecurity, setAccountSecurity] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  return (
    <section className={`${styles.profile}`}>
      <section className={`${styles.profile__section}`}>
        <h1>Account Information</h1>
        <div className={`${styles.profile__topic}`}>
          <h3>User's email address</h3>
          <p>daohuuduc.910@gmail.com</p>
        </div>
        <div className={`${styles.profile__topic}`}>
          <h3>User's avatar</h3>
          <img
            src="/avatar.jpg"
            alt="avatar"
            className={`${styles.profile__topic_avatar}`}
          />
          <div className={`${styles.profile__topic_fileUpload}`}>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className={`${styles.profile__topic_fileUpload_upload}`}
              // onInput={uploadImage}
            />
            <span>Upload</span>
          </div>
        </div>
        <div className={`${styles.profile__topic}`}>
          <h3>User's cover image</h3>
          <img
            src="/cover.jpg"
            alt="cover"
            className={`${styles.profile__topic_cover}`}
          />
          <div className={`${styles.profile__topic_fileUpload}`}>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className={`${styles.profile__topic_fileUpload_upload}`}
              // onInput={uploadImage}
            />
            <span>Upload</span>
          </div>
        </div>
        <div className={`${styles.profile__topic}`}>
          <h2>Contact information</h2>

          <h3>Name</h3>
          <input type="text" />

          <div className={`${styles.profile__topic_row}`}>
            <div className={`${styles.profile__topic_col}`}>
              <h3>Birth of date</h3>
              <label className={`${styles.profile__topic_datePicker}`}>
                <DayPickerInput
                  formatDate={formatDate}
                  parseDate={parseDate}
                  placeholder={`${formatDate(new Date())}`}
                  //   onDayChange={(date) => {
                  //     inputValue(date, "date");
                  //   }}
                  //   value={props.information.date}
                />
              </label>
            </div>
            <div className={`${styles.profile__topic_col}`}>
              <h3>Phone number</h3>
              <input type="text" />
            </div>
          </div>

          <div className={`${styles.profile__topic_row}`}>
            <div className={`${styles.profile__topic_col}`}>
              <h3>Address</h3>
              <input type="text" />
            </div>

            <div className={`${styles.profile__topic_col}`}>
              <h3>City</h3>
              <input type="text" />
            </div>
          </div>

          <h3>Job title</h3>
          <input type="text" />

          <h3>Summary</h3>
          <input type="text" />
        </div>

        <button className={`${styles.profile__section_button}`}>
          Save profile
        </button>
        <hr />
      </section>
      <section className={`${styles.profile__section}`}>
        <h1>Account Security</h1>
        <div className={`${styles.profile__topic}`}>
          <h3>Old password:</h3>
          <input type="password" />

          <h3>New password:</h3>
          <input type="password" />

          <h3>Confirm password:</h3>
          <input type="password" />
        </div>
        <button className={`${styles.profile__section_button}`}>Confirm</button>
      </section>
    </section>
  );
};

export default Profile;
