import { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { toDigit } from './NumberDigits'
import { toPercentage } from './NumberPercentage'
import { newData } from 'public/data/test'
import styles from '../styles/Table.module.css'

export default function Table() {
    const locale = 'es'
    const formatDigit = number => toDigit({ locale, number })
    const formatPercentage = number => toPercentage({ locale, number })

    const tableData = useMemo(
        () => newData.map(row => {
            const {
                Region,
                primerasDosisAdministradas,
                segundasDosisAdministradas,
                porcentajePoblacionAdministradas,
                porcentajePoblacionCompletas,
                ...rest
            } = row

            return {
                Regiones: Region,
                dosisAdministradas: formatDigit(primerasDosisAdministradas + segundasDosisAdministradas),
                segundasDosisAdministradas: formatDigit(segundasDosisAdministradas),
                porcentajePoblacionAdministradas: formatPercentage(porcentajePoblacionAdministradas - porcentajePoblacionCompletas),
                porcentajePoblacionCompletas: formatPercentage(porcentajePoblacionCompletas),
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
                Header: 'Dosis Administradas',
                accessor: 'dosisAdministradas',
                format: formatDigit
            },
            {
                Header: '% Poblacion Vacunada',
                accessor: 'porcentajePoblacionAdministradas',
                format: formatPercentage
            },
            {
                Header: 'Pauta Completa',
                accessor: 'segundasDosisAdministradas',
                format: formatDigit
            },
            {
                Header: '% Poblacion Totalmente Vacunada',
                accessor: 'porcentajePoblacionCompletas',
                format: formatPercentage
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
                            <td className={styles.mobileData}>
                                {row.cells.map((cell, index) => {
                                    return (
                                        <span key={index}>
                                            {index === 0
                                                ? ''
                                                : `${headerGroups[0].headers[index].Header} - ${cell.value}`}
                                        </span>
                                    )
                                })}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}