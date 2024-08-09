export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTE = "/api/auth";
export const SIGN_UP_ROUTE = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const GET_USER_INFO_ROUTE = `${AUTH_ROUTE}/get-user-info`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;
export const UPDATE_PROFILE_INFORMATION_ROUTE = `${AUTH_ROUTE}/update-profile-information`;
export const GET_PROFILE_INFORMATION_ROUTE = `${AUTH_ROUTE}/get-profile-information`;
export const UPDATE_PROFILE_PICTURE_ROUTE = `${AUTH_ROUTE}/update-profile-picture`;
export const DELETE_PROFILE_PICTURE_ROUTE = `${AUTH_ROUTE}/delete-profile-picture`;

export const PRODUCT_ROUTE = "/api/product";
export const GET_ALL_PRODUCTS = `${PRODUCT_ROUTE}/get-products`;
export const GET_NEW_COLLECTION = `${PRODUCT_ROUTE}/new-collection`;
export const GET_MEN_PRODUCTS = `${PRODUCT_ROUTE}/get-men-category-products`;
export const GET_WOMEN_PRODUCTS = `${PRODUCT_ROUTE}/get-women-category-products`;
export const GET_KIDS_PRODUCTS = `${PRODUCT_ROUTE}/get-kids-category-products`;
export const GET_PRODUCT_BY_ID = `${PRODUCT_ROUTE}/allProducts/`;
