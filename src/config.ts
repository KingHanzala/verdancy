const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export function getBackendURL() {
    return backendUrl;
}

export default getBackendURL;