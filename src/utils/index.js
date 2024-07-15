export const uderScoreToCammel = (stringValue) => {
  const words = stringValue.split("_");

  const captilizeWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return captilizeWords.join("");
};
