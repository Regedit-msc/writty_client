/* eslint-disable no-undef */
export const API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "https://live-gists.herokuapp.com"
    : "https://live-gists.herokuapp.com";
