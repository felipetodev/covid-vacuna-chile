import { useState } from 'react'
import { toPercentage } from 'components/NumberPercentage'
import styles from '../styles/Progress.module.css'
import { dosisAdministradasTotal, dosisCompletasAdministradas } from 'public/data/logic'

const population = 18730000

const FILTERS = {
    parcial: dosisAdministradasTotal,
    completa: dosisCompletasAdministradas
}

export default function Progress() {
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
                    <label>
                        <input
                            checked={filter === FILTERS.completa}
                            name='filter'
                            onChange={() => setFilter(FILTERS.completa)}
                            type='radio'
                        />
                Ver población con pauta completa
          </label>
                </div>

                <section data-value={toPercentage({ locale, number: filter / population })}>
                    <progress max='100' value={(filter / population) * 100} />
                </section>
            </form>
        </>
    )

}