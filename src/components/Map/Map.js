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
                setZoom(8)
            } catch (error) {
                console.log(error)
            }
        }
    }, [country])

    //set markers based on selected country lat lng

    // const markers = countryCoordinates.map(ev => {
    //     return <LocationMarker lat={ev.latitude} lng={ev.longitude} />
    // })

    return (
        <div className={styles.map}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDc0YluVikmT5-uShSbG3Gm33HVR48F2sc'}}
                defaultCenter={ center }
                defaultZoom={ zoom }
            >
                <LocationMarker lat={center.lat} lng={center.lng} />
            </GoogleMapReact>
        </div>
    )
}

// Map.defaultProps = {
//     center: {
//         lat: 45.4215,
//         lng: -75.6971
//     },
//     zoom: 1
// }

export default Map
