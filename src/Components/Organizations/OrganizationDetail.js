import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getURLImage } from "../../Service/firebaseFunctions";
import CompactedEvent from "../Events/CompactedEvent";
import styles from "./OrganizationDetail.module.scss";

const DUMMY_DATA = {
  title: "Diễn Đàn Sinh Viên Nghiên Cứu Khoa Học",
  shortDescription:
    "⭐ Diễn đàn Sinh viên Nghiên cứu Khoa học 2021 do Dự án Tập huấn NCKH/CLB Nghiên cứu Tâm lý học - Giáo dục học tổ chức. Nội dung trao đổi & báo cáo kết quả NCKH" +
    " của học viên tham gia chuỗi tập huấn NCKH SPE. Xoay quanh những vấn đề mang tính thời sự hiện nay trong lĩnh vực Tâm lý & Giáo dục 🎫",
  categories: ["Science", "Education", "Psychology"],
  image:
    "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/106504737_2722347444536344_728271756182488456_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8631f5&_nc_ohc=sojVDo3kAzUAX_VsoLg&_nc_ht=scontent.fsgn3-1.fna&oh=caf9c7e799dd4228b712c0e7df4f523c&oe=6179C8A8",
};

const OrganizationDetail = (props) => {
  const [avatarURL, setAvatarURL] = useState("/images/default-avatar.png");
  const [backgroundURL, setBackgroundURL] = useState(
    "/images/default-cover.jpg"
  );

  const description = props.information.summary
    ? props.information.summary.split("\n")
    : [];
  useEffect(() => {
    const getURLAvatar = async () => {
      const fileName = props.information.avatarURL;
      await getURLImage(fileName, setAvatarURL);
    };
    const getURLBackGround = async () => {
      const fileName = props.information.backgroundURL;
      await getURLImage(fileName, setBackgroundURL);
    };
    
    getURLAvatar();
    getURLBackGround();
  }, [props.information.avatarURL, props.information.backgroundURL]);

  return (
    <div className={`${styles.organizationDetail}`}>
      <div className={`${styles.organizationDetail__image}`}>
        <img
          src={backgroundURL}
          alt="cover"
          className={`${styles.organizationDetail__image_cover}`}
        />
        <div className={`${styles.organizationDetail__image_avatar}`}>
          <img src={avatarURL} alt="avatar" />
          <h3>{props.information.name}</h3>
        </div>
      </div>
      <hr />
      <div className={`${styles.organizationDetail__description}`}>
        <div className={`${styles.organizationDetail__description_part}`}>
          <h3 className={`${styles.organizationDetail__description_topic}`}>
            Description:{" "}
          </h3>
          <p className={`${styles.organizationDetail__description_param}`}></p>
          {description.map((sentence) => (
            <p className={`${styles.organizationDetail__description_param}`}>
              {sentence}
            </p>
          ))}
        </div>
        <div className={`${styles.organizationDetail__description_part}`}>
          <h3 className={`${styles.organizationDetail__description_topic}`}>
            Related events:{" "}
          </h3>
          <div className={`${styles.organizationDetail__relatedEvent}`}>
            <CompactedEvent />
            <CompactedEvent />
            <CompactedEvent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetail;
