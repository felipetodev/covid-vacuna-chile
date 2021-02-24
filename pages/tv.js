import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Tv.module.css'
import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage'
import TimeAgo from 'components/TimeAgo'
import Progress from 'components/Progress'
import { FullScreen, useFullScreenHandle } from "react-full-screen"

export default function Tv({ data, vaccineData, info }) {
    const [ region, setRegion ] = useState(16)
    const [ fullscreen, setFullscreen ] = useState(false)
    const totals = data.find(({ Region }) => Region === 'Total')
    const regionChanger = data[region]
    const handle = useFullScreenHandle()

    useEffect(() => {
        const interval = setInterval(() => {
            setRegion(Math.floor(Math.random() * (data.length - 1)) + 1)
        }, 6000)

        return () => clearInterval(interval)
    }, [])

    const reportChange = useCallback(state => {
        setFullscreen(state)
    }, [handle])

    return (
        <>
            <Head>
                <title>Estado y progreso vacunación COVID-19 Chile 2021 - TV Dashboard</title>
            </Head>

            <FullScreen className={styles.main} handle={handle} onChange={reportChange}>
                <h1 className={styles.title}>Vacunación COVID-19 en Chile</h1>
                <small className={styles.description}>
                    Datos actualizados <TimeAgo timestamp={info.lastModified} />.
                {' '}
                    <a target='_blank' rel='noreferrer' href='https://www.minciencia.gob.cl/covid19'>
                        Fuente: Ministerio de Ciencia
                </a>
                </small>

                <div className={fullscreen ? styles.dashboardActive : styles.dashboard}>
                    <button onClick={handle.enter}>Fullscreen</button>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <header>
                            <Image
                                className={styles.cardImage}
                                src='/vacuna.png'
                                alt='Vacunas distribuidas en Chile'
                                width={150}
                                height={150}
                            />
                        </header>
                        <section>
                            <div>
                                <h3>Dosis Administradas</h3>
                                <p>
                                    <NumberDigits>
                                        {totals.totalDosisAdministradas}
                                    </NumberDigits>
                                </p>
                            </div>
                            <div>
                                <small>
                                    <h4>
                                        <span>Primeras Dosis:</span>
                                        {'  '}
                                        <NumberDigits>
                                            {totals.primerasDosisAdministradas}
                                        </NumberDigits>
                                    </h4>
                                </small>
                                <small>
                                    <h4>
                                        <span>Segundas Dosis:</span>
                                        {'  '}
                                        <NumberDigits>
                                            {totals.segundasDosisAdministradas}
                                        </NumberDigits>
                                    </h4>
                                </small>
                            </div>
                        </section>
                    </div>

                    <div className={styles.card}>
                        <header>
                            <Image
                                className={styles.cardImage}
                                src='/vacuna.png'
                                alt='Vacunas distribuidas en Chile'
                                width={150}
                                height={150}
                            />
                        </header>
                        <section>
                            <div>
                                <h3>Por Fabricante</h3>
                            </div>
                            <div>
                                <small>
                                    <img className={styles.companyLogo} src='pfizer-logo.png' />
                                    <NumberDigits>
                                        {vaccineData[0].totalDosisDistribuidasPfizer}
                                    </NumberDigits>
                                </small>
                                <small>
                                    <img className={styles.companyLogo} src='sinovac-logo.png' />
                                    <NumberDigits>
                                        {vaccineData[1].totalDosisDistribuidasSinovac}
                                    </NumberDigits>
                                </small>
                            </div>
                        </section>
                    </div>

                    <div className={styles.card}>
                        <header>
                            <Image
                                src='/vacunas-completas.png'
                                alt='Vacunas administradas en Chile'
                                width={150}
                                height={150}
                            />
                        </header>
                        <section>
                            <div>
                                <h3>Personas con pauta completa</h3>
                                <p>
                                    <NumberDigits>
                                        {totals.segundasDosisAdministradas}
                                    </NumberDigits>
                                </p>
                            </div>
                            <div>
                                <small className={styles.primary}>
                                    <h4>% sobre administradas</h4>
                                    <p className={styles.secondary}>
                                        <NumberPercentage>
                                            {totals.segundasDosisAdministradas / totals.totalDosisAdministradas}
                                        </NumberPercentage>
                                    </p>
                                </small>
                            </div>
                        </section>
                    </div>



                </div>
                <div className={styles.grid}>

                    <Progress totals={totals} />

                    <div className={styles.card}>
                        <div>
                            <h3>Región - {regionChanger.Region}</h3>
                        </div>
                        <div>
                            <small>
                                <h4>
                                    <span>Dosis Administradas:</span>
                                    {'  '}
                                    <NumberDigits>
                                        {regionChanger.totalDosisAdministradas}
                                    </NumberDigits>
                                </h4>
                            </small>
                            <small>
                                <h4>
                                    <span>% Población Vacunada:</span>
                                    {'  '}
                                    <NumberPercentage>
                                        {regionChanger.porcentajePoblacionAdministradas}
                                    </NumberPercentage>
                                </h4>
                            </small>
                            <small>
                                <h4>
                                    <span>% Población Pauta Completa:</span>
                                    {'  '}
                                    <NumberPercentage>
                                        {regionChanger.porcentajePoblacionCompletas}
                                    </NumberPercentage>
                                </h4>
                            </small>
                        </div>
                    </div>

                </div>
            </FullScreen>
        </>
    )
}

export async function getStaticProps() {
    const data = require('../public/data/latest.json')
    const vaccineData = require('../public/data/trademark_latest.json')
    const info = require('../public/data/info.json')

    return {
        props: {
            data,
            vaccineData,
            info
        }
    }
}