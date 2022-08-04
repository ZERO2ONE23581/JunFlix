export const useCapLetters = (word: string) => {
  return word?.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};
export const useCapLetter = (word: string) => {
  return `${
    word?.toString()?.slice(0, 1).toUpperCase() + word?.toString().slice(1)
  }`;
};
export const useLength = (watch: string | undefined) => {
  if (watch) return watch.toString().replace(/\s/gi, '').length;
};
