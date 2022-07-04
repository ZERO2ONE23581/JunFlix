export const ComputeDate = (date: string) => {
  const NewDate = new Date(date);
  const Year = NewDate.getFullYear().toString();
  const Month = NewDate.getMonth() + 1;
  const TheDate = NewDate.getDate();
  const Hour = NewDate.getHours();
  const Minute = NewDate.getMinutes();
  return `${Year.slice(2, 4)}년 ${Month}월 ${TheDate}일 ${Hour}:${Minute}`;
};
export const CapFirstLetter = (word: string) => {
  return word?.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};
export const StartWithCapLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
