import { useState, useRef, useCallback } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { renderActiveShape, renderCustomizedLabel, customLabelTwo } from './tooltips'
import styles from './styles/PieChartGraph.module.css'

export default function PieChartGraph({ data, tooltip: CustomTooltip }) {
    const [activeIndex, setActiveIndex] = useState(null)
    const elementRef = useRef(null)
    const onPieEnter = useCallback((_, index) => {
        setActiveIndex(index);
    }, [setActiveIndex]);

    const [isVisible] = useIntersectionObserver({
        elementRef,
        freezeOnceVisible: true
    })

    const data01 = [
        { name: 'Hombre', value: data.totalDosisHombre },
        { name: 'Mujer', value: data.totalDosisMujer },
    ]

    const data02 = [
        { name: 'primeras vacunas Hombre', value: data.primerasDosisHombre },
        { name: 'segundas vacunas Hombre', value: data.segundasDosisHombre },
        { name: 'primeras vacunas Mujer', value: data.primerasDosisMujer },
        { name: 'segundas vacunas Mujer', value: data.segundasDosisMujer }
    ]

    const COLORS = ['#6795ec', '#8b6db6', '#5c9edb', '#7387ce'];

    return (
        <div ref={elementRef}>
            {isVisible && (
                <div className={styles.gridContainer}>
                    <ResponsiveContainer width="100%" height="95%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                outerRadius={"65%"}
                                labelLine={false}
                                data={data01}
                                label={renderCustomizedLabel}
                            >
                                {data01.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend verticalAlign="bottom" height={36} />
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height="95%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                innerRadius={"38%"}
                                outerRadius={"65%"}
                                data={data02}
                                cx="50%"
                                cy="50%"
                                fill="#8884d8"
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                onMouseEnter={onPieEnter}
                                label={customLabelTwo}
                            >
                                {data02.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}