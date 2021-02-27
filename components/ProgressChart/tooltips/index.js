import styles from '../styles/ProgressChart.module.css'

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
                Se han administrado <Bold text={newValue.dataPrimeras} /> primeras dosis{' '} y
                {' '}<Bold text={newValue.dataSegundas} /> segundas dosis
                en personas de <Bold text={label} /> años de edad
            </p>
        </div>
    )
}