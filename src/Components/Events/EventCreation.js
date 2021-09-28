import { useState } from "react";

import CreationBar from "./CreationBar";
import InitEvent from "./InitEvent";
import { storage } from "../../Firebase";

import styles from "./EventCreation.module.scss";
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
    location: ["name1", "name2", "", ""],
    categories: ["Education", "Online", "Online", "Online", "Online", "Online", "Online", "Online", "Online", "Online"],
    summary: "",
    content: "",
    image: "",
    organization: "Unknown",
    otherOrganizations: "",
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
  console.log(eventInfo);
  const inputValue = (value, type) => {
    console.log(value);
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
    if (!isValid) {
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
