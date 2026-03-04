// export const apiUrl = "http://localhost:5000/api/"
export const operationsMenu = [
  "operations",
  "jobs",
  "cars",
  "operators",
  "settings",
];
export const unitOptions = [
  { value: "unit", label: "Unidad" },
  { value: "litro", label: "Litro" },
  { value: "galon", label: "Galón" },
  { value: "kilo", label: "Kilo" },
  { value: "gram", label: "Gramo" },
  { value: "0.5L", label: "0.5L" },
  { value: "1L", label: "1L" },
  { value: "3.5L", label: "3.5L" },
];

export const headerModules = ["operations"];
// const apiKey = process.env.VITE_API_KEY;
export const apiUrl =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const employeeRolesOptions = [
  { value: "painter", label: "Pintor" },
  { value: "body-worker", label: "Latonero" },
  { value: "detailer", label: "Detailing" },
  { value: "unknown", label: "Desconocido" },
];

export const statusTypes = [
  {
    value: "pending",
    label: "Pendiente",
    color: "bg-orange-50 text-orange-700 border border-orange-200",
  },
  {
    value: "in-progress",
    label: "En progreso",
    color: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  {
    value: "completed",
    label: "Completada",
    color: "bg-green-50 text-green-700 border border-green-200",
  },
];
