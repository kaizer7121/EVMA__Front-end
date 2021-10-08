import { useState } from "react";

import CreationBar from "./CreationBar";
import InitEvent from "./InitEvent";

import ConfirmImage from "../Popup/ConfirmImage";
import {
  getURLImage,
  uploadImgToStorage,
} from "../../Service/firebaseFunctions";
import { createEvent } from "../../Service/api/eventApi";
import { useHistory } from "react-router";

const EventCreation = (props) => {
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [eventInfo, setEventInfo] = useState({
    title: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    locationName: [""],
    locationDetail: [""],
    hashtag: [""],
    categories: [],
    summary: "",
    content: "",
    image: "",
    organization: "Unknown",
    otherOrganizations: [""],
    isOnlineEvent: false,
  });
  const [croppingImage, setCroppingImage] = useState({ empty: true });
  const [eventError, setEventError] = useState({
    title: false,
    start: false,
    end: false,
    location: false,
    categories: false,
    summary: false,
    content: false,
    image: false,
    hashtag: false,
  });

  const history = useHistory();

  const inputValue = (value, type) => {
    if (type === "categories") {
      const newCategories = [...eventInfo.categories];
      newCategories.push(value);
      setEventInfo((prevValue) => ({
        ...prevValue,
        categories: newCategories,
      }));
    } else {
      setEventInfo((prevValue) => ({ ...prevValue, [type]: value }));
    }
  };

  const addEmoji = (emoji, type) => {
    const data = type === "summary" ? eventInfo.summary : eventInfo.content;
    setEventInfo((prevValue) => ({ ...prevValue, [type]: data + emoji }));
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
    setEventInfo((prevValue) => ({ ...prevValue, image: imgSrc }));
    setImageAsFile(blob);
    setCroppingImage({ empty: true });
  };

  const checkValidEventHandler = () => {
    let title = false;
    let start = false;
    let end = false;
    let location = false;
    let categories = false;
    let summary = false;
    let content = false;
    let image = false;
    let hashtag = false;

    if (
      eventInfo.title === undefined ||
      eventInfo.title.length < 3 ||
      eventInfo.title.length > 50
    ) {
      title = true;
    }
    if (
      eventInfo.startDate === undefined ||
      eventInfo.startTime === undefined ||
      eventInfo.startDate.length === 0 ||
      eventInfo.startTime.length === 0
    ) {
      start = true;
    }
    if (
      (eventInfo.endDate.length === 0 && eventInfo.endTime.length !== 0) ||
      (eventInfo.endDate.length !== 0 && eventInfo.endTime.length === 0)
    ) {
      end = true;
    }
    eventInfo.locationName.forEach((info, index) => {
      if (info.length === 0 || eventInfo.locationDetail[index].length === 0) {
        location = true;
      }
    });
    eventInfo.hashtag.forEach((tag, index) => {
      if (index > 0 && tag.length === 0) hashtag = true;
    });
    if (
      eventInfo.categories === undefined ||
      eventInfo.categories.length === 0 ||
      eventInfo.categories.length > 10
    ) {
      categories = true;
    }
    if (
      eventInfo.summary === undefined ||
      eventInfo.summary.length === 0 ||
      eventInfo.summary.length > 250
    ) {
      summary = true;
    }
    if (
      eventInfo.content === undefined ||
      eventInfo.content.length === 0 ||
      eventInfo.content.length > 4000
    ) {
      content = true;
    }
    if (eventInfo.image === undefined || eventInfo.image.length === 0) {
      image = true;
    }

    setEventError({
      title,
      start,
      end,
      location,
      categories,
      summary,
      content,
      image,
      hashtag,
    });
    return !(
      title ||
      start ||
      end ||
      location ||
      categories ||
      summary ||
      content ||
      image ||
      hashtag
    );
  };

  const onSubmitEvent = async (type) => {
    const isValid = checkValidEventHandler();
    getURLImage("test");
    if (isValid) {
      // Process category
      const categoryIds = [];
      eventInfo.categories.forEach((categoryName) => {
        props.categoriesInDB.forEach((categoryInfo) => {
          if (categoryName === categoryInfo.name) {
            categoryIds.push(categoryInfo.id);
          }
        });
      });

      // Process hashtag
      const tags =
        eventInfo.hashtag[0] !== ""
          ? eventInfo.hashtag.map((tag) => `#${tag}`)
          : [];

      // Process date
      let startDateAndTime = new Date(eventInfo.startDate);
      const startTimeSplit = eventInfo.startTime.split(":");
      startDateAndTime.setHours(+startTimeSplit[0] + 7, startTimeSplit[1]);
      startDateAndTime = startDateAndTime.toISOString();

      let endDateAndTime = null;

      if (
        !eventError.end &&
        eventInfo.endDate.toString().length > 0 &&
        eventInfo.endTime.length > 0
      ) {
        endDateAndTime = new Date(eventInfo.endDate);
        const endTimeSplit = eventInfo.endTime.split(":");
        endDateAndTime.setHours(+endTimeSplit[0] + 7, endTimeSplit[1]);
        endDateAndTime = endDateAndTime.toISOString();
      }

      const requestData = {
        title: eventInfo.title,
        categoryIds,
        tags,
        organizerNames: [
          eventInfo.organization,
          ...eventInfo.otherOrganizations,
        ],
        online: eventInfo.isOnlineEvent,
        startDate: startDateAndTime,
        endDate: endDateAndTime,
        statusId: type === "PUBLISH" ? 1 : 3,
        summary: eventInfo.summary,
        content: eventInfo.content,
      };
      try {
        const responseData = await createEvent(requestData);
        const fileName = responseData.coverURL;
        uploadImgToStorage(imageAsFile, fileName).then(() => {
          history.push("/event");
        });
      } catch (error) {
        console.log("Error when create event " + error);
      }
    } else {
      console.log("FAIL");
    }
  };

  const changeMultiInput = (type, operations) => {
    switch (type) {
      case "LOCATION": {
        const newLocationName = [...eventInfo.locationName];
        const newLocationDetail = [...eventInfo.locationDetail];
        if (operations === "ADD") {
          newLocationName.push("");
          newLocationDetail.push("");
        } else if (operations === "REMOVE") {
          newLocationName.splice(-1);
          newLocationDetail.splice(-1);
        }

        setEventInfo((prevValue) => ({
          ...prevValue,
          locationName: newLocationName,
          locationDetail: newLocationDetail,
        }));
        break;
      }
      case "HASHTAG": {
        const newHashTag = [...eventInfo.hashtag];
        if (operations === "ADD") {
          newHashTag.push("");
        } else if (operations === "REMOVE") {
          newHashTag.splice(-1);
        }

        setEventInfo((prevValue) => ({
          ...prevValue,
          hashtag: newHashTag,
        }));
        break;
      }
      case "OTHER_ORGANIZATIONS": {
        const newOtherOrganizations = [...eventInfo.otherOrganizations];
        if (operations === "ADD") {
          newOtherOrganizations.push("");
        } else if (operations === "REMOVE") {
          newOtherOrganizations.splice(-1);
        }

        setEventInfo((prevValue) => ({
          ...prevValue,
          otherOrganizations: newOtherOrganizations,
        }));
        break;
      }
      default:
        return;
    }
  };

  const changeMultiInputValue = (value, type, index) => {
    switch (type) {
      case "LOCATIONNAME": {
        let newLocationName = [...eventInfo.locationName];
        newLocationName[index] = value;
        setEventInfo((prevValue) => ({
          ...prevValue,
          locationName: newLocationName,
        }));
        break;
      }
      case "LOCATIONDETAIL": {
        let newLocationDetail = [...eventInfo.locationDetail];
        newLocationDetail[index] = value;
        setEventInfo((prevValue) => ({
          ...prevValue,
          locationDetail: newLocationDetail,
        }));
        break;
      }
      case "HASHTAG": {
        let newHashTag = [...eventInfo.hashtag];
        newHashTag[index] = value;
        setEventInfo((prevValue) => ({
          ...prevValue,
          hashtag: newHashTag,
        }));
        break;
      }
      case "OTHER_ORGANIZATIONS": {
        let newOtherOrganizations = [...eventInfo.otherOrganizations];
        newOtherOrganizations[index] = value;
        setEventInfo((prevValue) => ({
          ...prevValue,
          otherOrganizations: newOtherOrganizations,
        }));
        break;
      }
      default:
        return;
    }
  };

  const changeToggleButtonHandler = (type) => {
    if (type === "ONLINE_EVENT") {
      const oldValue = eventInfo.isOnlineEvent;
      setEventInfo((prevValue) => ({
        ...prevValue,
        isOnlineEvent: !oldValue,
      }));
    }
  };

  return (
    <div>
      <CreationBar
        categoriesInDB={props.categoriesInDB}
        eventError={eventError}
        inputValue={inputValue}
        addEmoji={addEmoji}
        uploadImage={uploadImage}
        information={eventInfo}
        onSubmit={onSubmitEvent}
        changeMultiInput={changeMultiInput}
        changeMultiInputValue={changeMultiInputValue}
        changeToggleButtonHandler={changeToggleButtonHandler}
      />
      <InitEvent information={eventInfo} />
      {croppingImage && !croppingImage.empty && (
        <ConfirmImage
          information={croppingImage}
          onClose={onCloseCropping}
          onConfirm={onConfirmCroppedImg}
        />
      )}
    </div>
  );
};

export default EventCreation;
