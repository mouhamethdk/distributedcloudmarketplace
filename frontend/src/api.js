import axios from 'axios';

// Création d'une instance Axios
const API = axios.create({
    baseURL: 'http://localhost:3000/', // Base URL de votre backend
});

// Ajouter un intercepteur pour injecter automatiquement le token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Récupère le token du stockage local
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Ajoute le token dans les en-têtes
    }
    return config; // Retourne la config mise à jour
}, (error) => {
    return Promise.reject(error); // Gère les erreurs dans l'intercepteur
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response && error.response.status === 401) {
          // Si le token est invalide, déconnecte l'utilisateur
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/signin';
      }
      return Promise.reject(error);
  }
);



export default API;
