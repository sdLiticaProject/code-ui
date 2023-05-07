const PLATFORM_API = 'http://localhost:5000';
const VERSION_API = '/api/v1';

export const loginUser = () => `${PLATFORM_API}${VERSION_API}/Profile/login`;
export const logoutUser = () => `${PLATFORM_API}${VERSION_API}/Profile/logout`;
export const getUser = () => `${PLATFORM_API}${VERSION_API}/Profile/me`;
export const registerUser = () => `${PLATFORM_API}${VERSION_API}/Profile`;

export const updateUser = () => `${PLATFORM_API}${VERSION_API}/Profile/update`;

// Set of API endpoints to work with time series entities
export const timeSeriesList = () => `${PLATFORM_API}${VERSION_API}/timeseries`;
