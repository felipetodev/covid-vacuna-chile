import { useState } from 'react'
import { toPercentage } from 'components/NumberPercentage'
import styles from '../styles/Progress.module.css'
import { newData } from 'public/data/test'

const { porcentajePoblacionAdministradas, porcentajePoblacionCompletas } = newData[0]

const FILTERS = {
    parcial: (porcentajePoblacionAdministradas - porcentajePoblacionCompletas),
    completa: porcentajePoblacionCompletas
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

                <section data-value={toPercentage({ locale, number: filter })} title='Población corresponde a la estimación de la población de 18 años y más, según Proyección año 2021 basada en el Censo 2017, INE'>
                    <progress max='100' value={filter * 100} />
                </section>
            </form>
        </>
    )

}