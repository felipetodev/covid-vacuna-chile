import { Sector } from 'recharts'
import styles from '../styles/PieChartGraph.module.css'
import { toDigit } from 'components/NumberDigits'

const locale = 'es'
const formatDigit = number => toDigit({ locale, number })

function Bold({ text }) {
    return <b style={{ color: '#001e63' }}>{text}</b>
}

export function DosisPorSexoTooltip({ active, payload }) {
    if (!active) return null

    const value = payload[0].value
    const name = payload[0].name

    return (
        <div className={styles.chartTooltip}>
            <p>
                Corresponde a <Bold text={formatDigit(value)} />{'  '}
                dosis en <Bold text={name} />
            </p>
        </div>
    )
}

export const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            style={{ fontWeight: 'bold' }}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}


export const renderActiveShape = (props) => {
    const {
        cx,
        cy,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        percent,
    } = props

    return (
        <g>
            <text x={cx} y={cy} dy={5} textAnchor="middle" fill='#001e63' style={{ fontWeight: 'bold' }}>
                {`${(percent * 100).toFixed(2)}%`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={'#51B3E0'}
            />
        </g>
    )
}

export const customLabelTwo = ({ value }) => {
    return formatDigit(value)
}