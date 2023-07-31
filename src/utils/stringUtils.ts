const getFirstLetters = (str: string, maxLetters: number = 3): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, maxLetters);
};

export { getFirstLetters };
