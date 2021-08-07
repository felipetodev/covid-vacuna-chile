import styles from '../styles/ProgressChart.module.css'
import { toDigit } from 'components/NumberDigits'

const locale = 'es'
const formatDigit = number => toDigit({ locale, number })

function Bold({ text }) {
    return <b style={{ color: '#001e63' }}>{text}</b>
}

export function DosisPorEdadTooltip({ active, payload, label }) {
    if (!active) return null

    const value = payload
    const newValue = value[0].payload

    return (
        <div className={styles.chartTooltip}>
            <p>
                Se han administrado <Bold text={formatDigit(newValue.dataPrimeras)} /> primeras dosis{' '},
                {' '}<Bold text={formatDigit(newValue.dataSegundas)} /> segundas dosis y{' '}
                <Bold text={formatDigit(newValue.dataUnicaDosis)} /> dosis unicas 
                en personas de <Bold text={`${label} años de edad`} />.
            </p>
        </div>
    )
}