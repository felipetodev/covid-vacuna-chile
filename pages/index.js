import Head from 'next/head'
import styles from 'styles/Home.module.css'
import data from 'data/latest.json'
import NumberDigits from 'components/NumberDigits'

const totales = data
const totalDosisPais = totales.filter(total => total.Region === 'Total')
const totalPrimeraDosis = totalDosisPais[0]
const totalSegundaDosis = totalDosisPais[1]

const keysTotalPrimeraDosis = Object.values(totalPrimeraDosis)
const keysTotalSegundaDosis = Object.values(totalSegundaDosis)

const reducer = (accumulator, currentValue) => typeof accumulator === 'number' ? accumulator + currentValue : currentValue
const totalPrimeraDosisAdministrada = keysTotalPrimeraDosis.reduce(reducer, 0)
const totalSegundaDosisAdministrada = keysTotalSegundaDosis.reduce(reducer, 0)

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vacunas Covid-19 App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Vacunación COVID-19 en Chile</h1><br /> <h4>Fuente: minciencia.gob.cl/covid19</h4>
        <p>Datos actualizados al 12 de febrero de 2021</p>
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
