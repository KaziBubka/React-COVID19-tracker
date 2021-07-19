import React from 'react'
import GoogleMapReact from 'google-map-react'
import { useState, useEffect } from 'react'
import styles from './Map.module.css'
import LocationMarker from '../LocationMarker/LocationMarker'


const Map = ({ country, countryCoordinates }) => {
    
    //if country is selected, change center and zoom to corresponding country's lat & lng
    //if global is selected, show default map

    const [center, setCenter] = useState({
        lat: 45.4215,
        lng: -75.6971
    })

    const [zoom, setZoom] = useState(1)

    console.log(`map center: ${JSON.stringify(center)}, zoom: ${zoom}`)

    useEffect(() => {
        if (country) {
            try {
                setCenter({lat: countryCoordinates.latitude, lng: countryCoordinates.longitude})
                setZoom(6)
            } catch (error) {
                console.log(error)
            }
        }
    }, [countryCoordinates])

    //set markers based on selected country lat lng


    return (
        <div className={styles.map}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'GOOGLE-MAPS-API-KEY'}}
                center={ center }
                defaultCenter={ center }
                zoom={ zoom }
            >
                <LocationMarker lat={center.lat} lng={center.lng} />
            </GoogleMapReact>
        </div>
    )
}

export default Map
