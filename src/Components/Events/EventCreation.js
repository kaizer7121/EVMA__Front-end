import { useState } from "react";

import CreationBar from "./CreationBar";
import InitEvent from "./InitEvent";

import ConfirmImage from "../Popup/ConfirmImage";
import { uploadImgToStorage } from "../Service/firebaseFunctions";

const EventCreation = () => {
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
    categories: ["Education", "Online"],
    summary: "",
    content: "",
    image: "",
    organization: "Unknown",
    otherOrganizations: [""],
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
  });
  const inputValue = (value, type) => {
    setEventInfo((prevValue) => ({ ...prevValue, [type]: value }));
  };

  const addEmoji = (emoji, type) => {
    const data = type === "summary" ? eventInfo.summary : eventInfo.content;
    setEventInfo((prevValue) => ({ ...prevValue, [type]: data + emoji }));
  };

  const uploadImage = (e, type) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      console.log("UPLOAD");
      setCroppingImage({ files: e.target.files, type });
    }
    // const value =
    //   "https://scontent.fsgn8-1.fna.fbcdn.net/v/t39.30808-6/242145009_222288139941640_6679877824071632444_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=340051&_nc_ohc=GDEukTT17DoAX-iw0PH&tn=AcLQveYFpgLxAnDM&_nc_ht=scontent.fsgn8-1.fna&oh=632f09b64830fbf22d075142cd6e8141&oe=614D4AD3";
    // setEventInfo((prevValue) => ({ ...prevValue, image: value }));
  };

  const onCloseCropping = () => {
    setCroppingImage({ empty: true });
  };

  const onConfirmCroppedImg = (blob) => {
    const imgSrc = URL.createObjectURL(blob);
    setEventInfo((prevValue) => ({ ...prevValue, image: imgSrc }));
    console.log("TEST:");
    setImageAsFile(blob);
    setCroppingImage({ empty: true });
  };

  const checkValidEventHandler = () => {
    let isError = false;
    let title = false;
    let start = false;
    let end = false;
    let location = false;
    let categories = false;
    let summary = false;
    let content = false;
    let image = false;

    if (
      eventInfo.title === undefined ||
      eventInfo.title.length < 3 ||
      eventInfo.title.length > 50
    ) {
      title = true;
      isError = true;
    }
    if (
      eventInfo.startDate === undefined ||
      eventInfo.startTime === undefined ||
      eventInfo.startDate.length === 0 ||
      eventInfo.startTime.length === 0
    ) {
      start = true;
      isError = true;
    }
    if (
      (eventInfo.endDate.length === 0 && eventInfo.endTime.length !== 0) ||
      (eventInfo.endDate.length !== 0 && eventInfo.endTime.length === 0)
    ) {
      console.log(eventInfo.endTime !== undefined);
      end = true;
      isError = true;
    }
    if (eventInfo.location === undefined || eventInfo.location.length === 0) {
      location = true;
      isError = true;
    }
    if (
      eventInfo.categories === undefined ||
      eventInfo.categories.length === 0
    ) {
      categories = true;
      isError = true;
    }
    if (
      eventInfo.summary === undefined ||
      eventInfo.summary.length === 0 ||
      eventInfo.summary.length > 140
    ) {
      summary = true;
      isError = true;
    }
    if (
      eventInfo.content === undefined ||
      eventInfo.content.length === 0 ||
      eventInfo.content.length > 2500
    ) {
      content = true;
      isError = true;
    }
    if (eventInfo.image === undefined || eventInfo.image.length === 0) {
      image = true;
      isError = true;
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
    });

    return isError;
  };

  const onSubmitEvent = async () => {
    const isValid = !checkValidEventHandler();
    if (isValid) {
      console.log("SEND REQUEST TO CREATE");
      const fileName = "cover.png";
      const imageAsUrl = await uploadImgToStorage(imageAsFile, fileName);
      console.log(imageAsUrl);
      setImageAsUrl(imageAsUrl);
    }
  };
  const onSavetoDraft = () => {
    const isValid = !checkValidEventHandler();
    if (isValid) {
      console.log("SEND REQUEST TO SAVE");
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

  return (
    <div>
      <CreationBar
        eventError={eventError}
        inputValue={inputValue}
        addEmoji={addEmoji}
        uploadImage={uploadImage}
        information={eventInfo}
        onSubmit={onSubmitEvent}
        onSavetoDraft={onSavetoDraft}
        changeMultiInput={changeMultiInput}
        changeMultiInputValue={changeMultiInputValue}
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
