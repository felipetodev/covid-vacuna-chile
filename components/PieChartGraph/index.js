import { useState, useRef, useCallback } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { renderActiveShape, renderCustomizedLabel } from './tooltips'
import styles from './styles/PieChartGraph.module.css'

export default function PieChartGraph({ data, tooltip: CustomTooltip }) {
    const [activeIndex, setActiveIndex] = useState(0)
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
        { name: 'Primeras Dosis Hombre', value: data.primerasDosisHombre },
        { name: 'Segundas Dosis Hombre', value: data.segundasDosisHombre },
        { name: 'Primeras Dosis Mujer', value: data.primerasDosisMujer },
        { name: 'Segundas Dosis Mujer', value: data.segundasDosisMujer }
    ]

    const COLORS = ['#6795ec', '#51B3E0'];

    return (
        <div ref={elementRef}>
            {isVisible && (
                <div className={styles.gridContainer}>
                    <ResponsiveContainer width="100%" height="95%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                outerRadius={"60%"}
                                labelLine={false}
                                data={data01}
                                label={renderCustomizedLabel}
                            >
                                {data01.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height="95%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                innerRadius={"38%"}
                                outerRadius={"60%"}
                                startAngle={180}
                                endAngle={-360}
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={data02}
                                paddingAngle={1}
                                fill="#6795ec"
                                onMouseEnter={onPieEnter}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}