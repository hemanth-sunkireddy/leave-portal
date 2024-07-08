import { Features } from "@/types/dashboard";

const featureData: Features[] = [
  {
    id: 1,
    title: "Apply Leave",
    paragraph:
      "Apply for leave here. Submit your request with required details.",
    image: "/images/dashboard/apply-leave.png",
    detail: "Apply New Leave",
    redirectLink: "apply-leave"
  },
  {
    id: 2,
    title: "View Past Leave Requests",
    paragraph:
      "Applied for leave? Access and check all your past leave requests status here.",
    image: "/images/dashboard/past-leave.jpg",
    detail: "View Past Requests",
    redirectLink: "my-leaves"
  },
];
export default featureData;
