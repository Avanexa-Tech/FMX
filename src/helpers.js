export function formatWords(text) {
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