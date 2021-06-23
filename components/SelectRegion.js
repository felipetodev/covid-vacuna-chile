import styles from 'styles/SelectRegion.module.css'

export default function SelectRegion({ data, onChange }) {
    const getAllRegion = data.map(el => el[0].region)
    const getUniqueRegion = [...new Set(getAllRegion)]

    return (
        <section className={styles.sectionSelect}>
            <label htmlFor='date-select'>Regiones:</label>
            <div>
                <select defaultValue={0} onChange={(e) => onChange(e.target.value)} id='date-select' className={styles.select}>
                    {getUniqueRegion.map((region, idx) => {
                        return (
                            <option key={region} value={idx * 3}>{region}</option>
                        )
                    })}
                </select>
            </div>
        </section>
    )
}
