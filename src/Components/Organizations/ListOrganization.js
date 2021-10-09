import Organization from "./Organization";

import styles from "./ListOrganizations.module.scss";
import { useEffect, useState } from "react";

const ListOrganization = (props) => {
  const [currentLList, setCurrentList] = useState([...props.listOrganization]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setCurrentList(props.listOrganization);
  }, [props.listOrganization]);

  const changeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const startSearch = () => {
    const searchedList = props.listOrganization.filter((organization) => {
      return organization.name
        .toUpperCase()
        .includes(searchValue.toUpperCase());
    });
    setCurrentList(searchedList);
  };

  return (
    <div className={`${styles.listOrganizations}`}>
      <div className={`${styles.listOrganizations__searchBar}`}>
        <input
          type="text"
          placeholder="Search organization name ..."
          onChange={changeSearchValue}
          value={searchValue}
        />
        <img
          src="/images/icon/search-icon.png"
          alt="search icon"
          onClick={startSearch}
        />
      </div>
      {currentLList.map((organization) => (
        <Organization information={organization} />
      ))}
    </div>
  );
};

export default ListOrganization;
