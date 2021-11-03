import Organization from "./Organization";

import styles from "./ListOrganizations.module.scss";
import { useEffect, useState } from "react";
import LoadingComponent from "../Loading/LoadingComponent";

const ListOrganization = (props) => {
  const [currentLList, setCurrentList] = useState([...props.listOrganization]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setCurrentList(props.listOrganization);
  }, [props.listOrganization]);

  useEffect(() => {
    const search = setTimeout(() => {
      const searchedList = props.listOrganization.filter((organization) => {
        return organization.name
          .toUpperCase()
          .includes(searchValue.toUpperCase());
      });
      setCurrentList(searchedList);
    }, 500);

    return function cleanup() {
      clearTimeout(search);
    };
  }, [props.listOrganization, searchValue]);

  const changeSearchValue = (event) => {
    const value = event.target.value;
    setSearchValue(value);
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
      {props.isLoading && <LoadingComponent />}
      {!props.isLoading && (
        <>
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
            <Organization
              key={`ORGANIZATION_${organization.id}`}
              information={organization}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListOrganization;
