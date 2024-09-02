import { formatWords } from "./helpers";


export const PRIMARY_SIDEBAR_OPTIONS = [
  {
    key: "work_order",
    icon: <i className="fi fi-rr-document"></i>,
    link: "/work_order_management",
  },
  {
    key: "preventive_maintenance",
    icon: <i class="fi fi-rs-time-quarter-past"></i>,
    link: "/preventive_maintenance",
  },
];

export const SECONDARY_SIDEBAR_OPTIONS = [
  {
    key: "asset_management",
    icon: <i class="fi fi-tr-boxes"></i>,
    label: formatWords("asset_management"),
    link: "/assets_management",
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
