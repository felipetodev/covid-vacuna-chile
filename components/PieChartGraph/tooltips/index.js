import { Sector } from 'recharts'
import styles from '../styles/PieChartGraph.module.css'
import { toDigit } from 'components/NumberDigits'

const locale = 'es'
const formatDigit = number => toDigit({ locale, number })

export const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end"

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
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={'#51B3E0'}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#001e63"
            >{`Total: ${formatDigit(value)} 💉`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={20}
                textAnchor={textAnchor}
                fill="#001e63"
                style={{ fontWeight: 'bold' }}
            >
                {payload.name}
            </text>
        </g>
    )
}

export const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill="#001e63"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            style={{ fontWeight: 'bold' }}
        >
            {payload.name}: {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

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
                dosis en <Bold text={name === 'Hombre' ? 'Hombres' : 'Mujeres'} />
            </p>
        </div>
    )
}