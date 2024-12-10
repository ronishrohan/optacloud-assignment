import { useContext } from "react"
import { AuthContext } from "../store/auth.store"

export const useAuth = () => {
    const auth = useContext(AuthContext);

    return auth;
}