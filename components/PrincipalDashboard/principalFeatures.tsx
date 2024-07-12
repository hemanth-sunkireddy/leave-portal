import { Features } from "@/types/dashboard";

const featureData: Features[] = [
  {
    id: 1,
    title: "Completed Student Leave Requests",
    paragraph:
      "View your student applied leave requests and Approved by Warden/Mentor.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "principal-student-dashboard"
  },
  {
    id: 2,
    title: "Completed Faculty Leave Requests",
    paragraph:
      "View your Faculty Completed Faculty Leave Requests which was approved/rejected by you.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "principal-faculty-dashboard"
  },
  {
    id: 3,
    title: "Pending Student Leave Requests",
    paragraph:
      "View your Student Pending applied leave requests and Approve/Reject Leave Requests.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "principal-student-pending"
  },
  {
    id: 4,
    title: "Pending Faculty Leave Requests",
    paragraph:
      "View your Faculty Pending applied leave requests and Approve/Reject Leave Requests.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "principal-faculty-pending"
  },
];
export default featureData;
