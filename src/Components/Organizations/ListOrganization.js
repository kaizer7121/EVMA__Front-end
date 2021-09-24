import Organization from "./Organization";

import styles from "./ListOrganizations.module.scss";

const ListOrganization = () => {
  return (
    <div className={`${styles.listOrganizations}`}>
      <div className={`${styles.listOrganizations__searchBar}`}>
        <input type="text" placeholder="Search organization name ..." />
        <img src="/images/icon/search-icon.png" alt="search icon" />
      </div>
      <Organization />
      <Organization />
      <Organization />
      <Organization />
    </div>
  );
};

export default ListOrganization;
