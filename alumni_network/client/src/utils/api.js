import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

export const fetchEvents = () => API.get('/api/events');
export const fetchEvent = id => API.get(`/api/events/${id}`);
export const createEvent = newEvent => API.post('/api/events', newEvent);
export const updateEvent = (id, updatedEvent) => API.patch(`/api/events/${id}`, updatedEvent);
export const deleteEvent = id => API.delete(`/api/events/${id}`);
export const registerEvent = id => API.post(`/api/events/${id}/register`);

export const fetchProjects = () => API.get('/api/projects');
export const fetchProject = id => API.get(`/api/projects/${id}`);
export const createProject = newProject => API.post('/api/projects', newProject);
export const updateProject = (id, updatedProject) => API.patch(`/api/projects/${id}`, updatedProject);
export const deleteProject = id => API.delete(`/api/projects/${id}`);
export const joinProject = id => API.post(`/api/projects/${id}/join`);

export const fetchResources = () => API.get('/api/resources');
export const fetchResource = id => API.get(`/api/resources/${id}`);
export const createResource = newResource => API.post('/api/resources', newResource);
export const updateResource = (id, updatedResource) => API.patch(`/api/resources/${id}`, updatedResource);
export const deleteResource = id => API.delete(`/api/resources/${id}`);

export const signIn = formData => API.post('/api/auth/login', formData);
export const signUp = formData => API.post('/api/auth/register', formData);