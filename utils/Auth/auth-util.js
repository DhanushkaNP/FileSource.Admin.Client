import jwt from "jsonwebtoken";

export const getStoredAuthData = () => {
  const storedAuthData = localStorage.getItem("authData");
  return storedAuthData ? JSON.parse(storedAuthData) : null;
};

export const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);

    const expirationDateTime = parseInt(decoded.exp);
    const formattedExpirationDate = expirationDateTime.toLocaleString();

    return {
      ...decoded,
      exp: formattedExpirationDate,
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
};
