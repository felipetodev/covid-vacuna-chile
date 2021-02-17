import { porcentajePoblacionAdministradas, porcentajePoblacionCompletas } from 'public/data/logic'

const START_DATA_VACCINATION = '12/24/2020'
const MILISECONDS_DAY = 1000 * 60 * 60 * 24
const dateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const getDaysFromStartVaccination = () => {
    return (new Date().getTime() - new Date(START_DATA_VACCINATION).getTime()) / MILISECONDS_DAY
}

const getDaysToAchievePercentage = (percentageGoal, actualPercentage) => {
    return (
        (getDaysFromStartVaccination() * percentageGoal) / (actualPercentage * 100)
    )
}

const addDaysToInitialData = (days) => {
    const initialData = new Date(START_DATA_VACCINATION).getTime() + (days * MILISECONDS_DAY)
    return new Date(initialData)
}

const points = [{
    color: '#dd8f01',
    percentage: 50
}, {
    color: '#a3dd01',
    percentage: 75
}, {
    color: '#41ca0d',
    percentage: 100
}]

export default function Prevision() {
    const locale = 'es'
    const intl = new Intl.DateTimeFormat(locale, dateTimeFormatOptions)

    const getDays = (days) =>
        getDaysToAchievePercentage(
            days,
            porcentajePoblacionAdministradas - porcentajePoblacionCompletas
        )

    return (
        <>
            <h2>Estimación población vacunada</h2>
            {porcentajePoblacionCompletas
                ? (
                    <section>
                        {
                            points.map(({ color, percentage }) => (
                                <div className='card' key={percentage}>
                                    <span style={{ '--color': color }}>{percentage}%</span>
                                    <time>{intl.format(addDaysToInitialData(getDays(percentage)))}</time>
                                </div>
                            ))
                        }
                    </section>)
                : (
                    <p>
                        <b>No datos</b>
                    </p>
                )}


            <style jsx>{`
                section {
                align-items: center;
                display: flex;
                display: grid;
                gap: 32px;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                justify-content: center;
                place-content: center;
                margin-bottom: 4rem;
                max-width: 1000px;
                place-content: center;
                width: 100%;
                }

                div {
                display: flex;
                flex-direction: column;
                }

                div span, div time {
                background: #ffffff;
                }

                div time {
                color: #333;
                font-size: .9rem;
                font-weight: 500;
                margin-top: .7rem;
                }

                div span {
                color: var(--color);
                font-size: 5ch;
                font-weight: 500;
                }
                
                .card {
                background: #ffffff;
                border-radius: 8px;
                border: 2px solid #111;
                margin: 1rem 0 0;
                padding: 1rem 1.5rem 1.5rem;
                text-align: center;
                box-shadow: rgb(210, 239, 253) 14px 14px;
                }
                }
            `}
            </style>
        </>
    )
}