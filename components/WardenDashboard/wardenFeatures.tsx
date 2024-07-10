import { Features } from "@/types/dashboard";

const featureData: Features[] = [
  {
    id: 1,
    title: "Student Leave Requests with less than 2 days",
    paragraph:
      "View your student Leave Request Applications who applied for less than 2 days. Please Approve/Reject them.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "warden-student-dashboard"
  },
  {
    id: 2,
    title: "Student Leave Requests with more than 2 days",
    paragraph:
      "View your student Leave Request Applications who applied for more than 2 days. This Leave Requests are approved/rejected by Principal.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View All Applications",
    redirectLink: "warden-principal-dashboard"
  },
];
export default featureData;
