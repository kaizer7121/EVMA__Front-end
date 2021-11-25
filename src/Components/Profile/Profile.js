import { useState, useEffect } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
import Swal from "sweetalert2";
import { updateProfile } from "../../Service/api/authApi";
import { uploadImgToStorage } from "../../Service/firebaseFunctions";
import {
  calculateAge,
  converISOToOnlyDate,
  updateProfileWithFullImage,
  validateCity,
  validateName,
  validatePhone,
} from "../../Service/functions";
import ConfirmImage from "../Popup/ConfirmImage";

import styles from "./Profile.module.scss";

const Profile = () => {
  const profile = useSelector((state) => state.profile);
  const userRole = useSelector((state) => state.profile.role);

  const [croppingImage, setCroppingImage] = useState({ empty: true });
  const [accountInformation, setAccountInformation] = useState({
    email: profile.email,
    avatarURL: profile.avatarURL,
    backgroundURL: profile.backgroundURL,
    name: profile.name,
    dob: profile.dob ? profile.dob : "",
    phoneNumber: profile.phoneNumber ? profile.phoneNumber : "",
    address: profile.address ? profile.address.replace(",", ", ") : "",
    city: profile.city ? profile.city : "",
    jobTitle: profile.jobTitle ? profile.jobTitle : "",
    summary: profile.summary ? profile.summary : "",
    role: profile.role ? profile.role : "",
  });
  const [errorInformation, setErrorInformation] = useState({
    name: false,
    dob: false,
    phoneNumber: false,
    address: false,
    city: false,
    jobTitle: false,
    summary: false,
  });
  const [imageAsFile, setImageAsFile] = useState({
    avatar: "",
    cover: "",
  });
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setAccountInformation({
      email: profile.email,
      avatarURL: profile.avatarURL,
      backgroundURL: profile.backgroundURL,
      name: profile.name,
      dob: profile.dob ? converISOToOnlyDate(profile.dob) : "",
      phoneNumber: profile.phoneNumber ? profile.phoneNumber : "",
      address: profile.address ? profile.address.replace(",", ", ") : "",
      city: profile.city ? profile.city : "",
      jobTitle: profile.jobTitle ? profile.jobTitle : "",
      summary: profile.summary ? profile.summary : "",
      role: profile.role,
    });
  }, [profile]);

  const inputValueAccountInformation = (value, type) => {
    setAccountInformation((prevValue) => ({
      ...prevValue,
      [type]: value,
    }));
  };

  const uploadImage = (e, type) => {
    if (e.target.files && e.target.files.length > 0) {
      setCroppingImage({ files: e.target.files, type });
    }
  };

  const onCloseCropping = () => {
    setCroppingImage({ empty: true });
  };

  const onConfirmCroppedImg = (blob) => {
    const imgSrc = URL.createObjectURL(blob);
    if (croppingImage.type === "cover") {
      setAccountInformation((prevValue) => ({
        ...prevValue,
        backgroundURL: imgSrc,
      }));
    } else if (croppingImage.type === "avatar") {
      setAccountInformation((prevValue) => ({
        ...prevValue,
        avatarURL: imgSrc,
      }));
    }
    setImageAsFile((prevValue) => ({
      ...prevValue,
      [croppingImage.type]: blob,
    }));
    setCroppingImage({ empty: true });
  };

  const checkValidInfo = () => {
    let name = false;
    let dob = false;
    let phoneNumber = false;
    let address = false;
    let city = false;
    let jobTitle = false;
    let summary = false;

    if (
      (accountInformation.name && accountInformation.name.length === 0) ||
      !validateName(accountInformation.name)
    ) {
      name = true;
    }
    if (
      !accountInformation.dob ||
      accountInformation.dob.length === 0 ||
      calculateAge(accountInformation.dob) < 16 ||
      calculateAge(accountInformation.dob) > 100
    ) {
      dob = true;
    }
    if (
      accountInformation.phoneNumber &&
      accountInformation.phoneNumber.length > 0 &&
      (!validatePhone(accountInformation.phoneNumber) ||
        accountInformation.phoneNumber.length > 10)
    ) {
      phoneNumber = true;
    }
    if (
      accountInformation.summary &&
      userRole === "Event Organizer" &&
      accountInformation.summary.length > 255
    ) {
      summary = true;
    }
    if (
      accountInformation.address &&
      (accountInformation.address.length >= 50 ||
        !validateName(accountInformation.address))
    ) {
      address = true;
    }
    if (
      accountInformation.city &&
      accountInformation.city.length !== 0 &&
      validateCity(accountInformation.city)
    ) {
      city = true;
    }
    setErrorInformation({
      name,
      dob,
      phoneNumber,
      address,
      city,
      jobTitle,
      summary,
    });

    return !(name || dob || phoneNumber || address || city || jobTitle);
  };

  const onUpdateProfile = async () => {
    if (checkValidInfo()) {
      let fixedDate = new Date(accountInformation.dob);
      fixedDate = new Date(fixedDate.setHours(fixedDate.getHours() + 7));

      const data = {
        name: accountInformation.name,
        email: accountInformation.email,
        city:
          accountInformation.city && accountInformation.city.length > 0
            ? accountInformation.city
            : null,
        jobTitle:
          accountInformation.jobTitle && accountInformation.jobTitle.length > 0
            ? accountInformation.jobTitle
            : null,
        address:
          accountInformation.address && accountInformation.address.length > 0
            ? accountInformation.address.replaceAll(", ", ",")
            : null,
        phoneNumber:
          accountInformation.phoneNumber &&
          accountInformation.phoneNumber.length > 0
            ? accountInformation.phoneNumber
            : null,
        summary:
          accountInformation.summary && accountInformation.summary.length > 0
            ? accountInformation.summary
            : null,
        dob: fixedDate.toISOString(),
        role: accountInformation.role,
      };
      try {
        setIsSendingRequest(true);
        const repsonse = await updateProfile(data, profile.id);
        if (repsonse.status !== 400 && repsonse.status !== 403) {
          if (
            imageAsFile.avatar &&
            imageAsFile.avatar.size &&
            imageAsFile.avatar.size > 0
          ) {
            await uploadImgToStorage(
              imageAsFile.avatar,
              `userAvatar_${repsonse.id}`
            );
          }
          if (
            imageAsFile.cover &&
            imageAsFile.cover.size &&
            imageAsFile.cover.size > 0
          ) {
            await uploadImgToStorage(
              imageAsFile.cover,
              `background_${repsonse.id}`
            );
          }
          const profileData = {
            ...repsonse,
            avatarURL: accountInformation.avatarURL
              ? accountInformation.avatarURL
              : "/images/default-avatar.png",
            backgroundURL: accountInformation.backgroundURL
              ? accountInformation.backgroundURL
              : "/images/default-cover.jpg",
          };

          await updateProfileWithFullImage(profileData, dispatch);
          Swal.fire(
            "Update successfully",
            "Click OK to go to home page",
            "success"
          ).then(() => {
            history.push("/event");
          });
        } else {
          Swal.fire(
            "Some thing wrong with server when update profile",
            "",
            "error"
          ).then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        console.log("Error when update profile " + error);
      }
    }
  };

  return (
    <>
      <section className={`${styles.profile}`}>
        <section className={`${styles.profile__section}`}>
          <h1>Profile</h1>
          <div className={`${styles.profile__topic}`}>
            <h3>User's email address</h3>
            <p>{accountInformation.email}</p>
          </div>
          <div className={`${styles.profile__topic}`}>
            <h3>User's avatar</h3>
            <img
              src={accountInformation.avatarURL}
              alt="avatar"
              className={`${styles.profile__topic_avatar}`}
            />
            <div className={`${styles.profile__topic_fileUpload}`}>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className={`${styles.profile__topic_fileUpload_upload}`}
                onInput={(e) => {
                  const info = e;
                  uploadImage(info, "avatar");
                  setTimeout(() => {
                    e.target.value = null;
                  }, 500);
                }}
              />
              <span>Upload</span>
            </div>
          </div>
          {userRole === "Event Organizer" && (
            <div className={`${styles.profile__topic}`}>
              <h3>User's cover image</h3>
              <img
                src={accountInformation.backgroundURL}
                alt="cover"
                className={`${styles.profile__topic_cover}`}
              />
              <div className={`${styles.profile__topic_fileUpload}`}>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className={`${styles.profile__topic_fileUpload_upload}`}
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
            </div>
          )}

          <div className={`${styles.profile__topic}`}>
            <h3>Name</h3>
            <input
              type="text"
              value={accountInformation.name}
              onChange={(event) =>
                inputValueAccountInformation(event.target.value, "name")
              }
            />
            {errorInformation.name && (
              <p className={`${styles.profile__error}`}>
                Your name is not correct format
              </p>
            )}

            <div className={`${styles.profile__topic_row}`}>
              <div className={`${styles.profile__topic_col}`}>
                <h3>
                  {userRole === "Event Organizer"
                    ? "Founding date"
                    : "Birth of date"}
                </h3>
                <label className={`${styles.profile__topic_datePicker}`}>
                  <DayPickerInput
                    format={"DD/MM/yyyy"}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    placeholder={`${formatDate(new Date())}`}
                    onDayChange={(date) => {
                      inputValueAccountInformation(date, "dob");
                    }}
                    value={accountInformation.dob}
                  />
                </label>
                {errorInformation.dob && (
                  <p className={`${styles.profile__error}`}>
                    Your age must be 16 or order and younger than 100
                  </p>
                )}
              </div>
              <div className={`${styles.profile__topic_col}`}>
                <h3>Phone number (optional)</h3>
                <input
                  type="text"
                  value={accountInformation.phoneNumber}
                  onChange={(event) =>
                    inputValueAccountInformation(
                      event.target.value,
                      "phoneNumber"
                    )
                  }
                />
                {errorInformation.phoneNumber && (
                  <p className={`${styles.profile__error}`}>
                    Your phone number format must be correct
                  </p>
                )}
              </div>
            </div>

            <div className={`${styles.profile__topic_row}`}>
              <div className={`${styles.profile__topic_col}`}>
                <h3>Address (optional)</h3>
                <input
                  type="text"
                  value={accountInformation.address}
                  onChange={(event) =>
                    inputValueAccountInformation(event.target.value, "address")
                  }
                />
                {errorInformation.address && (
                  <p className={`${styles.profile__error}`}>
                    Your address must less than 50 characters
                  </p>
                )}
              </div>

              <div className={`${styles.profile__topic_col}`}>
                <h3>City (optional)</h3>
                <input
                  type="text"
                  value={accountInformation.city}
                  onChange={(event) =>
                    inputValueAccountInformation(event.target.value, "city")
                  }
                />
                {errorInformation.city && (
                  <p className={`${styles.profile__error}`}>
                    Your city must not have number
                  </p>
                )}
              </div>
            </div>

            {userRole === "Attendees" && (
              <>
                <h3>Job title (optional)</h3>
                <input
                  type="text"
                  value={accountInformation.jobTitle}
                  onChange={(event) =>
                    inputValueAccountInformation(event.target.value, "jobTitle")
                  }
                />
              </>
            )}
            {userRole === "Event Organizer" && (
              <>
                <h3>Summary (optional)</h3>
                <TextareaAutosize
                  minRows={6}
                  maxRows={15}
                  placeholder="Type the summary of your profile (not exceed to 255 characters)"
                  onChange={(event) => {
                    inputValueAccountInformation(event.target.value, "summary");
                  }}
                  value={accountInformation.summary}
                />
                {errorInformation.summary && (
                  <p className={`${styles.profile__error}`}>
                    Your summary must less than 250 characters
                  </p>
                )}
              </>
            )}
          </div>
          {!isSendingRequest ? (
            <button
              className={`${styles.profile__section_button} ${styles.profile__section_button_submit}`}
              onClick={onUpdateProfile}
            >
              Save profile
            </button>
          ) : (
            <button
              className={`${styles.profile__section_button} ${styles.profile__section_button_waiting}`}
              onClick={onUpdateProfile}
              disabled={true}
            >
              ... Waiting
            </button>
          )}
        </section>
      </section>
      {croppingImage && !croppingImage.empty && (
        <ConfirmImage
          information={croppingImage}
          onClose={onCloseCropping}
          onConfirm={onConfirmCroppedImg}
        />
      )}
    </>
  );
};

export default Profile;
