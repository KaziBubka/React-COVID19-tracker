import React from 'react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/virus'
import styles from './LocationMarker.module.css'

const LocationMarker = ({ lat, lng, onClick }) => {
    
    return (
        <div className="location-marker">
            <Icon icon={locationIcon} className="location-icon" />
        </div>
    )
}

export default LocationMarker
