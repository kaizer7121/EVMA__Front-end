import styles from "./SearchEvent.module.scss";
import commonStyles from "../Auth/Auth.module.scss";
import { useEffect, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import { useSelector } from "react-redux";
import { searchEvent } from "../../Service/api/eventApi";
import CompactedEvent from "./CompactedEvent";

const SearchEvent = () => {
  const listCategory = useSelector((state) => state.categories.listCategory);

  const [searchedEvent, setSearchedEvent] = useState(["empty"]);
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
    emptyList: false,
    invalidData: {
      title: false,
      organizers: false,
      hashtags: false,
      date: false,
    },
  });
  const [listAvailableCategory, setListAvailableCategory] =
    useState(listCategory);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const availableCategories = listCategory.filter(
      (category) => !searchInfo.categories.includes(category.name)
    );
    setListAvailableCategory([...availableCategories]);
  }, [listCategory, searchInfo.categories]);

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
      if (newList.length < 10) {
        newList.push(value);
        setSearchInfo((prevValue) => ({
          ...prevValue,
          [type]: [...newList],
        }));
      }
      if (type === "categories") {
        setInputField((prevValue) => ({
          ...prevValue,
          categories: "default",
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

  const checkEmptyData = () => {
    return !(
      searchInfo.eventName.length === 0 &&
      searchInfo.categories.length === 0 &&
      searchInfo.organizations.length === 0 &&
      searchInfo.hashtags.length === 0 &&
      searchInfo.startDate.length === 0 &&
      searchInfo.endDate.length === 0
    );
  };

  const checkValidData = () => {
    let title = false;
    let organizers = false;
    let hashtags = false;
    let date = false;

    if (searchInfo.eventName.length > 50) {
      title = true;
    }
    searchInfo.organizations.forEach((organization) => {
      if (organization.length > 50) {
        organizers = true;
      }
    });
    searchInfo.hashtags.forEach((hashtag) => {
      if (hashtag.length > 25) {
        hashtags = true;
      }
    });

    if (
      searchInfo.startDate &&
      searchInfo.startDate.toString().length > 0 &&
      searchInfo.endDate &&
      searchInfo.endDate.toString().length > 0
    ) {
      let startDateAndTime = new Date(searchInfo.startDate);
      startDateAndTime = startDateAndTime.toISOString();

      let endDateAndTime = new Date(searchInfo.endDate);
      endDateAndTime = endDateAndTime.toISOString();

      if (endDateAndTime && endDateAndTime < startDateAndTime) {
        date = true;
      }
    }
    setNotification((prevValue) => ({
      ...prevValue,
      invalidData: {
        title,
        organizers,
        hashtags,
        date,
      },
    }));

    return !(title || organizers || date || hashtags);
  };

  const searchEventHandler = async () => {
    setNotification({
      emptyList: false,
      invalidData: {
        title: false,
        organizers: false,
        hashtags: false,
        date: false,
      },
    });
    if (checkValidData()) {
      if (checkEmptyData()) {
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
          setIsSearching(true);
          const response = await searchEvent(requestData);
          setSearchedEvent([...response.content]);
          setIsSearching(false);
        } catch (error) {
          alert("Error when send request to server");
          setIsSearching(false);
          console.log("ERROR when search event " + error);
        }

        setNotification((prevValue) => ({
          ...prevValue,
          emptyList: false,
        }));
      } else {
        setNotification((prevValue) => ({
          ...prevValue,
          emptyList: true,
        }));
      }
    }
  };

  return (
    <div className={`${styles.searchEvent}`}>
      <div className={`${styles.searchEvent__searchName}`}>
        <input
          type="text"
          placeholder="Search an event's title..."
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
                Choose categories
              </option>
              {listAvailableCategory.map((category, index) => (
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
              placeholder="Organization's name"
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
              placeholder="Hashtag's name"
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
      {notification.emptyList && (
        <p className={`${styles.searchEvent__error}`}>
          Can't search with empty information !
        </p>
      )}
      {notification.invalidData.title && (
        <p className={`${styles.searchEvent__error}`}>
          Title not exceed 50 characters
        </p>
      )}
      {notification.invalidData.organizers && (
        <p className={`${styles.searchEvent__error}`}>
          Each organizer not exceed 50 characters
        </p>
      )}
      {notification.invalidData.hashtags && (
        <p className={`${styles.searchEvent__error}`}>
          Each hashtag not exceed 25 characters
        </p>
      )}
      {notification.invalidData.date && (
        <p className={`${styles.searchEvent__error}`}>
          End date must be after start date
        </p>
      )}

      <div className={`${styles.searchEvent__seperator}`}>
        <span>Result</span>
        <hr />
      </div>
      <div className={`${styles.searchEvent__result}`}>
        {isSearching && (
          <div className={`${commonStyles.loader_icon_big}`}></div>
        )}
        {!isSearching &&
          searchedEvent[0] !== "empty" &&
          searchedEvent.length === 0 && (
            <h3 className={`${styles.searchEvent__result_empty}`}>
              Don't have any event suitable
            </h3>
          )}
        {!isSearching &&
          searchedEvent[0] !== "empty" &&
          searchedEvent.map((event) => (
            <CompactedEvent key={`CPEVENT_${event.id}`} information={event} />
          ))}
      </div>
    </div>
  );
};

export default SearchEvent;
