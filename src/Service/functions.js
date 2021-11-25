import Swal from "sweetalert2";
import { categoriesAction } from "../Store/categoriesStore";
import { notificationAction } from "../Store/notificationSlice";
import { profileAction } from "../Store/profileSlice";
import { tokenAction } from "../Store/tokenSlice";
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
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export const validateName = (name) => {
  const regexString =
    "^[\\dA-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵ" +
    "ặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]([-']?[\\dA-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚ" +
    "ĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồ" +
    "ổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+)*( [\\dA-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮ" +
    "ẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]([-']?[" +
    "\\dA-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊ" +
    "ỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+)*)*$";
  const regex = new RegExp(regexString);
  return regex.test(name);
};

export const validatePassword = (password) => {
  const regex = /^([a-zA-Z ]){1,50}$/;
  return regex.test(password);
};

export const validatePhone = (phoneNumber) => {
  const regexString = "[\\d]{10,11}$";
  const regex = new RegExp(regexString);
  return regex.test(phoneNumber);
};

export const validateAddress = (address) => {
  const regexString =
    "^[\\dA-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾ" +
    "ưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]([-'/" +
    ".,]?[\\dA-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩ" +
    "ẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+)*( [\\dA-Z" +
    "a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽề" +
    "ềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]([-'/.,]?[\\dA-Za-zÀÁÂÃ" +
    "ÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊ" +
    "ỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+)*)*$";
  const regex = new RegExp(regexString);

  return regex.test(address);
};

export const validateCity = (city) => {
  return /\d/.test(city);
};

export const calculateAge = (birthday) => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
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

export const convertDate2 = (date) => {
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
  const [date] = isoDate.split("T");
  const fullDate = new Date(date);

  return fullDate;
};

export const converISOToOnlyTime = (isoDate) => {
  const [, isoTime] = isoDate.split("T");
  const fullTime = isoTime.split("Z");
  const [hour, minute] = fullTime[0].split(":");
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

export const convertDateToCollectionName = (date) => {
  const currentDate = new Date(date);
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  return `${currentDay}.${currentMonth}`;
};

export const isPastedEvent = (event) => {
  const currentDate = new Date();
  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : undefined;

  if (endDate) {
    return endDate.getTime() < currentDate.getTime();
  } else {
    return startDate.getTime() < currentDate.getTime();
  }
};

// ================= REDUX FUNCTION =================

export const signInWithFullImage = async (profile, dispatch) => {
  try {
    const { id } = profile;
    const avatarURLFirebase = await getURLImage(`userAvatar_${id}`);
    const backgroundURLFirebase = await getURLImage(`background_${id}`);

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
  } catch (error) {
    dispatch(profileAction.signOut());
    dispatch(tokenAction.deleteToken());
    Swal.fire("Some thing wrong with network", "", "error");
  }
};

export const updateProfileWithFullImage = async (profile, dispatch) => {
  dispatch(profileAction.updateProfile(profile));
};

export const updateListCategoryToStore = async (listCategory, dispatch) => {
  try {
    if (listCategory && listCategory.length > 0) {
      dispatch(categoriesAction.updateListCategories(listCategory));
    }
  } catch (error) {
    Swal.fire("Some thing wrong with network", "", "error");
  }
};

export const addNotificationsWithImg = async (listNoti, dispatch) => {
  if (listNoti && listNoti.length > 0) {
    const listNotiWithImg = [];
    Promise.all(
      listNoti.map(async (noti) => {
        if (noti.type === "Organization") {
          const organizationImgURL = await getURLImage(
            `userAvatar_${noti.notificationID}`
          );
          listNotiWithImg.push({
            ...noti,
            imgURL: organizationImgURL
              ? organizationImgURL
              : "/images/default-avatar.png",
          });
        } else if (noti.type === "Event") {
          const eventImgURL = await getURLImage(
            `EventCover_${noti.notificationID}`
          );
          listNotiWithImg.push({
            ...noti,
            imgURL: eventImgURL ? eventImgURL : "/images/default-avatar.png",
          });
        }
      })
    ).then(() => {
      dispatch(notificationAction.addNotiInLast3Days(listNotiWithImg));
    });
  }
};

export const addSingleNotificationWithImg = async (
  notification,
  docID,
  dispatch
) => {
  if (notification) {
    const listDate = Object.getOwnPropertyNames(notification);
    Object.values(notification).forEach(async (key, index) => {
      const id = docID.split("_")[0];
      const type = docID.split("_")[1];
      notification = {
        notificationID: id,
        date: listDate[index],
        message: key,
        type: type === "o" ? "Organization" : "Event",
      };
    });
    if (notification.type === "Organization") {
      const organizationImgURL = await getURLImage(
        `userAvatar_${notification.notificationID}`
      );
      const notificationWithImg = {
        ...notification,
        imgURL: organizationImgURL
          ? organizationImgURL
          : "/images/default-avatar.png",
      };
      dispatch(notificationAction.addNewNotification(notificationWithImg));
    } else if (notification.type === "Event") {
      const eventImgURL = await getURLImage(
        `EventCover_${notification.notificationID}`
      );
      const notificationWithImg = {
        ...notification,
        imgURL: eventImgURL ? eventImgURL : "/images/default-avatar.png",
      };
      dispatch(notificationAction.addNewNotification(notificationWithImg));
    }
  }
};

export const clearUnfollowNotification = (
  oldNotifications,
  type,
  id,
  dispatch
) => {
  const modifiedNotifications = oldNotifications.filter(
    (notification) =>
      notification.type !== type ||
      notification.notificationID !== id.toString()
  );
  dispatch(notificationAction.modifyListNotification(modifiedNotifications));
};
