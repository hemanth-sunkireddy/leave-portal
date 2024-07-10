import { Features } from "@/types/dashboard";

const featureData: Features[] = [
  {
    id: 1,
    title: "Student Leave Requests",
    paragraph:
      "View your student applied leave requests. Approve/Reject Leave Requests if more than 2 days are applied.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View All students applications",
    redirectLink: "principal-student-dashboard"
  },
  {
    id: 2,
    title: "Faculty Leave Requests",
    paragraph:
      "View your Faculty applied leave requests. Approve/Reject Leave Requests.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View All Faculty applications",
    redirectLink: "principal-faculty-dashboard"
  },
];
export default featureData;
