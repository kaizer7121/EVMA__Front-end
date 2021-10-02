import Event from "./Event";

import { useEffect, useState, useCallback } from "react";

import styles from "./ListEvent.module.scss";

const DUMMY_DATA = [
  {
    title: "Diễn Đàn Sinh Viên Nghiên Cứu Khoa Học",
    shortDescription:
      "⭐ Diễn đàn Sinh viên Nghiên cứu Khoa học 2021 do Dự án Tập huấn NCKH/CLB Nghiên cứu Tâm lý học - Giáo dục học tổ chức. Nội dung trao đổi & báo cáo kết quả NCKH" +
      " của học viên tham gia chuỗi tập huấn NCKH SPE. Xoay quanh những vấn đề mang tính thời sự hiện nay trong lĩnh vực Tâm lý & Giáo dục 🎫",
    categories: ["Science", "Education", "Psychology"],
    image:
      "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/106504737_2722347444536344_728271756182488456_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8631f5&_nc_ohc=sojVDo3kAzUAX_VsoLg&_nc_ht=scontent.fsgn3-1.fna&oh=caf9c7e799dd4228b712c0e7df4f523c&oe=6179C8A8",
  },
  {
    title:
      "Livestream Sự kiện raự kiện ra mắt vivo X70 Pro 5G | Định Hình Rung Động",
    shortDescription:
      "Dòng flagship cao cấp mới nhất của vivo sẽ chính thức được định hình cùng những công nghệ tiên phong cải tiến nhất: \n 🔹Hệ thống ống kính quang học ZEISS với lớp phủ T*" +
      "\n🔹Camera Chống Rung Gimbal 3.0 cùng với Siêu Cảm Biến \n 🔹Và còn rất nhiều những công nghệ mới sẽ được giới thiệu trong sự kiện này.",
    categories: ["Technology", "Vivo", "Smartphone", "Release"],
    image:
      "https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/242166585_4252396944873177_1541195065146400886_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=340051&_nc_ohc=ZwUdQ5XYNtYAX8q2H-Y&_nc_ht=scontent.fsgn8-2.fna&oh=5c3df28a29da8257112d0f3a7aa44acb&oe=616CA13B",
  },
  {
    title: "Tư vấn cùng chuyên gia, chủ đề: Trầm cảm",
    shortDescription:
      "Báo cáo viên: ThS.BS. Vũ Sơn Tùng và ThS.BS. Trịnh Thị Vân Anh - Viện Sức khỏe Tâm thần, Bệnh viện Bạch Mai \n Chủ đề: Trầm cảm",
    categories: ["Healthy", "Education", "Psychology"],
    image:
      "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/241390112_2976639862579617_1690972362834424290_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=340051&_nc_ohc=aCPKF5vr3SAAX8oaMqD&_nc_ht=scontent.fsgn3-1.fna&oh=f175309efa0bd3f547227efaf68f5979&oe=616CD77A",
  },
];

const ListEvent = () => {
  const [listEvent, setListEvent] = useState(DUMMY_DATA);

  const trackScrolling = useCallback(() => {
    const wrappedElement = document.getElementById("header");

    if (wrappedElement) {
      const isBottom =
        wrappedElement.getBoundingClientRect().bottom * 0.8 <=
        window.innerHeight;

      if (isBottom) {
        const newEvent = {
          title: "Tư vấn cùng chuyên gia, chủ đề: Trầm cảm",
          shortDescription:
            "Báo cáo viên: ThS.BS. Vũ Sơn Tùng và ThS.BS. Trịnh Thị Vân Anh - Viện Sức khỏe Tâm thần, Bệnh viện Bạch Mai \n Chủ đề: Trầm cảm",
          categories: ["Healthy", "Education", "Psychology"],
          image:
            "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/241390112_2976639862579617_1690972362834424290_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=340051&_nc_ohc=aCPKF5vr3SAAX8oaMqD&_nc_ht=scontent.fsgn3-1.fna&oh=f175309efa0bd3f547227efaf68f5979&oe=616CD77A",
        };
        setListEvent((prevValue) => [...prevValue, newEvent]);
      }
    } else {
      window.removeEventListener("scroll", trackScrolling);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", trackScrolling);

    return function cleanup() {
      window.removeEventListener("scroll", trackScrolling);
    };
  }, [trackScrolling]);

  return (
    <div className={`${styles.listEvent}`} id="header">
      {listEvent.map((event) => (
        <Event
          title={event.title}
          shortDescription={event.shortDescription}
          categories={event.categories}
          image={event.image}
        />
      ))}
    </div>
  );
};

export default ListEvent;
