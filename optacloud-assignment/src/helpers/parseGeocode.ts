

export function parseGeocode(result: google.maps.GeocoderResult[]){
    const data = {
        coords: {
            latitude: result[0].geometry.location.lat(),
            longitude: result[0].geometry.location.lng()
        },
        address: result[0].formatted_address,
        city: result[0].address_components[4].long_name,
    }

    return data;
}

