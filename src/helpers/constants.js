// export const apiUrl = "http://localhost:5000/api/"
export const operationsMenu = [
  "operations",
  "jobs",
  "cars",
  "operators",
  "settings",
];
export const headerModules = ["operations"];
// const apiKey = process.env.VITE_API_KEY;
export const apiUrl =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/";
export const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
