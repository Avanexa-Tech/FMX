import { formatWords } from "./helpers";

export const PRIMARY_SIDEBAR_OPTIONS = [
  {
    key: "work_order",
    icon: <i className="fi fi-rr-document"></i>,
    label: formatWords("work_orders"),
    link: "#",
  },
  {
    key: "requests",
    icon: <i className="fi fi-rr-download"></i>,
    label: formatWords("requests"),
    link: "#",
  },
];

export const SECONDARY_SIDEBAR_OPTIONS = [
  {
    key: "category",
    icon: <i className="fi fi-tr-category"></i>,
    label: formatWords("category"),
    link: "#",
  },
];

export const colors = {
  low: "#0dbf98",
  medium: "#ffa500",
  high: "#ff4136",
};

export const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export const DAY_OPTIONS = {
  sun: "Sunday",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};
