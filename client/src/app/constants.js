export const serverUrl = "/api/";

/* Accounts URLs */
export const accountsUrl = `${serverUrl}v1/accounts/`;
export const getCsrfTokenUrl = `${accountsUrl}csrf-token/`;
export const myProfileUrl = `${accountsUrl}me/`;
export const loginUrl = `${accountsUrl}login/`;
export const resetPasswordUrl = `${accountsUrl}password-reset/`;
export const resetPasswordConfirmUrl = `${resetPasswordUrl}confirm/`;

/* Custom Pages URLs */
export const customPageListUrl = `${serverUrl}v1/pages/`;

/* T&C page URL */
export const termsPageUrl = "/pages/terms/";
