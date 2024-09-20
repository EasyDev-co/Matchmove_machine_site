import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

export const getUsernameFromToken = () => {
    // Get the access token from cookies
    const token = Cookies.get('access_token');

    // If token exists, decode it to get user information
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.username;  // Adjust based on your JWT payload structure
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }

    return null;
};