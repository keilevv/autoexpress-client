export function throwError(err) {
  if (err && err.response && err.response.data) {
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

export function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

export function getFilterString(filters) {
  let filterString = "";
  Object.keys(filters).forEach((key) => {
    filterString += `&${key}=${filters[key]}`;
  });
  return filterString;
}

export function formatToCurrency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number);
}

export const validateCarPlate = async (rule, value) => {
  const carPlateRegex = /^[a-zA-Z]{3}\d{3}$/;

  if (!value || carPlateRegex.test(value)) {
    return Promise.resolve();
  }

  return Promise.reject(
    "Please enter a string with 3 letters followed by 3 numbers."
  );
};
