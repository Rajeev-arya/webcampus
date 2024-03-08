const { ObjectId } = require("mongodb");

function pageHeadingName(inputString) {
  console.log(inputString);
  const stringWithSpaces = inputString.replace(/-/g, " ");
  const resultString = stringWithSpaces.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );
  return resultString;
}

module.exports = { pageHeadingName };
