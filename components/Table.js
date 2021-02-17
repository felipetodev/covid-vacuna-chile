import { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { toDigit } from './NumberDigits'
import { dataDosisAdministradas } from 'public/data/logic'
import styles from '../styles/Table.module.css'

export default function Table() {
    const locale = 'es'

    const tableData = useMemo(
        () => dataDosisAdministradas.map(row => {
            const {
                Regiones,
                PrimeraDosisAdministrada,
                SegundaDosisAdministrada,
                ...rest
            } = row

            const formatDigit = number => toDigit({ locale, number })

            // console.log(parseInt('2808'))

            return {
                Regiones: row[3],
                PrimeraDosisAdministrada: formatDigit(row[2]),
                SegundaDosisAdministrada: formatDigit(row[1]),
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
                Header: 'Primeras Dosis Administradas',
                accessor: 'PrimeraDosisAdministrada',
                format: 'digit'
            },
            {
                Header: 'Segundas Dosis Administradas',
                accessor: 'SegundaDosisAdministrada',
                format: 'digit'
            }
        ],
        []
    )

    let {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data: tableData }, useSortBy)

    rows = [...rows.filter(row => row.id !== '0'), rows.find(row => row.id === '0')]

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
                    const className = row.id === '0'
                        ? styles.totales
                        : ''

                    return (
                        <tr {...row.getRowProps()} className={className}>
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