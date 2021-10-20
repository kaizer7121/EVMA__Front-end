import styles from "./SearchEvent.module.scss";
import commonStyles from "../Auth/Auth.module.scss";
import { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import { useSelector } from "react-redux";
import { searchEvent } from "../../Service/api/eventApi";
import CompactedEvent from "./CompactedEvent";

const SearchEvent = () => {
  const listCategory = useSelector((state) => state.categories.listCategory);

  const [searchedEvent, setSearchedEvent] = useState([]);
  const [searchInfo, setSearchInfo] = useState({
    eventName: "",
    categories: [],
    organizations: [],
    hashtags: [],
    startDate: "",
    endDate: "",
  });
  const [inputField, setInputField] = useState({
    categories: "default",
    organizations: "",
    hashtags: "",
  });
  const [notification, setNotification] = useState({
    invalidData: false,
    emptyList: false,
  });
  const inputSearchValue = (event) => {
    const value = event.target.value;
    setSearchInfo((prevValue) => ({
      ...prevValue,
      eventName: value,
    }));
  };

  const onDateChange = (value, type) => {
    setSearchInfo((prevValue) => ({
      ...prevValue,
      [type]: value,
    }));
  };

  const inputFieldHandler = (event, type) => {
    const value = event.target.value;
    setInputField((prevValue) => ({
      ...prevValue,
      [type]: value,
    }));
  };

  const addItemToList = (value, type) => {
    if (value.length > 0 && value !== "default") {
      const newList = [...searchInfo[type]];
      newList.push(value);
      setSearchInfo((prevValue) => ({
        ...prevValue,
        [type]: [...newList],
      }));
      if (type === "categories") {
        setInputField((prevValue) => ({
          ...prevValue,
        }));
      } else {
        setInputField((prevValue) => ({
          ...prevValue,
          [type]: "",
        }));
      }
    }
  };

  const removeItemFromList = (index, type) => {
    const newList = [...searchInfo[type]];
    newList.splice(index, 1);
    setSearchInfo((prevValue) => ({
      ...prevValue,
      [type]: [...newList],
    }));
  };

  const checkValidData = () => {
    return !(
      searchInfo.eventName.length === 0 &&
      searchInfo.categories.length === 0 &&
      searchInfo.organizations.length === 0 &&
      searchInfo.hashtags.length === 0 &&
      searchInfo.startDate.length === 0 &&
      searchInfo.endDate.length === 0
    );
  };

  const searchEventHandler = async () => {
    if (checkValidData()) {
      const categoryIds = [];
      searchInfo.categories.forEach((categoryName) => {
        listCategory.forEach((categoryInfo) => {
          if (categoryName === categoryInfo.name) {
            categoryIds.push(categoryInfo.id);
          }
        });
      });

      const requestData = {
        title: searchInfo.eventName,
        tags: searchInfo.hashtags,
        organizers: searchInfo.organizations,
        startDate:
          searchInfo.startDate.toString().length > 0
            ? searchInfo.startDate.toISOString()
            : "",
        endDate:
          searchInfo.endDate.toString().length > 0
            ? searchInfo.endDate.toISOString()
            : "",
        categories: [...categoryIds],
      };
      try {
        const response = await searchEvent(requestData);
        setSearchedEvent([...response.content]);
        console.log("RESPONSE");
        console.log(response);
      } catch (error) {
        alert("Error when send request to server");
        console.log("ERROR when search event " + error);
      }

      setNotification((prevValue) => ({
        ...prevValue,
        invalidData: false,
      }));
    } else {
      setNotification((prevValue) => ({
        ...prevValue,
        invalidData: true,
      }));
    }
  };
  console.log(searchedEvent);
  return (
    <div className={`${styles.searchEvent}`}>
      <div className={`${styles.searchEvent__searchName}`}>
        <input
          type="text"
          placeholder="Search event name..."
          value={searchInfo.eventName}
          onChange={inputSearchValue}
        />
        <button
          className={`${commonStyles.btn} ${commonStyles.btn_primary}`}
          onClick={searchEventHandler}
        >
          Search
        </button>
      </div>
      <div className={`${styles.searchEvent__searchDetail}`}>
        <div className={`${styles.searchEvent__searchDetail_type}`}>
          <div className={`${styles.searchEvent__searchDetail_type_topic}`}>
            <h3>Categories:</h3>
            <select
              className={`${styles.searchEvent__searchDetail_type_select}`}
              value={inputField.categories}
              onChange={(event) => {
                inputFieldHandler(event, "categories");
              }}
            >
              <option value="default" disabled hidden>
                Choose category
              </option>
              {listCategory.map((category, index) => (
                <option key={`CATEGORY_${index}`} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <div
              className={`${styles.searchEvent__searchDetail_addButton}`}
              onClick={() => {
                addItemToList(inputField.categories, "categories");
              }}
            >
              <img src="/images/icon/plus-icon.png" alt="Add" />
              <span>Add</span>
            </div>
          </div>
          {searchInfo.categories.map((category, index) => (
            <p
              key={`CATEGORY_${(index, index)}`}
              className={`${styles.searchEvent__searchDetail_item} ${styles.category_color}`}
              onClick={() => {
                removeItemFromList(index, "categories");
              }}
            >
              {category}
            </p>
          ))}
        </div>
        <div className={`${styles.searchEvent__searchDetail_type}`}>
          <div className={`${styles.searchEvent__searchDetail_type_topic}`}>
            <h3>Organizers:</h3>
            <input
              type="text"
              placeholder="Organization name"
              className={`${styles.searchEvent__searchDetail_type_input}`}
              onChange={(event) => {
                inputFieldHandler(event, "organizations");
              }}
              value={inputField.organizations}
            />
            <div
              className={`${styles.searchEvent__searchDetail_addButton}`}
              onClick={() => {
                addItemToList(inputField.organizations, "organizations");
              }}
            >
              <img src="/images/icon/plus-icon.png" alt="Add" />
              <span>Add</span>
            </div>
          </div>
          {searchInfo.organizations.map((organization, index) => (
            <p
              key={`ORGANIZATION_${index}`}
              className={`${styles.searchEvent__searchDetail_item} ${styles.organization_color}`}
              onClick={() => {
                removeItemFromList(index, "organizations");
              }}
            >
              {organization}
            </p>
          ))}
        </div>

        <div className={`${styles.searchEvent__searchDetail_type}`}>
          <div className={`${styles.searchEvent__searchDetail_type_topic}`}>
            <h3>Hashtags:</h3>
            <input
              type="text"
              placeholder="Hashtag name"
              className={`${styles.searchEvent__searchDetail_type_input}`}
              onChange={(event) => {
                inputFieldHandler(event, "hashtags");
              }}
              value={inputField.hashtags}
            />
            <div
              className={`${styles.searchEvent__searchDetail_addButton}`}
              onClick={() => {
                addItemToList(`#${inputField.hashtags}`, "hashtags");
              }}
            >
              <img src="/images/icon/plus-icon.png" alt="Add" />
              <span>Add</span>
            </div>
          </div>
          {searchInfo.hashtags.map((hashtag, index) => (
            <p
              key={`HASHTAG_${index}`}
              className={`${styles.searchEvent__searchDetail_item} ${styles.hashtag_color}`}
              onClick={() => {
                removeItemFromList(index, "hashtags");
              }}
            >
              {hashtag}
            </p>
          ))}
        </div>
        <div className={`${styles.searchEvent__searchDetail_type}`}>
          <div className={`${styles.searchEvent__searchDetail_datePicker}`}>
            <div>
              <h3>Start date:</h3>
              <DayPickerInput
                format={"DD/MM/yyyy"}
                formatDate={formatDate}
                parseDate={parseDate}
                placeholder=""
                onDayChange={(date) => {
                  if (date === undefined) date = "";
                  onDateChange(date, "startDate");
                }}
                value={searchInfo.startDate}
              />
            </div>

            <div>
              <h3>End date: </h3>
              <DayPickerInput
                format={"DD/MM/yyyy"}
                formatDate={formatDate}
                parseDate={parseDate}
                placeholder=""
                onDayChange={(date) => {
                  if (date === undefined) date = "";
                  onDateChange(date, "endDate");
                }}
                value={searchInfo.endDate}
              />
            </div>
          </div>
        </div>
      </div>
      {notification.invalidData && (
        <p className={`${styles.searchEvent__error}`}>
          Can't search with empty information !
        </p>
      )}

      <div className={`${styles.searchEvent__seperator}`}>
        <span>Result</span>
        <hr />
      </div>
      <div className={`${styles.searchEvent__reuslt}`}>
        {searchedEvent.map((event) => (
          <CompactedEvent key={`CPEVENT_${event.id}`} information={event} />
        ))}
      </div>
    </div>
  );
};

export default SearchEvent;
