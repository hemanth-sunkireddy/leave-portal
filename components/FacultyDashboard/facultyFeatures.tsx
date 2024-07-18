import { Features } from "@/types/dashboard";

const featureData: Features[] = [
  {
    id: 1,
    title: "Apply Leave",
    paragraph:
      "Apply for leave here. Submit your request with required details.",
    image: "/images/dashboard/apply-leave.png",
    detail: "Apply New Leave",
    redirectLink: "faculty-apply-leave"
  },
  {
    id: 2,
    title: "View Past Leave Requests",
    paragraph:
      "Applied for leave? Access and check all your past leave requests status here.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Past Requests",
    redirectLink: "faculty-my-leaves"
  },
  {
    id: 3,
    title: "My Students Leave Requests",
    paragraph:
      "View and Approve/Reject your Student Leaves Requests under you.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View My Student Leaves",
    redirectLink: "mentor-dashboard"
  },
];
export default featureData;
