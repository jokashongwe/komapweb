const BASE_URL = import.meta.env.VITE_JSON_SERVER_URL;

export const getDashboardData = async () => {
  try {
    const url = BASE_URL + "/dashboard";
    const response = await fetch(url, { method: "GET" });
    const  json_response = await response.json();
    return json_response
  } catch (error) {
    throw error;
  }
};
