import { useContext } from "react";
import { LocationContext } from "../store/location.store";

export default function useLocation() {
    const location = useContext(LocationContext);


    return location;
}