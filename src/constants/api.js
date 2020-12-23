export const loginUser = () => `${process.env.REACT_APP_APISERVER}/api/v1/Profile/login`;
export const logoutUser = () => `${process.env.REACT_APP_APISERVER}/api/v1/Profile/logout`;
export const getUser = () => `${process.env.REACT_APP_APISERVER}/api/v1/Profile/me`;
export const registerUser = () => `${process.env.REACT_APP_APISERVER}/api/v1/Profile`;
