import Cookies from 'js-cookie';

export default function authHeader() {
    const user = JSON.parse(Cookies.get("user"));
  
    if (user && user.accessToken) {
      return { "Authorization": "Bearer " + user.accessToken };
    } else {
      return {};
    }
  }