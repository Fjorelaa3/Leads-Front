import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode, getLatLng
} from "use-places-autocomplete";

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    if (!isLoaded) return <div>Loading ...</div>
    return <Map />;
}

function Map() {
    const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
    const [selected, setSelected] = useState(null);
    return (
        <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
        >
            <Marker position={center} />
        </GoogleMap>
    );
}

