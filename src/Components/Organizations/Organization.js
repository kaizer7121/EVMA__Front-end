import styles from "./Organization.module.scss";

const DUMMY_DATA = {
  name: "F-Code",
  sumary:
    "F-code là CLB về học thuật, là nơi tập trung của những con người có chung niềm đam mê về lập trình, nhưng ngoài code ra thì các thành viên của CLB vẫn có những niềm đam mê và sở thích khác",
  avatar:
    "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/241277567_2935941399955753_2523832604141178857_n.png?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=hEQOfPorBzEAX9QLz0Z&_nc_ht=scontent.fsgn8-2.fna&oh=489b1b6b0df44fbe4231a9ddb83bfbfb&oe=615233B9",
};

const Organization = (props) => {
  return (
    <div className={`${styles.organization}`}>
      <img src={DUMMY_DATA.avatar} alt="logo" />
      <div className={styles.organization__information}>
        <h3>{DUMMY_DATA.name}</h3>
        <p>{DUMMY_DATA.sumary}</p>
      </div>
      <div className={styles.organization__button}>
        <button
          type="submit"
          className={`${styles.organization__button__btn} ${styles.organization__button__btn_primary}`}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default Organization;
