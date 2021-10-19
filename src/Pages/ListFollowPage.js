import SideNavigation from "../Components/Navigation/SideNavigation";
import NavigationBar from "../Components/Navigation/Navigationbar";
import { useEffect } from "react";
import ListFollow from "../Components/ListFollow/ListFollow";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const DUMMY_DATA = {
  followedEvents: [
    {
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
      tags: ["#FAC", "#NgonNguCuaBoCuc", "#ARTTALK"],
      organizerNames: ["FPT Around", "FAC"],
      userProfileId: 2,
      online: true,
      addresses: [
        {
          name: null,
          fullText: "https://meet.google.com/tgx-azhp-mfn",
          url: true,
        },
      ],
      startDate: "2021-12-12T11:30:00Z",
      endDate: null,
      status: {
        id: 1,
        name: "Published",
      },
      coverURL:
        "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/s960x960/242840841_4151105441679083_5112985360953462363_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_ohc=9GgSjn9oQOgAX86X5Ep&_nc_ht=scontent.fsgn4-1.fna&oh=c159c645802e2a09ec074b2a1817e226&oe=617A7DC1",
      summary:
        "Arttalk II: “Ngôn ngữ của bố cục” với sự đồng hành của cô Phan Mai Chi sẽ giúp các bạn tìm hiểu được bố cục là gì, có những loại bố cục nào và làm sao để có thể tìm được bố cục nào là hợp lý nhất cho thiết kế của mình.",
      content:
        "💬 Tiếp nối Arttalk số đầu tiên là “Academic Paintings and Untold Things” xoay quanh nghệ thuật phân tích các tác phẩm, Arttalk số thứ hai với chủ đề “Ngôn ngữ của bố cục” sẽ tiếp tục đi sâu vào bên trong các tác phẩm nghệ thuật - bố cục. Người ta thường ví bố cục chính là phần xương sống, phần cốt lỗi của một tác phẩm nghệ thuật. Một thiết kế, tác phẩm đẹp trước hết phải có một bố cục hợp lý và việc nắm rõ quy luật về bố cục sẽ là chìa khóa giúp các bạn chinh phục được bước đầu tiên trong việc thiết kế.\nArttalk II: “Ngôn ngữ của bố cục” với sự đồng hành của cô Phan Mai Chi sẽ giúp các bạn tìm hiểu được bố cục là gì, có những loại bố cục nào và làm sao để có thể tìm được bố cục nào là hợp lý nhất cho thiết kế của mình.\n⭐️ Cô Phan Mai Chi - Giảng viên ngành Thiết kế Mỹ thuật số Trường đại học FPT TP.HCM và Thạc sĩ Mỹ thuật tạo hình Trường đại học Mỹ thuật. Dẫn chương trình tại lễ tựu trường trực tuyến chào đón Tân sinh viên K17, cô Mai Chi với chất giọng dễ mến và kiến thức sâu rộng về mỹ thuật chắc chắn sẽ mang đến cho tất cả các bạn sinh viên, đặc biệt là các bạn tân sinh viên K17 nhiều thông tin bổ ích về bố cục để có thể vững vàng hơn bước vào chuyên ngành của mình.\n Thời gian: 18:30 thứ sáu, ngày 12/12/2021.\n Hình thức: Nền tảng Google Meet và Livestream trên page FAC - FPT Art and Culture Community, page FPT Around.\nNhanh tay điền form tham gia tại: https://forms.gle/GJHfg3r9bHFmdUTJ7",
    },
    {
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
      tags: ["#FAC", "#NgonNguCuaBoCuc", "#ARTTALK"],
      organizerNames: ["FPT Around", "FAC"],
      userProfileId: 2,
      online: true,
      addresses: [
        {
          name: null,
          fullText: "https://meet.google.com/tgx-azhp-mfn",
          url: true,
        },
      ],
      startDate: "2021-12-12T11:30:00Z",
      endDate: null,
      status: {
        id: 1,
        name: "Published",
      },
      coverURL:
        "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/s960x960/242840841_4151105441679083_5112985360953462363_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_ohc=9GgSjn9oQOgAX86X5Ep&_nc_ht=scontent.fsgn4-1.fna&oh=c159c645802e2a09ec074b2a1817e226&oe=617A7DC1",
      summary:
        "Arttalk II: “Ngôn ngữ của bố cục” với sự đồng hành của cô Phan Mai Chi sẽ giúp các bạn tìm hiểu được bố cục là gì, có những loại bố cục nào và làm sao để có thể tìm được bố cục nào là hợp lý nhất cho thiết kế của mình.",
      content:
        "💬 Tiếp nối Arttalk số đầu tiên là “Academic Paintings and Untold Things” xoay quanh nghệ thuật phân tích các tác phẩm, Arttalk số thứ hai với chủ đề “Ngôn ngữ của bố cục” sẽ tiếp tục đi sâu vào bên trong các tác phẩm nghệ thuật - bố cục. Người ta thường ví bố cục chính là phần xương sống, phần cốt lỗi của một tác phẩm nghệ thuật. Một thiết kế, tác phẩm đẹp trước hết phải có một bố cục hợp lý và việc nắm rõ quy luật về bố cục sẽ là chìa khóa giúp các bạn chinh phục được bước đầu tiên trong việc thiết kế.\nArttalk II: “Ngôn ngữ của bố cục” với sự đồng hành của cô Phan Mai Chi sẽ giúp các bạn tìm hiểu được bố cục là gì, có những loại bố cục nào và làm sao để có thể tìm được bố cục nào là hợp lý nhất cho thiết kế của mình.\n⭐️ Cô Phan Mai Chi - Giảng viên ngành Thiết kế Mỹ thuật số Trường đại học FPT TP.HCM và Thạc sĩ Mỹ thuật tạo hình Trường đại học Mỹ thuật. Dẫn chương trình tại lễ tựu trường trực tuyến chào đón Tân sinh viên K17, cô Mai Chi với chất giọng dễ mến và kiến thức sâu rộng về mỹ thuật chắc chắn sẽ mang đến cho tất cả các bạn sinh viên, đặc biệt là các bạn tân sinh viên K17 nhiều thông tin bổ ích về bố cục để có thể vững vàng hơn bước vào chuyên ngành của mình.\n Thời gian: 18:30 thứ sáu, ngày 12/12/2021.\n Hình thức: Nền tảng Google Meet và Livestream trên page FAC - FPT Art and Culture Community, page FPT Around.\nNhanh tay điền form tham gia tại: https://forms.gle/GJHfg3r9bHFmdUTJ7",
    },
  ],
  followedOrganizations: [
    {
      id: 2,
      name: "FAC",
      email: "ducdhse150713@fpt.edu.vn",
      city: "Hồ Chi Minh",
      jobTitle: null,
      address:
        "Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp. Thủ Đức, TP.HCM.",
      phoneNumber: "0507551942",
      summary: null,
      avatarURL: null,
      backgroundURL: null,
      role: {
        authority: "Event Organizer",
      },
      dob: "2000-12-31T17:00:00Z",
    },
    {
      id: 3,
      name: "FPT Around",
      email: "thaibdse151309@fpt.edu.vn",
      city: "Hồ Chí Minh",
      jobTitle: null,
      address:
        "Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp. Thủ Đức, TP.HCM.",
      phoneNumber: "0708996524",
      summary: null,
      avatarURL: null,
      backgroundURL: null,
      role: {
        authority: "Event Organizer",
      },
      dob: "2000-12-31T17:00:00Z",
    },
    {
      id: 6,
      name: "Cóc Sài Gòn",
      email: "binh789@fpt.edu.vn",
      city: "Hồ Chí Minh",
      jobTitle: null,
      address:
        "Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp. Thủ Đức, TP.HCM.",
      phoneNumber: "0778551302",
      summary: null,
      avatarURL: null,
      backgroundURL: null,
      role: {
        authority: "Event Organizer",
      },
      dob: "2002-07-07T17:00:00Z",
    },
  ],
};

const ListFollowPage = () => {
  const profile = useSelector((state) => state.profile);
  const token = useSelector((state) => state.token.token);

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token || profile.role !== "Attendees") {
      history.replace("/sign-in");
    }
  }, [history, token, profile.role]);

  return (
    <div>
      <NavigationBar />
      <SideNavigation activatedItem={"TYPE_3"} />
      <ListFollow information={DUMMY_DATA} />
    </div>
  );
};

export default ListFollowPage;
