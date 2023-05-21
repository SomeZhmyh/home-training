
export function DateToJSONString(date: Date): string {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (day.length == 1) day = '0' + day;
  if (month.length == 1) month = '0' + month;
  const year = date.getFullYear();
  const result = `${year}-${month}-${day}T12:00:00.000`;
  return result;
}
