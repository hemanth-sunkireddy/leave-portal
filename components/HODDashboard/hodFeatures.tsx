import { Features } from "@/types/dashboard";

const featureData: Features[] = [
  {
    id: 1,
    title: "Completed Student Leave Requests",
    paragraph:
      "View your branch student applied leave requests and Approved by Warden/Mentor or You.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "hod-student"
  },
  {
    id: 2,
    title: "Completed Faculty Leave Requests",
    paragraph:
      "View your Faculty Completed Faculty Leave Requests which was approved/rejected by you or Principal.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "hod-faculty"
  },
  {
    id: 3,
    title: "Pending Student Leave Requests",
    paragraph:
      "View your Branch Student Pending applied leave requests and Approve/Reject Leave Requests.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "hod-student-pending"
  },
  {
    id: 4,
    title: "Pending Faculty Leave Requests",
    paragraph:
      "View your Faculty Pending applied leave requests and Approve/Reject Leave Requests.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Applications",
    redirectLink: "hod-faculty-pending"
  },
];
export default featureData;
