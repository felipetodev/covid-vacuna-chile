import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import data from 'data/latest.json'
import trademarkData from 'data/trademark_latest.json'
import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage'
import TimeAgo from 'components/TimeAgo'
import Table from 'components/Table'
import Footer from 'components/Footer'

/* Datos por Distribucion */
const totales = data

const totalDosisPais = totales.filter(total => total.Region === 'Total')
const totalPrimeraDosis = totalDosisPais[0]
const totalSegundaDosis = totalDosisPais[1]

// Ultimos datos de Primeras Dosis Distribuidas
const primeraDayKey = Object.entries(totalPrimeraDosis)
const actualPrimeraDayData = parseInt(primeraDayKey[primeraDayKey.length-1][1])
// Ultimos datos de Segundas Dosis Distribuidas
const segundaDayKey = Object.entries(totalSegundaDosis)
const actualSegundaDayData = parseInt(segundaDayKey[segundaDayKey.length-1][1])

/* Datos por marca Vacuna */
const trademark = trademarkData
const totalDosisPfizer = trademark.filter(marca => marca.Fabricante === 'Pfizer')
const totalDosisSinovac = trademark.filter(marca => marca.Fabricante === 'Sinovac')

// Ultimos datos de Primeras Dosis Vacunas Pfizer
const pfizerPrimeraKey = Object.entries(totalDosisPfizer[0])
const actualPfizerPrimeraDayData = parseInt(pfizerPrimeraKey[pfizerPrimeraKey.length-1][1])
// Ultimos datos de Segunda Dosis Vacunas Pfizer
const pfizerSegundaKey = Object.entries(totalDosisPfizer[1])
const actualPfizerSegundaDayData = parseInt(pfizerSegundaKey[pfizerSegundaKey.length-1][1])

// Ultimos datos de Primeras Dosis Vacunas Pfizer
const sinovacPrimeraKey = Object.entries(totalDosisSinovac[0])
const actualSinovacPrimeraDayData = parseInt(sinovacPrimeraKey[sinovacPrimeraKey.length-1][1])
// Ultimos datos de Segunda Dosis Vacunas Pfizer
const sinovacSegundaKey = Object.entries(totalDosisSinovac[1])
const actualSinovacSegundaDayData = parseInt(sinovacSegundaKey[sinovacSegundaKey.length-1][1])


export default function Home({ info }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Estado y progreso vacunación COVID-19 Chile 2021</title>
        <meta
          name='description'
          content='Consulta el estado y progreso de la vacunación del COVID-19 de forma diaria según datos del gobierno'
        />
        <meta property='og:locale' content='es' />
        <meta property='og:title' content='Estado y progreso vacunación COVID-19 Chile 2021' />
        <meta property='og:image' content='og.png' />
        <meta property='og:description' content='Consulta el estado y progreso de la vacunación del COVID-19 de forma diaria según datos del gobierno' />
        <meta property='og:site_name' content='Estado vacunación en Chile' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='fe_ossandon' />
        <meta name='twitter:description' content='Consulta el estado y progreso de la vacunación del COVID-19 de forma diaria según datos del gobierno' />
        <meta name='twitter:site' content='fe_ossandon' />
        <meta name='twitter:title' content='Estado y progreso vacunación COVID-19 Chile 2021' />
        <meta property='twitter:domain' content='covid-vacuna-chile.vercel.app' />
        <meta property='twitter:url' content='https://covid-vacuna-chile.vercel.app/' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Vacunación COVID-19 en Chile<br /> <small>⚠️ en construcción ⚠️</small></h1>
        <small className={styles.description}>
          Datos actualizados hace <TimeAgo timestamp={info.lastModified} />.
          {' '}
          <a target='_blank' rel='noreferrer' href='https://www.minciencia.gob.cl/covid19'>
            Fuente: Ministerio de Ciencia
          </a>
        </small>

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
                    {actualPrimeraDayData + actualSegundaDayData}
                  </NumberDigits>
                </p>
              </div>
              <div>
                <small>
                  <img className={styles.companyLogo} src='pfizer-logo.png' />
                  <NumberDigits>
                    {actualPfizerPrimeraDayData + actualPfizerSegundaDayData}
                  </NumberDigits>
                </small>
                <small>
                  <img className={styles.companyLogo} src='sinovac-logo.png' />
                  <NumberDigits>
                    {actualSinovacPrimeraDayData + actualSinovacSegundaDayData}
                  </NumberDigits>
                </small>
              </div>
            </section>
          </div>

          <div className={styles.card}>
            <header>
              <Image
                src='/vacuna.png'
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
                    {actualPfizerSegundaDayData + actualSinovacSegundaDayData}
                  </NumberDigits>
                </p>
              </div>
              <div>
                <small className={styles.primary}>
                  <h4>% sobre administradas</h4>
                  <p className={styles.secondary}>
                    <NumberPercentage>
                      {(actualPfizerSegundaDayData + actualSinovacSegundaDayData)/(actualPrimeraDayData + actualSegundaDayData)}
                    </NumberPercentage>
                  </p>
                </small>
              </div>
            </section>
          </div>

        </div>
        <a className={styles.download} download href='/data/latest.json'>
          <Image
            width={32}
            height={32}
            src='/download.png'
            alt='Descargar datos'
          />
          Descargar últimos datos en formato JSON
        </a>
      </main>
      <Table />
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  // const data = require('../data/latest.json')
  const info = require('../data/info.json')

  return {
    props: {
      // data,
      info,
    }
  }
}