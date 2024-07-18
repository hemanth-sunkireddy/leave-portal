import { Features } from "@/types/dashboard";

const featureData: Features[] = [
  {
    id: 1,
    title: "Completed Student Leave Requests",
    paragraph:
      "View your student Leave Request Applications and approved/rejected by Mentor/You.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "warden-student-dashboard"
  },
  {
    id: 2,
    title: "Pending Student Leave Requests",
    paragraph:
      "View your student Pending Leave Request Applications. Please  approve/rejecte Leave Requests.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "warden-student-pending"
  },
];
export default featureData;
