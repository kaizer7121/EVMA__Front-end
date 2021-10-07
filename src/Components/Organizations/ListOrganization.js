import Organization from "./Organization";

import styles from "./ListOrganizations.module.scss";

const ListOrganization = (props) => {
  return (
    <div className={`${styles.listOrganizations}`}>
      <div className={`${styles.listOrganizations__searchBar}`}>
        <input type="text" placeholder="Search organization name ..." />
        <img src="/images/icon/search-icon.png" alt="search icon" />
      </div>
      {props.listOrganization.map((organization) => (
        <Organization information={organization} />
      ))}
    </div>
  );
};

export default ListOrganization;
