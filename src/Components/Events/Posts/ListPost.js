import { useState } from "react";

import CreatePost from "../../Popup/CreatePost";

import styles from "./ListPost.module.scss";

import commonStyles from "../../Auth/Auth.module.scss";
import Post from "./Post";

const DUMMY_DATA = [
  {
    content:
      "🎯  Cơ thể chúng ta được nâng đỡ bởi bộ khung xương vững chắc. Thế nhưng theo thời gian và tác động của các yếu tố nội - ngoại cảnh khác nhau xương khớp sẽ bị thoái hoá. Biểu hiệu dễ thấy nhất chính là những cơn đau nhức khi trái gió trở trời; khô cứng khớp mỗi sáng thức dậy; khớp kêu lục khục, tê cứng, khó cử động… lâu dần sẽ tiến triển thành các bệnh lý mạn tính như: Thoái hóa khớp, viêm khớp tự miễn, viêm khớp dạng thấp, viêm khớp vẩy nến, viêm khớp phản ứng,...Nếu không được phát hiện sớm và điều trị kịp thời, bệnh gây ảnh hưởng trực tiếp làm giảm chất lượng cuộc sống như: giảm khả năng cầm nắm, vận động..., thậm chí có nguy cơ tàn phế suốt đời và nhiều biến chứng nguy hiểm lên các cơ quan khác trong cơ thể.Để phòng ngừa và cải thiện các vấn đề về xương khớp bạn cần tìm hiểu và áp dụng sớm - đúng - đủ những tiến bộ khoa học mới cũng như bản thân phải tự  chỉnh lối sống, tạo thói quen sinh hoạt lành mạnh. ",
    image: "",
    date: new Date(),
  },
  {
    content:
      "🎯  Cơ thể chúng ta được nâng đỡ bởi bộ khung xương vững chắc. Thế nhưng theo thời gian và tác động của các yếu tố nội - ngoại cảnh khác nhau xương khớp sẽ bị thoái hoá. Biểu hiệu dễ thấy nhất chính là những cơn đau nhức khi trái gió trở trời; khô cứng khớp mỗi sáng thức dậy; khớp kêu lục khục, tê cứng, khó cử động… lâu dần sẽ tiến triển thành các bệnh lý mạn tính như: Thoái hóa khớp, viêm khớp tự miễn, viêm khớp dạng thấp, viêm khớp vẩy nến, viêm khớp phản ứng,...Nếu không được phát hiện sớm và điều trị kịp thời, bệnh gây ảnh hưởng trực tiếp làm giảm chất lượng cuộc sống như: giảm khả năng cầm nắm, vận động..., thậm chí có nguy cơ tàn phế suốt đời và nhiều biến chứng nguy hiểm lên các cơ quan khác trong cơ thể.Để phòng ngừa và cải thiện các vấn đề về xương khớp bạn cần tìm hiểu và áp dụng sớm - đúng - đủ những tiến bộ khoa học mới cũng như bản thân phải tự  chỉnh lối sống, tạo thói quen sinh hoạt lành mạnh. ",
    image:
      "https://scontent.fsgn13-2.fna.fbcdn.net/v/t1.6435-9/243706858_4463442433774480_540562215788975153_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=a610ef&_nc_ohc=jLhvtm2oUKcAX-yGCfg&_nc_ht=scontent.fsgn13-2.fna&oh=97f2222d24c6fb47d4b576d78a7c0bbc&oe=617E2828",
    date: new Date(),
  },
  {
    content:
      "🎯  Cơ thể chúng ta được nâng đỡ bởi bộ khung xương vững chắc. Thế nhưng theo thời gian và tác động của các yếu tố nội - ngoại cảnh khác nhau xương khớp sẽ bị thoái hoá. Biểu hiệu dễ thấy nhất chính là những cơn đau nhức khi trái gió trở trời; khô cứng khớp mỗi sáng thức dậy; khớp kêu lục khục, tê cứng, khó cử động… lâu dần sẽ tiến triển thành các bệnh lý mạn tính như: Thoái hóa khớp, viêm khớp tự miễn, viêm khớp dạng thấp, viêm khớp vẩy nến, viêm khớp phản ứng,...Nếu không được phát hiện sớm và điều trị kịp thời, bệnh gây ảnh hưởng trực tiếp làm giảm chất lượng cuộc sống như: giảm khả năng cầm nắm, vận động..., thậm chí có nguy cơ tàn phế suốt đời và nhiều biến chứng nguy hiểm lên các cơ quan khác trong cơ thể.Để phòng ngừa và cải thiện các vấn đề về xương khớp bạn cần tìm hiểu và áp dụng sớm - đúng - đủ những tiến bộ khoa học mới cũng như bản thân phải tự  chỉnh lối sống, tạo thói quen sinh hoạt lành mạnh. ",
    image:
      "http://thietkelogosaigon.com/wp-content/uploads/2019/12/rsz_1attachment_92114614-e1519200174268.jpg",
    date: new Date(),
  },
];

const ListPost = () => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const openPostCreation = () => {
    setIsCreatingPost(true);
  };

  const closePostCreation = () => {
    setIsCreatingPost(false);
  };

  const confirmCreatePost = () => {};

  return (
    <>
      {isCreatingPost && (
        <CreatePost onClose={closePostCreation} onConfirm={confirmCreatePost} />
      )}
      <section className={`${styles.listPost}`}>
        <div className={`${styles.listPost__button}`}>
          <button
            className={`${commonStyles.btn} ${commonStyles.btn_tertiary_light}`}
            onClick={openPostCreation}
          >
            Create
          </button>
        </div>
        <div className={styles.listPost__list}>
          {DUMMY_DATA.map((post) => (
            <Post information={post} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ListPost;
