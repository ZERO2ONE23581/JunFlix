export const ComputeDate = (date: string) => {
  const NewDate = new Date(date);
  const Year = NewDate.getFullYear().toString();
  const Month = NewDate.getMonth() + 1;
  const TheDate = NewDate.getDate();
  return `${Year.slice(2, 4)}. ${Month} .${TheDate}.`;
};
export const CapFirstLetter = (word: string) => {
  return word?.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};
