import { useContext } from "react";
import { LocationSelectorContext } from "../store/locationSelector.store";

export function useLocationSelector() {

    const locationSelector = useContext(LocationSelectorContext);


    return locationSelector;
}