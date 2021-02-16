import { useState } from 'react'
import { toPercentage } from 'components/NumberPercentage'
import styles from '../styles/Progress.module.css'

const population = 18730000

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

                <section data-value={toPercentage({ locale, number: value/population })}>
                    <progress max='100' value={(value/population) * 100} />
                </section>
            </form>
        </>
    )

}