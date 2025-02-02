const { env } = require("./config");

const cookieOptions = {
  secure: true,
  sameSite: "lax",
  domain: env.COOKIE_DOMAIN,
};

const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: Number(env.JWT_ACCESS_TOKEN_TIME_IN_MS),
    ...cookieOptions,
  });
};
const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: Number(28800000),
    ...cookieOptions,
  });
};
const setCsrfTokenCookie = (res, csrfToken) => {
  res.cookie("csrfToken", csrfToken, {
    httpOnly: false,
    maxAge: Number(950000),
    ...cookieOptions,
  });
};
const setAllCookies = (res, accessToken, refreshToken, csrfToken) => {
  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);
  setCsrfTokenCookie(res, csrfToken);
};

const clearAllCookies = (res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  res.clearCookie("csrfToken", cookieOptions);
};

module.exports = {
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setCsrfTokenCookie,
  setAllCookies,
  clearAllCookies,
};
