import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import CardComponent from './Card/Card'
import styles from './Cards.module.css'

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }, country}) => {
    if (!confirmed) {
        return 'Loading ...'
    }
    return (
        <div className={styles.container}>
            <Typography gutterBottom variant="h4" component="h2">{country ? country : "Global"}</Typography>
            <Grid container spacing={3} justify="center">
                <CardComponent 
                    className={styles.infected}
                    cardTitle="Infected"
                    value={confirmed.value}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of active cases of COVID-19"
                />
                <CardComponent 
                    className={styles.recovered}
                    cardTitle="Recovered"
                    value={recovered.value}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of recovered cases from COVID-19"
                />
                <CardComponent 
                    className={styles.deaths}
                    cardTitle="Deaths"
                    value={deaths.value}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of deaths from COVID-19"
                />
            </Grid>
        </div>                   
    )                                                                                                                    
}                                                                                                                                              
                    
export default Cards
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          