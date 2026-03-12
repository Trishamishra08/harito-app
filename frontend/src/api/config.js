export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname.includes('vercel.app') 
    ? 'https://hirato-app.onrender.com/api' 
    : 'http://localhost:5000/api');

export const getImageUrl = (path) => {
  if (!path) return '';
  
  if (path.startsWith('http')) return path;
  
  if (path.startsWith('/images/')) return path;
  if (path.startsWith('images/')) return `/${path}`;
  if (path.startsWith('public/images/')) return `/${path.replace('public/', '')}`;
  
  if (path.startsWith('/uploads')) {
    const base = API_BASE_URL.replace(/\/api$/, '');
    return `${base}${path}`;
  }
  
  return `/images/${path.startsWith('/') ? path.slice(1) : path}`;
};
