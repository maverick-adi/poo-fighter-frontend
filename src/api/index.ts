import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

// Attach token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (!config.headers) config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Auth
  sendOtp: (payload: { email?: string; phone?: string }) =>
    apiClient.post('/users/auth/login-or-signup', payload),
  verifyOtp: (payload: { email?: string; phone?: string; otp: string }) =>
    apiClient.post('/users/auth/verify-otp', payload),

  // Pets
  getPets: () => apiClient.get('/customers/pets'),
  addPet: (customerId: string, pet: any) =>
    apiClient.post(`/customers/${customerId}/pets`, pet),
  addPetsBulk: (customerId: string, pets: any[]) =>
    apiClient.post(`/customers/${customerId}/pets/bulk`, pets),
  updatePet: (petId: string, pet: any) => apiClient.put(`/customers/pet/${petId}`, pet),
  deletePet: (petId: string) => apiClient.delete(`/customers/${petId}`),
};
