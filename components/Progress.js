import { useState } from 'react'
import { toPercentage } from 'components/NumberPercentage'
import population from 'public/data/bbdd.json'
import styles from '../styles/Progress.module.css'

const { Total } = population.population

const FILTERS = {
    parcial: 'porcentajePoblacionAdministradas',
    completa: 'porcentajePoblacionCompletas'
}

export default function Progress({ value }) {
    const locale = 'es'
    const [filter, setFilter] = useState(FILTERS.parcial)

    return (
        <>
            <form className={styles.progress}>
                <div>
                    <label>
                        <input
                            checked={filter === FILTERS.parcial}
                            onChange={() => setFilter(FILTERS.parcial)}
                            type='radio'
                            name='filter'
                        />
                Ver población vacunada
              </label>
                </div>

                <section data-value={toPercentage({ locale, number: value / Total })}>
                    <progress max='100' value={value / Total} />
                </section>
            </form>
        </>
    )

}