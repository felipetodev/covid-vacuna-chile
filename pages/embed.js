import styles from 'styles/Embed.module.css'
import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage'
import TimeAgo from 'components/TimeAgo'

export default function Embed({ info, newData }) {
    const totals = newData.filter(element => element.Region === 'Total')
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
                                <NumberDigits>{totals[0].totalDosisAdministradas}</NumberDigits>
                            </p>
                        </div>
                        <p>
                            Supone el <strong><NumberPercentage>{totals[0].totalDosisAdministradas / totals[0].poblacionOver18}</NumberPercentage></strong> del total de Chile<br />
                            <strong><NumberPercentage>{totals[0].primerasDosisAdministradas / totals[0].totalDosisAdministradas}</NumberPercentage></strong> corresponde a primeras dosis<br />
                            <strong><NumberPercentage>{totals[0].segundasDosisAdministradas / totals[0].totalDosisAdministradas}</NumberPercentage></strong> corresponde a segundas dosis<br />
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
                                <NumberDigits>{totals[0].segundasDosisAdministradas}</NumberDigits>
                            </p>
                        </div>
                        <p>
                            Personas que han recibido las dos dosis de la vacuna.<br />
                            Suponen un <strong><NumberPercentage>{totals[0].segundasDosisAdministradas / totals[0].totalDosisAdministradas}</NumberPercentage></strong> de las dosis administradas.<br />Supone el <strong><NumberPercentage>{totals[0].segundasDosisAdministradas / totals[0].poblacionOver18}</NumberPercentage></strong> del total de Chile
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
        newData
    } = require('../public/data/test')
    const info = require('../data/info.json')

    return {
        props: {
            newData,
            info
        }
    }
}