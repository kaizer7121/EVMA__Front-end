import { useState } from "react";

import CreationBar from "./CreationBar";
import InitEvent from "./InitEvent";

import styles from "./EventCreation.module.scss";

const EventCreation = () => {
  const [eventInfo, setEventInfo] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    categories: ["Education", "Online"],
    shortDescription: "",
    description: "",
    image: "",
    organization: "Unknown",
  });

  const inputValue = (value, type) => {
    setEventInfo((prevValue) => ({ ...prevValue, [type]: value }));
  };

  const addEmoji = (emoji, type) => {
    const data =
      type === "shortDescription"
        ? eventInfo.shortDescription
        : eventInfo.description;
    setEventInfo((prevValue) => ({ ...prevValue, [type]: data + emoji }));
  };

  const uploadImage = () => {
    console.log("UP");
    const value =
      "https://scontent.fsgn8-1.fna.fbcdn.net/v/t39.30808-6/242145009_222288139941640_6679877824071632444_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=340051&_nc_ohc=GDEukTT17DoAX-iw0PH&tn=AcLQveYFpgLxAnDM&_nc_ht=scontent.fsgn8-1.fna&oh=632f09b64830fbf22d075142cd6e8141&oe=614D4AD3";
    setEventInfo((prevValue) => ({ ...prevValue, image: value }));
  };

  return (
    <div>
      <CreationBar
        inputValue={inputValue}
        addEmoji={addEmoji}
        uploadImage={uploadImage}
        information={eventInfo}
      />
      <InitEvent information={eventInfo} />
    </div>
  );
};

export default EventCreation;
