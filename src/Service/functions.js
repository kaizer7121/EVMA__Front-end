import { categoriesAction } from "../Store/categoriesStore";
import { profileAction } from "../Store/profileSlice";
import { getURLImage } from "./firebaseFunctions";

export const getDate = (fullDate) => {
  if (fullDate) {
    var today = fullDate;
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return mm + "/" + dd + "/" + yyyy;
  } else {
    return "";
  }
};

export const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateName = (name) => {
  var regex = /^([a-zA-Z ]){1,50}$/;
  return regex.test(name);
};

export const validatePassword = (password) => {
  var regex = /^([a-zA-Z ]){1,50}$/;
  return regex.test(password);
};

export const validatePhone = (phoneNumber) => {
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return regex.test(phoneNumber);
};

export const calculateAge = (birthday) => {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const convertDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return `${date.toLocaleDateString(
    undefined,
    options
  )} at ${date.toLocaleTimeString("en-US")}`;
};

export const converISOToDate = (isoDate) => {
  const [date, isoTime] = isoDate.split("T");
  const fullTime = isoTime.split("Z");
  const [hour, minute, second] = fullTime[0].split(":");
  const fullDate = new Date(date);
  fullDate.setHours(hour, minute, second);

  return fullDate;
};

export const converISOToOnlyDate = (isoDate) => {
  console.log("ISO:");
  console.log(isoDate);
  const [date, isoTime] = isoDate.split("T");
  const fullDate = new Date(date);

  return fullDate;
};

export const converISOToOnlyTime = (isoDate) => {
  const [date, isoTime] = isoDate.split("T");
  const fullTime = isoTime.split("Z");
  const [hour, minute, second] = fullTime[0].split(":");
  const returnTime = `${hour}:${minute}`;
  return returnTime;
};

export const converISOToSimpleDate = (isoDate) => {
  if (isoDate) {
    const [date, isoTime] = isoDate.split("T");
    const fullTime = isoTime.split("Z");

    const fullDate = `${date}, ${fullTime[0]}`;

    return fullDate;
  } else {
    return "";
  }
};

// ================= REDUX FUNCTION =================

export const signInWithFullImage = async (profile, dispatch) => {
  const { id } = profile;
  const avatarURLFirebase = await getURLImage(`userAvatar_${id}`);
  const backgroundURLFirebase = await getURLImage(`userBackground_${id}`);

  const fullData = {
    ...profile,
    avatarURL: avatarURLFirebase
      ? avatarURLFirebase
      : "/images/default-avatar.png",
    backgroundURL: backgroundURLFirebase
      ? backgroundURLFirebase
      : "/images/default-cover.jpg",
  };

  dispatch(profileAction.signInToEvma(fullData));
};

export const updateProfileWithFullImage = async (profile, dispatch) => {
  // const { id } = profile;
  // const avatarURLFirebase = await getURLImage(`userAvatar_${id}`);
  // const backgroundURLFirebase = await getURLImage(`userBackground_${id}`);

  // const fullData = {
  //   ...profile,
  //   avatarURL: avatarURLFirebase
  //     ? avatarURLFirebase
  //     : "/images/default-avatar.png",
  //   backgroundURL: backgroundURLFirebase
  //     ? backgroundURLFirebase
  //     : "/images/default-cover.jpg",
  // };

  dispatch(profileAction.updateProfile(profile));
};

export const updateListCategoryToStore = async (listCategory, dispatch) => {
  dispatch(categoriesAction.updateListCategories(listCategory));
};
