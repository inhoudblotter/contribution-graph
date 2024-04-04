export function getPercentageOfMonth(date: Date) {
  const temp = new Date(date);
  temp.setMonth(temp.getMonth() + 1, 0);
  return Math.round((date.getDate() / temp.getDate()) * 100);
}
