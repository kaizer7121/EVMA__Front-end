import { useEffect, useState } from "react";

import CreationBar from "./CreationBar";
import InitEvent from "./InitEvent";
import LoadingComponent from "../Loading/LoadingComponent";
import ConfirmImage from "../Popup/ConfirmImage";
import { uploadImgToStorage } from "../../Service/firebaseFunctions";
import { createEvent, editEvent } from "../../Service/api/eventApi";
import { useHistory } from "react-router";
import { converISOToOnlyDate, validURL } from "../../Service/functions";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const EventCreation = (props) => {
  const profileName = useSelector((state) => state.profile.name);
  const type = props.initialInformation ? "Edit" : "Create";
  const [imageAsFile, setImageAsFile] = useState("");
  const [eventInfo, setEventInfo] = useState({
    title: type === "Edit" ? props.initialInformation.title : "",
    startDate:
      type === "Edit"
        ? converISOToOnlyDate(props.initialInformation.startDate)
        : "",
    startTime: "",
    endDate:
      type === "Edit" && props.initialInformation.endDate
        ? converISOToOnlyDate(props.initialInformation.endDate)
        : "",
    endTime: "",
    locationName:
      type === "Edit" ? props.initialInformation.initLocationName : [""],
    locationDetail:
      type === "Edit" ? props.initialInformation.initLocationDetail : [""],
    hashtag: type === "Edit" ? props.initialInformation.tags : [""],
    categories: type === "Edit" ? props.initialInformation.categories : [],
    summary: type === "Edit" ? props.initialInformation.summary : "",
    content: type === "Edit" ? props.initialInformation.content : "",
    image: type === "Edit" ? props.initialInformation.coverURL : "",
    organization: props.profileName,
    otherOrganizations:
      type === "Edit" ? props.initialInformation.otherOrganizations : [""],
    isOnlineEvent: type === "Edit" ? props.initialInformation.online : false,
  });
  const [croppingImage, setCroppingImage] = useState({ empty: true });
  const [eventError, setEventError] = useState({
    title: false,
    start: false,
    end: false,
    dateCompare: false,
    checkPastTime: false,
    location: false,
    categories: false,
    summary: false,
    content: false,
    image: false,
    hashtag: false,
    tagLength: false,
    otherOrganizations: false,
    otherOrganizationsLength: false,
  });
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const history = useHistory();
  useEffect(() => {
    setEventInfo((prevValue) => ({ ...prevValue, organization: profileName }));
  }, [profileName]);

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
    let dateCompare = false;
    let checkPastTime = false;
    let location = false;
    let categories = false;
    let summary = false;
    let content = false;
    let image = false;
    let hashtag = false;
    let tagLength = false;
    let otherOrganizations = false;
    let otherOrganizationsLength = false;

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
      if (tag.length > 25) tagLength = true;
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
    eventInfo.otherOrganizations.forEach((organization, index) => {
      if (index > 0 && organization.length === 0) otherOrganizations = true;
      if (organization.length > 50) otherOrganizationsLength = true;
    });

    // Process date to check
    if (!start && !end) {
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

      if (endDateAndTime && endDateAndTime < startDateAndTime) {
        dateCompare = true;
      }
    }

    if (!start) {
      let startDateAndTime = new Date(eventInfo.startDate);
      const startTimeSplit = eventInfo.startTime.split(":");
      startDateAndTime.setHours(+startTimeSplit[0], startTimeSplit[1]);
      startDateAndTime = startDateAndTime.toISOString();

      let currentDate = new Date();
      currentDate = currentDate.toISOString();
      if (startDateAndTime < currentDate) {
        checkPastTime = true;
      }
    }

    if (!end) {
      if (
        !eventError.end &&
        eventInfo.endDate.toString().length > 0 &&
        eventInfo.endTime.length > 0
      ) {
        let endDateAndTime = new Date(eventInfo.endDate);
        const endTimeSplit = eventInfo.endTime.split(":");
        endDateAndTime.setHours(+endTimeSplit[0], endTimeSplit[1]);
        endDateAndTime = endDateAndTime.toISOString();

        let currentDate = new Date();
        currentDate = currentDate.toISOString();
        if (endDateAndTime < currentDate) {
          checkPastTime = true;
        }
      }
    }

    setEventError({
      title,
      start,
      end,
      dateCompare,
      checkPastTime,
      location,
      categories,
      summary,
      content,
      image,
      hashtag,
      tagLength,
      otherOrganizations,
      otherOrganizationsLength,
    });
    return !(
      title ||
      start ||
      end ||
      dateCompare ||
      checkPastTime ||
      location ||
      categories ||
      summary ||
      content ||
      image ||
      hashtag ||
      tagLength ||
      otherOrganizations ||
      otherOrganizationsLength
    );
  };

  const onCancel = () => {
    history.goBack();
  };

  const removeCategory = (index) => {
    const newCategories = [...eventInfo.categories];
    newCategories.splice(index, 1);
    setEventInfo((prevValue) => ({ ...prevValue, categories: newCategories }));
  };

  const onSubmitEvent = async (type) => {
    const isValid = checkValidEventHandler();
    if (isValid) {
      setIsSendingRequest(true);
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
        eventInfo.hashtag.length === 1 && eventInfo.hashtag[0] !== ""
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

      // Process addresses
      const addresses = [];
      eventInfo.locationDetail.forEach((location, index) => {
        addresses.push({
          name: eventInfo.locationName[index],
          fullText: eventInfo.locationDetail[index],
          url: validURL(location),
        });
      });

      // Process other orginaztions
      const otherOrganizations =
        eventInfo.otherOrganizations.length === 1 &&
        eventInfo.otherOrganizations[0] === ""
          ? []
          : eventInfo.otherOrganizations;

      const requestData = {
        title: eventInfo.title,
        categoryIds,
        tags,
        organizerNames: [eventInfo.organization, ...otherOrganizations],
        online: eventInfo.isOnlineEvent,
        startDate: startDateAndTime,
        endDate: endDateAndTime,
        statusId: type === "PUBLISH" ? 1 : 2,
        summary: eventInfo.summary,
        content: eventInfo.content,
        addresses,
      };

      try {
        const actionType = props.initialInformation ? "Edit" : "Create";
        let responseData = {};
        let fileName = "";
        if (actionType === "Edit") {
          const eventID = props.initialInformation.id;
          responseData = await editEvent(requestData, eventID);
          fileName = `EventCover_${eventID}`;
        } else if (actionType === "Create") {
          responseData = await createEvent(requestData);
          fileName = responseData.coverURL;
        }
        if (responseData.status !== 400) {
          const message =
            actionType === "Edit"
              ? "Edit successfully"
              : type === "PUBLISH"
              ? "Create successfully"
              : "Save to draft successfully";
          if (imageAsFile && imageAsFile.size > 0) {
            uploadImgToStorage(imageAsFile, fileName).then(() => {
              setIsSendingRequest(false);
              Swal.fire(message, "", "success").then(() => {
                history.push("/event");
              });
            });
          } else {
            setIsSendingRequest(false);
            Swal.fire(message, "", "success").then(() => {
              history.push("/event");
            });
          }
        } else {
          Swal.fire("Something wrong went send request to server", "", "error").then(() => {
            window.location.reload();
          });
          
        }
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
        if (operations === "ADD" && newHashTag.length < 10) {
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
    <>
      {props.isLoading && <LoadingComponent />}
      {!props.isLoading && (
        <div>
          <CreationBar
            categoriesInDB={props.categoriesInDB}
            eventError={eventError}
            inputValue={inputValue}
            addEmoji={addEmoji}
            uploadImage={uploadImage}
            information={eventInfo}
            onSubmit={onSubmitEvent}
            onCancel={onCancel}
            removeCategory={removeCategory}
            changeMultiInput={changeMultiInput}
            changeMultiInputValue={changeMultiInputValue}
            changeToggleButtonHandler={changeToggleButtonHandler}
            isSendingRequest={isSendingRequest}
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
      )}
    </>
  );
};

export default EventCreation;
