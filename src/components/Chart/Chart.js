import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        }

        console.log(dailyData)

        fetchAPI()
    }, [])

    const url = 'https://covid19.mathdro.id/api'

    const fetchDailyData = async () => {
        try {
            const { data } = await axios.get(`${url}/daily`)
    
            const modifiedData = data.map((dailyData) => ({
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate,
            }))
    
            return modifiedData
    
        } catch (error) {
            console.log(error)
        }
    }

    const lineChart = (
        dailyData.length ? (<Line data={{
                labels: dailyData.map(({ date }) => new Date(date).toDateString()),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true, 
                }],
            }}
        />) : null
    )

    const barChart = (
        confirmed ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: `Current state in ${country}`,
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)', 
                            'rgba(0, 255, 0, 0.5)', 
                            'rgba(255, 0, 0, 0.5)',
                        ], 
                        data: [confirmed.value, recovered.value, deaths.value],
                    },],
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` },
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart
