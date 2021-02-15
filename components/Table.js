import { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { toDigit } from './NumberDigits'
import data from 'data/latest.json'
import styles from '../styles/Table.module.css'

export default function Table() {
    const locale = 'es'

    const tableData = useMemo(
        () => data.map(row => {
            // console.log(row)
            const reducer = (accumulator, currentValue) =>
            !isNaN(accumulator) ? parseInt(accumulator) + parseInt(currentValue) : 0
            const rowKeys = Object.values(row)
            console.log(row.Region, rowKeys.reduce(reducer, 0))

            const {
                Regiones,
                DosisEntregadasPorRegion,
                ...rest
            } = row

            const formatDigit = number => toDigit({ locale, number })

            return {
                Regiones: row.Region,
                DosisEntregadasPorRegion: formatDigit(rowKeys.reduce(reducer, 0)),
                ...rest
            }

        }), []
    )

    const columns = useMemo(
        () => [
            {
                Header: '',
                accessor: 'Regiones'
            },
            {
                Header: 'Dosis entregadas',
                accessor: 'DosisEntregadasPorRegion',
                format: 'digit'
            }
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data: tableData }, useSortBy)

    return (
        <table className={styles.table} {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                            >
                                {column.render('Header')}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' ▼'
                                            : ' ▲'
                                        : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}