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
];

export const headerModules = ["operations"];
// const apiKey = process.env.VITE_API_KEY;
export const apiUrl =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const employeeRolesOptions = [
  { value: "painter", label: "Pintor" },
  { value: "body-worker", label: "Latonero" },
  { value: "mechanic", label: "Mecánico" },
  { value: "unknown", label: "Desconocido" },
];

export const statusTypes = [
  { value: "pending", label: "Pendiente", color: "orange-300" },
  { value: "in-progress", label: "En progreso", color: "blue-300" },
  { value: "completed", label: "Completada", color: "green-300" },
];
