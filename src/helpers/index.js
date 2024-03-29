export function throwError(err) {
  if (err.response && err.response.data) {
    throw err.response.data; // Throw the error data to be caught in the catch block
  } else {
    throw err; // Throw the entire error object if no specific error data is available
  }
}

export function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
