import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NativeSelect, FormControl } from '@material-ui/core'
// import { fetchCountries } from '../../api'
// import CountryLatLng from '../../countries.json'
import styles from './CountryPicker.module.css'

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([])

    useEffect(() => {
        const fetchCountryAPI = async () => {
            const response = await fetchCountries()
            setFetchedCountries(response) 
        }

        fetchCountryAPI()
    }, [setFetchedCountries])

    const url = 'https://covid19.mathdro.id/api'

    const fetchCountries = async () => {
        try {
            const { data: { countries }} = await axios.get(`${url}/countries`)
    
            return countries.map((country) => country.name)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormControl className={styles.FormControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
