import { formatWords } from "./helpers";

export const PRIMARY_SIDEBAR_OPTIONS = [
  {
    key: "work_order",
    icon: <i class="fi fi-rr-document"></i>,
    label: formatWords("work_orders"),
    link : "#"
  },
  {
    key: "requests",
    icon: <i class="fi fi-rr-download"></i>,
    label: formatWords("requests"),
    link : "#"
  },
];


export const SECONDARY_SIDEBAR_OPTIONS = [
  {
    key : "category",
    icon: <i class="fi fi-tr-category"></i>,
    label: formatWords("category"),
    link : "#"
  }
]