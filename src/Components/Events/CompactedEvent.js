import { useState } from "react";

import styles from "./CompactedEvent.module.scss";

const DUMMY_DATA = {
  id: 1,
  title: "🟧 TALKSHOW ARTTALK II - NGÔN NGỮ CỦA BỐ CỤC 🟠",
  categories: [
    {
      id: 1,
      name: "Business & Professional",
      status: true,
    },
    {
      id: 2,
      name: "Charity & Causes",
      status: true,
    },
  ],
  summary:
    "Arttalk II: “Ngôn ngữ của bố cục” với sự đồng hành của cô Phan Mai Chi sẽ giúp các bạn tìm hiểu được bố cục là gì, có những loại bố cục nào và làm sao để có thể tìm được bố cục nào là hợp lý nhất cho thiết kế của mình.",
  image:
    "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/106504737_2722347444536344_728271756182488456_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8631f5&_nc_ohc=sojVDo3kAzUAX_VsoLg&_nc_ht=scontent.fsgn3-1.fna&oh=caf9c7e799dd4228b712c0e7df4f523c&oe=6179C8A8",
  status: {
    id: 1,
    name: "Published",
  },
};

const CompactedEvent = (props) => {
  const [backgroundURL, setBackgroundURL] = useState(
    "/images/default-cover.jpg"
  );

  const description = DUMMY_DATA.summary ? DUMMY_DATA.summary.split("\n") : [];
  return (
    <div className={`${styles.cpEvent}`}>
      <div className={`${styles.cpEvent__status}`}>
        {DUMMY_DATA.status.name}
      </div>
      <img src={DUMMY_DATA.image} alt="Cover" />
      <h1>{DUMMY_DATA.title}</h1>
      <h3>Summary</h3>
      {description.map((sentence, index) => (
        <p key={`SENTENCE_${index}`}>{sentence}</p>
      ))}
      <h3 className={`${styles.cpEvent__inline}`}>Categories: </h3>
      {DUMMY_DATA.categories.map((category) => (
        <p
          key={`CATEGORY_${category.id}`}
          className={`${styles.cpEvent__category}`}
        >
          {category.name}
        </p>
      ))}
    </div>
  );
};

export default CompactedEvent;
