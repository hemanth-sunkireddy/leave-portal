import { Features } from "@/types/dashboard";

const featureData: Features[] = [
  {
    id: 1,
    title: "Completed Student Leave Requests",
    paragraph:
      "View your Student Completed Faculty Leave Requests which was approved/rejected by HoD or You.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "vp-student-dashboard"
  },
  {
    id: 2,
    title: "Pending Student Leave Requests",
    paragraph:
      "View your Student Pending applied leave requests and Approve/Reject Leave Requests.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "vp-student-pending"
  },

  {
    id: 3,
    title: "Completed Faculty Leave Requests",
    paragraph:
      "View your Faculty Completed Faculty Leave Requests which was approved/rejected by HoD or You.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "vp-faculty-dashboard"
  },
  {
    id: 4,
    title: "Pending Faculty Leave Requests",
    paragraph:
      "View your Faculty Pending applied leave requests and Approve/Reject Leave Requests.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "vp-faculty-pending"
  },
];
export default featureData;
