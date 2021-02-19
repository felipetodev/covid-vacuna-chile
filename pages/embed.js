import styles from 'styles/Embed.module.css'
import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage'
import TimeAgo from 'components/TimeAgo'

const population = 18730000

export default function Embed({ actualPrimeraDayData, actualSegundaDayData, dosisAdministradasTotal, dosisCompletasAdministradas, info }) {
    
    return (
        <>
            <div className={styles.embedContainer}>
                <div className={styles.card}>
                    <img
                        src='/vacuna.png'
                        alt='Vacunas administradas en Chile'
                        width={150}
                        height={150}
                    />
                    <section>
                        <div>
                            <h3>Dosis administradas:</h3>
                            <p>
                                <NumberDigits>{dosisAdministradasTotal}</NumberDigits>
                            </p>
                        </div>
                        <p>
                            Supone el <strong><NumberPercentage>{dosisAdministradasTotal/population}</NumberPercentage></strong> del total de Chile<br />
                            <strong><NumberPercentage>{actualPrimeraDayData / dosisAdministradasTotal}</NumberPercentage></strong> corresponde a primeras dosis<br />
                            <strong><NumberPercentage>{actualSegundaDayData / dosisAdministradasTotal}</NumberPercentage></strong> corresponde a segundas dosis<br />
                        </p>
                    </section>
                </div>

                <div className={styles.card}>
                    <img
                        src='/vacunas-completas.png'
                        alt='Dosis completas subministradas'
                        width={150}
                        height={150}
                    />
                    <section>
                        <div>
                            <h3>Pauta completa:</h3>
                            <p>
                                <NumberDigits>{dosisCompletasAdministradas}</NumberDigits>
                            </p>
                        </div>
                        <p>
                            Personas que han recibido las dos dosis de la vacuna.<br />
                            Suponen un <strong><NumberPercentage>{dosisCompletasAdministradas/dosisAdministradasTotal}</NumberPercentage></strong> de las dosis administradas.<br />Supone el <strong><NumberPercentage>{dosisCompletasAdministradas/population}</NumberPercentage></strong> del total de Chile
                        </p>
                    </section>
                </div>

                <small className={styles.description}>
                    Desarrollado por <strong><a href='https://felipetodev.com' target='_blank' rel='noopener noreferrer'>@felipetodev</a></strong>
                </small>

                <small className={styles.by}>
                    <a href='https://covid-vacuna-chile.vercel.app' target='_blank' rel='nofollow noreferrer'><strong>covid-vacuna-chile.vercel.app</strong></a> - Datos actualizados <TimeAgo timestamp={info.lastModified} />
                </small>

            </div>
        </>
    )
}

export async function getStaticProps() {
    const { 
        dosisCompletasAdministradas, 
        dosisAdministradasTotal,
        actualPrimeraDayData,
        actualSegundaDayData,
    } = require('../public/data/logic')
    const info = require('../data/info.json')
    const { population: { Total } } = require('../public/data/bbdd.json')

    return {
        props: {
            dosisAdministradasTotal,
            dosisCompletasAdministradas,
            actualPrimeraDayData,
            actualSegundaDayData,
            dosisCompletasAdministradas,
            totalPopulation: Total,
            info
        }
    }
}