import { jwtDecode } from "jwt-decode";
const Token = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwtDecode(token);
    const data = {
      name: decode.name,
      id: decode.id,
      email: decode.email,
      lastName: decode.last_name,
      activeToken: token,
    }
    const time = new Date().getTime() / 1000;
    if (decode.exp < time) {
      localStorage.removeItem("token");
      return false;
    }
    return data;
  }
  return false;
}
export default Token;