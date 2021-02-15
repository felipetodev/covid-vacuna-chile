import Head from 'next/head'
import styles from 'styles/Home.module.css'
import data from 'data/latest.json'
import NumberDigits from 'components/NumberDigits'
import TimestampToDate from 'components/TimestampToDate'

const totales = data
const totalDosisPais = totales.filter(total => total.Region === 'Total')

console.log('➡ Region: ', totales[2].Region)

const totalPrimeraDosis = totalDosisPais[0]
const totalSegundaDosis = totalDosisPais[1]

const keysTotalPrimeraDosis = Object.values(totalPrimeraDosis)
const keysTotalSegundaDosis = Object.values(totalSegundaDosis)

const reducer = (accumulator, currentValue) => 
  !isNaN(accumulator) ? parseInt(accumulator) + parseInt(currentValue) : currentValue
const totalPrimeraDosisAdministrada = keysTotalPrimeraDosis.reduce(reducer, 0)
const totalSegundaDosisAdministrada = keysTotalSegundaDosis.reduce(reducer, 0)

export default function Home({ info }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vacunas Covid-19 App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Vacunación COVID-19 en Chile</h1><br /> <h4>Fuente: minciencia.gob.cl/covid19</h4>
        <p>Datos actualizados al <TimestampToDate timestamp={info.lastModified} /></p>
        <h3>Dosis Distribuidas:
          <NumberDigits>
            {totalPrimeraDosisAdministrada + totalSegundaDosisAdministrada}
          </NumberDigits>
        </h3>
        <h3>Primeras Dosis Administradas:
          <NumberDigits>{totalPrimeraDosisAdministrada}</NumberDigits>
        </h3>
        <h3>Segundas Dosis Administradas:
          <NumberDigits>{totalSegundaDosisAdministrada}</NumberDigits>
        </h3>
      </main>
    </div>
  )
}

export async function getStaticProps () {
  // const data = require('../data/latest.json')
  const info = require('../data/info.json')

  return {
    props: {
      // data,
      info,
    }
  }
}