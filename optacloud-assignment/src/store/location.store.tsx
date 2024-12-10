import { createContext, ReactNode, useState } from "react";

type LocationContextType = {
  coords: {
    latitude: number;
    longitude: number;
  };
  address: string;
  setLocation: (
    coords: { latitude: number; longitude: number },
    address: string
  ) => void;
};

export const LocationContext = createContext<LocationContextType | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState("");

  function setLocation(
    coords: { latitude: number; longitude: number },
    address: string
  ) {
    setCoords(coords);
    setAddress(address);
  }

  return (
    <LocationContext.Provider
      value={{
        coords,

        address,
        setLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
