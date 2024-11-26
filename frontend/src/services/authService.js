import axios from "axios";

const API_URL = "http://localhost:5000/";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token } = response.data;

    // Stocker le token dans le localStorage pour des sessions persistantes
    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    throw error.response.data || { message: "An error occurred" };
  }
};

