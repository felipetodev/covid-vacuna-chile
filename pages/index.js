import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage'
import TimeAgo from 'components/TimeAgo'
import Table from 'components/Table'
import Footer from 'components/Footer'
import Progress from 'components/Progress'
import Prevision from 'components/Prevision'
import Link from 'next/link'
import Share from 'components/Share'
import { DosisPorEdadTooltip } from 'components/ProgressChart/tooltips'
import { DosisPorSexoTooltip } from 'components/PieChartGraph/tooltips'
import ProgressChart from 'components/ProgressChart'
import PieChartGraph from 'components/PieChartGraph'

export default function Home({ info, data, vaccineData, ageRangeData, bySexData }) {
  const totals = data.find(({ Region }) => Region === 'Total')

  return (
    <div className={styles.container}>
      <Head>
        <title>Estado y progreso vacunación COVID-19 Chile 2021</title>
        <meta
          name='description'
          content='Consulta el estado y progreso de la vacunación del COVID-19 de forma diaria según datos del gobierno'
        />
        <meta name='theme-color' content='#d2effd' />
        <meta property='og:locale' content='es' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Estado y progreso vacunación COVID-19 Chile 2021' />
        <meta property='og:image' content='https://covid-vacuna-chile.vercel.app/yo-me-vacuno.png' />
        <meta property='og:description' content='Consulta el estado y progreso de la vacunación del COVID-19 de forma diaria según datos del gobierno' />
        <meta property='og:site_name' content='Estado vacunación en Chile' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='fe_ossandon' />
        <meta name='twitter:description' content='Consulta el estado y progreso de la vacunación del COVID-19 de forma diaria según datos del gobierno' />
        <meta name='twitter:site' content='fe_ossandon' />
        <meta name='twitter:title' content='Estado y progreso vacunación COVID-19 Chile 2021' />
        <meta name='twitter:image' content='https://covid-vacuna-chile.vercel.app/yo-me-vacuno.png' />
        <meta property='twitter:domain' content='covid-vacuna-chile.vercel.app' />
        <meta property='twitter:url' content='https://covid-vacuna-chile.vercel.app/' />
        <link rel='canonical' href='https://covid-vacuna-chile.vercel.app' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Vacunación COVID-19 en Chile</h1>
        <small className={styles.description}>
          Datos actualizados <TimeAgo timestamp={info.lastModified} />.
          {' '}
          <a target='_blank' rel='noreferrer' href='https://github.com/MinCiencia/Datos-COVID19'>
            Fuente: Ministerio de Ciencia
          </a>
        </small>

        <div className={styles.dashboard}>
          <Link href='/tv'>
            <a
              alt='Dashboard mode'
              title='Dashboard'>
              TV Mode
            </a>
          </Link>
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

        <Progress totals={totals} />
        <Prevision totals={totals} />

        <a className={styles.download} download href='../data/latest.json'>
          <Image
            width={32}
            height={32}
            src='/download.png'
            alt='Descargar datos'
          />
          Descargar últimos datos en formato JSON
        </a>

        <Link href='/como-incrustar'>
          <a className={styles.download}>
            <Image
              width={32}
              height={32}
              src='/embed.png'
              alt='incrustar datos de vacunación'
            />
            Quiero incrustar los datos de vacunación en otra página web
          </a>
        </Link>
      </main>

      <h2 className={styles.subtitle}>Por regiones</h2>
      <Table data={data} />

      <h2 className={styles.subtitle}>Dosis administradas por edad</h2>
      <ProgressChart
        tooltip={DosisPorEdadTooltip}
        data={ageRangeData}
      />

      <h2 className={styles.subtitle}>Dosis administradas por sexo</h2>
      <PieChartGraph
        tooltip={DosisPorSexoTooltip}
        data={bySexData} 
      />

      <h2 className={styles.subtitle}>Enlaces de interés</h2>
      <ul>
        <li>
          <a
            className={styles.link}
            target='_blank'
            rel='noreferrer'
            href='https://www.gob.cl/yomevacuno'
          >
            Plan nacional de vacunación COVID-19 en Chile
            </a>
        </li>
        <li>
          <a
            className={styles.link}
            target='_blank'
            rel='noreferrer'
            href='https://www.gob.cl/yomevacuno/vacunatorios'
          >
            Busca tu local de vacunación más cercano
            </a>
        </li>
      </ul>

      <Share />
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const data = require('../public/data/latest.json')
  const vaccineData = require('../public/data/trademark_latest.json')
  const ageRangeData = require('../public/data/age_range_vaccine.json')
  const bySexData = require('../public/data/by_sex_vaccine.json')
  const info = require('../public/data/info.json')

  return {
    props: {
      data,
      vaccineData,
      ageRangeData,
      bySexData,
      info
    }
  }
}