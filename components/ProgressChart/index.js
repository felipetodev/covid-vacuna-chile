import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { CustomXTick, CustomYTick } from './ticks'
import styles from './styles/ProgressChart.module.css'
import SelectRegion from 'components/SelectRegion'

export default function ProgressChart({ tooltip: CustomTooltip, data }) {
    const [region, setRegion] = useState(0)
    
    const chartDatasetPrimera = data[region]
    const chartDatasetSegunda = data[+region+1]
    
    const chartDatasetTotal = []
    
    for (let i = 0; i < chartDatasetPrimera.length || i < chartDatasetSegunda.length; i++) {
        const primeras = chartDatasetPrimera[i] || {};
        const segundas = chartDatasetSegunda[i] || {};
        chartDatasetTotal[i] = {
            age: primeras.name,
            region: primeras.region,
            dataPrimeras: primeras.data,
            dataSegundas: segundas.data
        }
    }

    if (!chartDatasetTotal) return null

    return (
        <div className={styles.chartContainer}>
            <div style={{ width: '100%', height: 450 }}>
                <SelectRegion onChange={setRegion}/>
                <ResponsiveContainer>
                    <AreaChart
                        data={chartDatasetTotal}
                        margin={{
                            top: 50,
                            right: 0,
                            left: 0,
                            bottom: 50
                        }}
                    >
                        <XAxis dataKey='age' tick={<CustomXTick />} />
                        <YAxis
                            domain={[0, 'dataMax']}
                            interval='preserveStartEnd'
                            width={100}
                            scale='linear'
                            tick={<CustomYTick />}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type='monotone'
                            dataKey='dataPrimeras'
                            stroke='#001e63'
                            fill='#d2effd'
                        />
                        <Area
                            type='monotone'
                            dataKey='dataSegundas'
                            stroke='#1757E2'
                            fill='#1757E2'
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}