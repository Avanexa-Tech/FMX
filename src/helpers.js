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