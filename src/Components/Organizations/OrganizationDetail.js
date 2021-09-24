import styles from "./OrganizationDetail.module.scss";

const DUMMY_DATA = {
  name: "F-Code",
  avatar:
    "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/241277567_2935941399955753_2523832604141178857_n.png?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=hEQOfPorBzEAX9QLz0Z&_nc_ht=scontent.fsgn8-2.fna&oh=489b1b6b0df44fbe4231a9ddb83bfbfb&oe=615233B9",
  cover:
    "https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/239897887_2935996866616873_277990238379701763_n.png?_nc_cat=108&ccb=1-5&_nc_sid=e3f864&_nc_ohc=BsuZJFAXodcAX8fxEBj&tn=AcLQveYFpgLxAnDM&_nc_ht=scontent.fsgn13-2.fna&oh=55d06732636e94d5c0d23a644de4b0de&oe=6152C4F9",
  description:
    "Mình đã nghe khá là nhiều “lời đồn” của sinh viên trường về CLB như  “F-code chảnh lắm”, “Muốn vô đó thì phải biết code rồi cơ” hay “Vô F-code rồi suốt ngày code, code riết rồi ế luôn đó mày”, “Thử thách của cái CLB đó khó lắm, mày không làm nổi đâu”. Lúc mới đầu nghe tớ cũng khá là hoang mang nhưng mà sau khi tham gia thử thách và các buổi sinh hoạt thì tớ thấy ngay rằng CLB không hề giống như lời đồn mà là một vẻ hoàn toàn khác. Còn khác như thế nào thì tớ sẽ kể cho các cậu nghe. \n" +
    "1. CLB F-code tức là nơi đó chỉ có code và code thôi đúng không? Vô đó rồi sẽ được người ta chỉ hết cho luôn chứ gì. \n" +
    "Nô hề nô hề nhé. Mặc dù F-code là CLB về học thuật, là nơi tập trung của những con người có chung niềm đam mê về lập trình, nhưng ngoài code ra thì các thành viên của CLB vẫn có những niềm đam mê và sở thích khác. \n" +
    "Ngoài ra đúng là vô CLB thì bạn sẽ được “người ta chỉ hết cho luôn” nhưng mà chỉ bảo ở đây không phải là các anh chị sẽ cầm tay chỉ dẫn hay fix từng dòng code cho bạn mà họ chỉ hướng dẫn thuật toán, hướng dẫn những nền tảng cơ bản, còn có phát triển hay không thì còn tùy thuộc vào chính bản thân bạn. \n" +
    "2. Có phải chỉ cần vào CLB là có thể dễ dàng pass hết các môn lập trình ở trường không? \n" +
    "Cái này cũng không luôn nha. Mặc dù vào CLB là 1 lợi thế vì ngoài các giờ học chính trên trường ra thì bạn còn có thể học hỏi thêm ở các anh chị khóa trên nhưng mà thực tế là các anh chị đấy cũng chỉ giúp đỡ cho những người thực sự cần giúp đỡ. Thế nào là một người thực sự cần giúp đỡ? Theo thời gian sinh hoạt trong CLB tớ thấy những người đó là những bạn thực sự ham học hỏi, những bạn không ngần ngại mà tìm kiếm sự giúp đỡ, vì đơn giản là không phải ai cũng “rảnh” mà quan tâm từng thành viên một. Và khi bạn thực sự cần thì những anh chị đó sẽ luôn sẵn sàng giúp.",
};

const OrganizationDetail = () => {
  const description = DUMMY_DATA.description.split("\n");

  return (
    <div className={`${styles.organizationDetail}`}>
      <div className={`${styles.organizationDetail__image}`}>
        <img
          src={DUMMY_DATA.cover}
          alt="cover"
          className={`${styles.organizationDetail__image_cover}`}
        />
        <div className={`${styles.organizationDetail__image_avatar}`}>
          <img src={DUMMY_DATA.avatar} alt="avatar" />
          <h3>{DUMMY_DATA.name}</h3>
        </div>
      </div>
      <hr />
      <div className={`${styles.organizationDetail__description}`}>
        <div className={`${styles.organizationDetail__description_part}`}>
          <h3 className={`${styles.organizationDetail__description_topic}`}>
            Description:{" "}
          </h3>
          {description.map((sentence) => (
            <p className={`${styles.organizationDetail__description_param}`}>
              {sentence}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetail;
