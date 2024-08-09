export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTE = "/api/auth";
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const GET_USER_INFO_ROUTE = `${AUTH_ROUTE}/get-user-info`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;

export const ADMIN_ROUTE = "/api/admin";
export const UPLOAD_PRODUCT_IMAGES = `${ADMIN_ROUTE}/addProduct/images`;
export const ADD_PRODUCT = `${ADMIN_ROUTE}/add-product`;
