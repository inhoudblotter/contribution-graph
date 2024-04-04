export function formatDate(date: Date) {
  function convertToString(num: number) {
    return num.toString().padStart(2, "0");
  }
  return `${date.getFullYear()}-${convertToString(
    date.getMonth() + 1
  )}-${convertToString(date.getDate())}`;
}
