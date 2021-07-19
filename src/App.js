import React from 'react'
import axios from 'axios'
import { Cards, Chart, CountryPicker, Map } from './components'
import styles from './App.module.css'
import { useState, useEffect } from 'react'
import CountryLatLng from './countries.json'
import coronaImage from './images/image.png'

function App() {

  //useState sets states for the component
  const [data, setData] = useState([])

  const [country, setCountry] = useState('')

  const [countryCoordinates, setCountryCoordinates] = useState({ latitude: '', longitude: ''})

  console.log(countryCoordinates)

  //useEffect calls the fetchData function on page load
  //useEffect replaces componentDidMount in class based components
  
  useEffect(() => {
    const fetchedEventData = async () => {
      //fetchData fetches from the url
      const fetchedData = await fetchData()

      //setting fetchedData to state
      setData(fetchedData)
  
      console.log(fetchedData)
    }

    fetchedEventData()
  }, [])

  const url = 'https://covid19.mathdro.id/api'

  const fetchData = async (country) => {
    let changeableUrl = url

    //if country is selected, change url to specified country
    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        //destructuring { data } from response.data
        //destructuring { data: {confirmed ..}} from { data }
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl)

        const modifiedData = { confirmed, recovered, deaths, lastUpdate }

        return modifiedData         
    } catch (error) {
        console.log(error)
    }
  }


  //handleCountryChange is called onChange of CountryPicker
  //const is needed in functional component, and this.handleCountryChange is wrong
  //when passing prop into CountryPicker. so it's just handleCountryChange={handleCountryChange}
  
  const handleCountryChange = async (country) => {
    //fetch individual data based on chosen country
    const fetchedData = await fetchData(country)

    console.log(country)

    setData(fetchedData)
    //set the state
    setCountry(country)
    
  }

  useEffect(() => {
    if (country) {
      try {
        const foundCountry = CountryLatLng.find((countryObject) => countryObject.name === country)
        console.log(foundCountry)
        setCountryCoordinates({latitude: foundCountry.latitude, longitude: foundCountry.longitude})
        
      } catch (error) {
        console.log(error)
      }
    }
  }, [country])


  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt="COVID-19"/>
      <Map country={country} countryCoordinates={countryCoordinates} />
      <Cards data={data} country={country} />
      <CountryPicker handleCountryChange={handleCountryChange}/>
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
