import {
  GoogleMap,
  GoogleMapProps,
  Marker,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useEffect, useRef } from "react";
import useLocation from "../../../hooks/location.hook";
import {
  Gps,
  House,
  MagnifyingGlass,
  OfficeChair,
  Student,
  UsersThree,
} from "@phosphor-icons/react";
import Button from "../../shared/Button/Button";
import { parseGeocode } from "../../../helpers/parseGeocode";

const LocationSelection = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
  });
  const location = useLocation();
  const map = useRef<GoogleMap>(null);
  function handleLocationSelected(e: google.maps.MapMouseEvent) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        location: {
          lat: e.latLng?.lat() ?? 0,
          lng: e.latLng?.lng() ?? 0,
        },
      },
      (result) => {
        if (result) {
          const data = parseGeocode(result);
          console.log(data);
          location?.setLocation(data.coords, data.address);
        }
      }
    );
  }

  function relocateToCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
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
            location?.setLocation(data.coords, data.address);
          }
        }
      );
    });
  }

  return (
    <div className="fixed size-full z-[100] bg-black/10 flex items-center justify-center p-4">
      <div className="size-full bg-white border-2 border-black/10 rounded-2xl shadow-xl shadow-black/10 flex gap-2 flex-col p-4">
        <div className="flex gap-4">
          <div className="w-full flex h-full items-center text-2xl font-medium">
            Select Location
          </div>
          <div className="flex h-full w-3/5 shrink-0 gap-2">
            <input
              type="text"
              placeholder="Search for another address"
              className="w-full rounded-xl p-2 outline-none border-2 border-black/20 focus:border-primary"
            />
            <Button
              onClick={() => {}}
              className="shrink-0 h-full aspect-square"
            >
              <MagnifyingGlass></MagnifyingGlass>
            </Button>
          </div>
        </div>
        <div className="flex gap-4 size-full">
          <div className="w-full flex flex-col gap-2">
            <Detail title="Address" info={location?.address ?? ""}></Detail>
            <Input
              title="House/Flat/Block No."
              placeholder="House / Flat / Block No."
            ></Input>
            <Input
              title="House/Flat/Block No."
              placeholder="Apartment / Road / Area"
            ></Input>
            <div className="mt-auto flex flex-col gap-2">
              <div className="text-lg font-medium text-black/70">Save as </div>
              <div className="flex gap-2">
                <Button onClick={() => {}} className="w-full">
                  <House weight="fill"></House>Home
                </Button>
                <Button onClick={() => {}} className="w-full">
                  <OfficeChair weight="fill"></OfficeChair>Office
                </Button>
                <Button onClick={() => {}} className="w-full">
                  <Student weight="fill"></Student>School
                </Button>
                <Button onClick={() => {}} className="w-full">
                  <UsersThree weight="fill"></UsersThree>Family
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-blue-400 relative cursor-pointer h-full w-3/5 shrink-0 rounded-xl overflow-hidden flex items-center justify-center">
            {location?.coords && (
              <>
                <GoogleMap
                  ref={map}
                  onClick={handleLocationSelected}
                  options={{
                    disableDefaultUI: true,
                  }}
                  zoom={15}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={{
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                  }}
                >
                  <MarkerF
                    position={{
                      lat: location.coords.latitude,
                      lng: location.coords.longitude,
                    }}
                  ></MarkerF>
                </GoogleMap>
                <Button
                  onClick={relocateToCurrentLocation}
                  className="absolute bottom-0 right-0 text-2xl p-4 m-4"
                >
                  <Gps></Gps>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({
  title,
  placeholder,
}: {
  title: string;
  placeholder: string;
}) => {
  return (
    <>
      <div className="flex flex-col">
        {/* <div className="text-lg font-medium text-black/70">{title}</div> */}
        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-xl text-2xl p-2 outline-none border-2 border-black/20 focus:border-primary"
        />
      </div>
    </>
  );
};

const Detail = ({ title, info }: { title: string; info: string }) => {
  return (
    <div className="flex flex-col">
      <div className="text-lg font-medium text-black/70">{title}</div>
      <div className="text-2xl font-medium">{info}</div>
    </div>
  );
};

export default LocationSelection;
