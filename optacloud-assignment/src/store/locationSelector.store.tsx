import { createContext, ReactNode, useState } from "react";

type LocationSelectorContextType = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export const LocationSelectorContext =
  createContext<LocationSelectorContextType | null>(null);

export const LocationSelectorProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [show, setShow] = useState(false);
  return (
    <LocationSelectorContext.Provider value={{ show: show, setShow: setShow }}>
      {children}
    </LocationSelectorContext.Provider>
  );
};
