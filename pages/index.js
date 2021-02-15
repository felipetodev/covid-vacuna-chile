import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import data from 'data/latest.json'
import trademarkData from 'data/trademark_latest.json'
import NumberDigits from 'components/NumberDigits'
import TimeAgo from 'components/TimeAgo'
import Table from 'components/Table'
import Footer from 'components/Footer'

const trademark = trademarkData
// console.log(trademark)
const totalDosisPfizer = trademark.filter(el => el.Fabricante === 'Pfizer')
const totalDosisSinovac = trademark.filter(el => el.Fabricante === 'Sinovac')

const totalPrimeraDosisPfizer = totalDosisPfizer[0]
const totalSegundaDosisPfizer = totalDosisPfizer[1]

const totalPrimeraDosisSinovac = totalDosisSinovac[0]
const totalSegundaDosisSinovac = totalDosisSinovac[1]

const totales = data
const totalDosisPais = totales.filter(total => total.Region === 'Total')
const totalPrimeraDosis = totalDosisPais[0]
const totalSegundaDosis = totalDosisPais[1]

const keysTotalPrimeraDosis = Object.values(totalPrimeraDosis)
const keysTotalSegundaDosis = Object.values(totalSegundaDosis)

const keysTotalPrimeraPfizer = Object.values(totalPrimeraDosisPfizer)
const keysTotalSegundaPfizer = Object.values(totalSegundaDosisPfizer)

const keysTotalPrimeraSinovac = Object.values(totalPrimeraDosisSinovac)
const keysTotalSegundaSinovac = Object.values(totalSegundaDosisSinovac)



const reducer = (accumulator, currentValue) =>
  !isNaN(accumulator) ? parseInt(accumulator) + parseInt(currentValue) : 0
const totalPrimeraDosisAdministrada = keysTotalPrimeraDosis.reduce(reducer, 0)
const totalSegundaDosisAdministrada = keysTotalSegundaDosis.reduce(reducer, 0)

const totalPrimerasAdministradasPfizer = keysTotalPrimeraPfizer.reduce(reducer, 0)
const totalSegundasAdministradasPfizer = keysTotalSegundaPfizer.reduce(reducer, 0)
const totalAdministradasPfizer = totalPrimerasAdministradasPfizer + totalSegundasAdministradasPfizer

const totalPrimerasAdministradasSinovac = keysTotalPrimeraSinovac.reduce(reducer, 0)
const totalSegundasAdministradasSinovac = keysTotalSegundaSinovac.reduce(reducer, 0)
const totalAdministradasSinovac = totalPrimerasAdministradasSinovac + totalSegundasAdministradasSinovac

// console.log('>>> Revisar:', totalPrimeraDosisAdministrada)

export default function Home({ info }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Estado y progreso vacunación COVID-19 Chile 2021</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Vacunación COVID-19 en Chile<br/> <small>⚠️ en construcción ⚠️</small></h1>
        <small className={styles.description}>
          Datos actualizados hace <TimeAgo timestamp={info.lastModified} />.
          {' '}
          <a href='https://www.minciencia.gob.cl/covid19'>
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
                    {totalAdministradasPfizer + totalAdministradasSinovac}
                  </NumberDigits>
                </p>
              </div>
              <div>
                <small>
                  <img className={styles.companyLogo} src='pfizer-logo.png' />
                  <NumberDigits>
                    {totalAdministradasPfizer}
                  </NumberDigits>
                </small>
                <small>
                  <img className={styles.companyLogo} src='sinovac-logo.png' />
                  <NumberDigits>
                    {totalAdministradasSinovac}
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
                <h3>Dosis Administradas</h3>
                <p>
                  <NumberDigits>
                    {totalPrimeraDosisAdministrada + totalSegundaDosisAdministrada}
                  </NumberDigits>
                </p>
              </div>
              <div>
                <small>
                  <span>Primera Dosis:</span>
                  <NumberDigits>
                    {totalPrimeraDosisAdministrada}
                  </NumberDigits>
                </small>
                <small>
                  <span>Segunda Dosis:</span>
                  <NumberDigits>
                    {totalSegundaDosisAdministrada}
                  </NumberDigits>
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