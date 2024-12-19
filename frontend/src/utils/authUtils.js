import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import BASE_URL from "../config";

// Function to refresh the access token
export const refreshAuthToken = async (refreshToken) => {
  try {
    const response = await fetch(`${BASE_URL}/users/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();

    // Set the new access token in cookies
    Cookies.set("access_token", data.access, {
      sameSite: "Strict",
      secure: true,
    });

    // Optionally update refresh token if returned
    if (data.refresh) {
      Cookies.set("refresh_token", data.refresh, {
        sameSite: "Strict",
        secure: true,
      });
    }

    // Return the new access token
    return data.access;
  } catch (error) {
    throw new Error(`Token refresh error: ${error.message}`);
  }
};

// Helper function to decode the JWT and get the expiration time
const getTokenExpiration = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken.exp * 1000; // `exp` is in seconds, convert to milliseconds
};

// Helper function to check if the token is expiring soon (within 1 minute)
const isExpiringSoon = (token) => {
  const expirationTime = getTokenExpiration(token);
  const currentTime = Date.now();
  const timeLeft = expirationTime - currentTime;

  return timeLeft <= 0 || timeLeft < 1 * 60 * 1000; // Expired or expiring within 1 minute
};

// Function to fetch data with automatic token refresh if needed
export const fetchWithAuth = async (url, options = {}) => {
  let accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  if (!accessToken || !refreshToken) {
    throw new Error("No access or refresh token available. Please log in.");
  }

  // Check if the access token is close to expiring
  if (isExpiringSoon(accessToken)) {
    try {
      // Refresh the access token if it's close to expiring
      accessToken = await refreshAuthToken(refreshToken);
    } catch (error) {
      throw new Error("Failed to refresh access token. Please log in again.");
    }
  }

  // Proceed with the fetch request using the (new or existing) access token
  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Check if the response is 401 and try to refresh the token
    if (response.status === 401) {
      try {
        // Attempt to refresh the access token
        accessToken = await refreshAuthToken(refreshToken);

        // Retry the fetch request with the new access token
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Check if the retry request also fails with 401
        if (response.status === 401) {
          throw new Error("Retry after token refresh failed.");
        }
      } catch (error) {
        // Clear cookies and notify the caller of the failure
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        throw new Error(
          "Failed to refetch after token refresh. Please log in again."
        );
      }
    }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response; // Return the response if successful
  } catch (error) {
    throw new Error(`Fetch request error: ${error.message}`);
  }
};
