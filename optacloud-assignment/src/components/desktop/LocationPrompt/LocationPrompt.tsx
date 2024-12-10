import { Gps, GpsSlash, MagnifyingGlass } from "@phosphor-icons/react";
import Button from "../../shared/Button/Button";
import { useJsApiLoader } from "@react-google-maps/api";

import { useState } from "react";
import { parseGeocode } from "../../../helpers/parseGeocode";
import useLocation from "../../../hooks/location.hook";
import { useLocationSelector } from "../../../hooks/locationSelector.hook";

const LocationPrompt = () => {
  const location = useLocation();
  const [showLocationPrompt, setShowLocationPrompt] = useState<boolean>(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
  });

  const locationSelector = useLocationSelector();
  async function handleGetLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        },
        (result) => {
          if (result) {
            const data = parseGeocode(result);
            console.log(data);
            location?.setLocation(
              data.coords,
              data.address
            );
            locationSelector?.setShow(true)
          }
        }
      );
    });
  }

  return (
    <>
      {isLoaded && (
        <>
          <div className="z-50 size-full fixed bg-black/20 flex items-center justify-center">
            <div className="w-[400px] min-h-[250px] h-fit p-8 z-50 rounded-2xl shadow-xl flex items-center flex-col bg-white fixed shadow-black/10 border-2 border-black/10 gap-1">
              <div className="text-4xl text-red-600">
                <GpsSlash></GpsSlash>
              </div>
              <h1 className="font-medium text-xl">
                Location permission is off
              </h1>
              <h2 className="font-medium text-sm text-black/70 text-center">
                We need your location to find the nearest store and provide you
                the best experience
              </h2>
              <div className="flex flex-col mt-2 w-full gap-2">
                {showLocationPrompt ? (
                  <>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      className="w-full p-2 rounded-xl border-2 border-primary outline-none"
                    />
                    <Button onClick={() => {}}>
                      <MagnifyingGlass></MagnifyingGlass>Search
                    </Button>
                    <Button onClick={handleGetLocation}>
                      <Gps></Gps>Use your location instead
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleGetLocation} className="w-full">
                      <Gps></Gps>
                      Enable Location
                    </Button>
                    <Button
                      onClick={() => setShowLocationPrompt(true)}
                      className="w-full border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white "
                    >
                      <MagnifyingGlass></MagnifyingGlass>
                      Search your Location Manually
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LocationPrompt;
