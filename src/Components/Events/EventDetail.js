import styles from "./EventDetail.module.scss";
import commonStyles from "../Auth/Auth.module.scss";

const DUMMY_DATA = {
  title: "Diễn Đàn Sinh Viên Nghiên Cứu Khoa Học",
  description:
    "𝐃𝐢𝐞̂̃𝐧 Đ𝐚̀𝐧 𝐒𝐢𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐍𝐠𝐡𝐢𝐞̂𝐧 𝐂𝐮̛́𝐮 𝐊𝐡𝐨𝐚 𝐇𝐨̣𝐜 𝟐𝟎𝟐𝟏 🎖 \n 𝐂𝐡𝐮̉ Đ𝐞̂̀: 𝐓𝐚̂𝐦 𝐥𝐲́ & 𝐆𝐢𝐚́𝐨 𝐝𝐮̣𝐜 ☘️☘️☘️ \n 𝐁𝐮𝐨̂̉𝐢 𝟐: 𝐍𝐂𝐊𝐇 𝐓𝐡𝐮̛̣𝐜 𝐓𝐫𝐚̣𝐧𝐠 📈📉📊 " +
    "\n Buổi 1 với nội dung nghiên cứu khoa học (NCKH) lí luận đã diễn ra tốt đẹp. Và buổi 2 diễn đàn đã chính thức mở đơn đăng ký, chúng ta cùng đăng ký để tham gia ngay nào ♥️" +
    "  \n ⭐ Diễn đàn Sinh viên Nghiên cứu Khoa học 2021 do Dự án Tập huấn NCKH/CLB Nghiên cứu Tâm lý học - Giáo dục học tổ chức. " +
    "Nội dung trao đổi & báo cáo kết quả NCKH của học viên tham gia chuỗi tập huấn NCKH SPE. Xoay quanh những vấn đề mang tính thời sự hiện nay trong lĩnh vực Tâm lý & Giáo dục 🎫 " +
    "  \n   Diễn đàn là nơi các bạn quan tâm đến nghiên cứu khoa học (NCKH) tham gia để tìm hiểu giao lưu trao đổi kiến thức, gặp gỡ những người cùng chung định hướng," +
    " công bố kết quả NCKH,….👨🏻‍🤝‍👨🏼👫🧍   \n ⭐ Sự kiện có sự tham gia của các chuyên gia đầu ngành Tâm lý học & Giáo dục học đến từ các cơ sở khác nhau trên toàn quốc và quốc tế với" +
    "24 nhóm/cá nhân tác giả sẽ công bố kết quả NCKH 🇻🇳🇻🇳🇻🇳 \n •Đ𝐨̂́𝐢 𝐭𝐮̛𝐨̛̣𝐧𝐠 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚: Tất cả những người quan tâm đều được tham gia miễn phí - giới hạn 50 người đăng ký ❤️" +
    " \n  📃 𝐓𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐬𝐮̛̣ 𝐤𝐢𝐞̣̂𝐧: \n  ⏱ 𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: \n  ☘️ 𝐁𝐮𝐨̂̉𝐢 𝟐: 19h30’ Ngày 22/09/2021 \n Chủ đề: Nghiên cứu khoa học thực trạng \n 🎥 𝐇𝐢̀𝐧𝐡 𝐭𝐡𝐮̛́𝐜 𝐭𝐨̂̉ 𝐜𝐡𝐮̛́𝐜: Online qua Zoom meeting " +
    "\n   📝 𝐂𝐚́𝐜 𝐛𝐮̛𝐨̛́𝐜 đ𝐚̆𝐧𝐠 𝐤𝐲́ 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚: \n 📌 𝐁𝟏: Like & chia sẻ bài viết về trang cá nhân, để chế độ công khai 💌   \n   📌 𝐁𝟐: Điền link form đăng ký buổi 2: \n https://forms.gle/UkevC3Lp7UK6DLBm9" +
    " \n 📌 𝐁𝟑: Check email thông báo và tham gia đúng giờ (thông báo sẽ được gửi trước khi buổi 2 bắt đầu 9-10 tiếng) 📬 " +
    " \n ☀Và đừng quên follow Fanpage để cập nhật những thông tin mới nhất về chuỗi sự kiện nha! \n ——————————————— \n 𝐒𝐏𝐄 - 𝐒𝐜𝐢𝐞𝐧𝐭𝐢𝐟𝐢𝐜 𝐑𝐞𝐬𝐞𝐚𝐫𝐜𝐡 𝐏𝐬𝐲𝐜𝐡𝐨𝐥𝐨𝐠𝐲 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 " +
    "\n Mọi thông tin vui lòng liên hệ:  \n  🌐 𝐅𝐚𝐧𝐩𝐚𝐠𝐞: https://www.facebook.com/CLB-Nghiên-Cứu-Tâm-Lý-Học-Giáo-Dục-Học-106187908218331/ \n  " +
    " 📨 𝐆𝐦𝐚𝐢𝐥: SPEHNUE@gmail.com  \n ☎ 𝐇𝐨𝐭𝐥𝐢𝐧𝐞: 034.234.9997 (Mr. Vũ Xuân Anh)",

  categories: ["Science", "Education", "Psychology", "Online", "Social"],
  date: "19:00, September 10, 2012",
  location: "FPT HCM University",
  remain: 20,
  image:
    "https://scontent.fsgn8-1.fna.fbcdn.net/v/t39.30808-6/242145009_222288139941640_6679877824071632444_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=340051&_nc_ohc=GDEukTT17DoAX-iw0PH&tn=AcLQveYFpgLxAnDM&_nc_ht=scontent.fsgn8-1.fna&oh=632f09b64830fbf22d075142cd6e8141&oe=614D4AD3",
};

const EventDetail = () => {
  const descriptionArr = DUMMY_DATA.description.split("\n");

  return (
    <section className={`${styles.detail}`}>
      <header className={`${styles.detail__header}`}>
        <div className={`${styles.detail__poster}`}>
          <img src={DUMMY_DATA.image} alt="Poster" />
        </div>
        <div className={`${styles.detail__register}`}>
          <h3 className={`${styles.detail__topic}`}>Date:</h3>
          <p className={`${styles.detail__registerText}`}>{DUMMY_DATA.date}</p>
          <h3 className={`${styles.detail__topic}`}>Location:</h3>
          <p className={`${styles.detail__registerText}`}>
            {DUMMY_DATA.location}
          </p>
          <h3 className={`${styles.detail__topic} ${styles.mb_small}`}>
            Categories:
          </h3>
          {DUMMY_DATA.categories.map((category) => (
            <p className={`${styles.detail__category}`}>{category}</p>
          ))}
          <h3 className={`${styles.detail__topic}`}>
            Remaining registerations:
          </h3>
          <p className={`${styles.detail__registerText}`}>
            {DUMMY_DATA.remain} left
          </p>
          <button
            className={`${commonStyles.btn} ${commonStyles.btn_primary_light} ${styles.btn_small}`}
          >
            Join
          </button>
        </div>
      </header>
      <hr />
      <div className={`${styles.detail__body}`}>
        <h1 className={`${styles.detail__title}`}>{DUMMY_DATA.title}</h1>
        {descriptionArr.map((sentence) => (
          <p className={`${styles.detail__description}`}>{sentence}</p>
        ))}
      </div>
    </section>
  );
};

export default EventDetail;
