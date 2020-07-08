import { useContext } from "react"
import { AuthContext } from "../../config/context"

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
}