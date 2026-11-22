import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
});

export const getProfil = () => api.get('/profil/');
export const getCompetences = () => api.get('/competences/');
export const getExperiences = () => api.get('/experiences/');
export const getFormations = () => api.get('/formations/');
export const getProjets = () => api.get('/projets/');

export default api;