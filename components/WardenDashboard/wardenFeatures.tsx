import { Features } from "@/types/dashboard";

const featureData: Features[] = [
  {
    id: 1,
    title: "Completed Student Leave Requests with less than 2 days",
    paragraph:
      "View your student Leave Request Applications with less than 2 days and approved/rejected by Mentor/You.",
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
  {
    id: 3,
    title: "Pending Student Leave Requests with more than 2 days",
    paragraph:
      "View your student Pending Leave Request Applications who applied for less than 2 days. Please  approve/rejecte Leave Requests.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View All Applications",
    redirectLink: "warden-student-pending"
  },
];
export default featureData;
