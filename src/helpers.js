import dayjs from "dayjs";

export function formatWords(text) {
  if(text == undefined) return;
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


export function getOrdinalSuffix(n) {
  if(n == undefined){
    return;
  }
  const s = ["th", "st", "nd", "rd"],
        v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}


export function formatEmptyData(data) {
  return data ?? "-";
}

export function formatDateWithOrdinal(dateString) {
  if (dateString == undefined || dateString?.length <= 0) return "";
  const date = dayjs(dateString);

  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const dayOfMonth = date.date();
  const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

  return `${dayOfMonth}${ordinalSuffix} ${date.format("MMM YYYY")}`;
}