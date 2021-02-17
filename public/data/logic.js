import data from 'data/latest.json'
import trademarkData from 'data/trademark_latest.json'

/*** Index ****/

const population = 18730000
const totales = data

const totalDosisPais = totales.filter(total => total.Region === 'Total')
const totalPrimeraDosis = totalDosisPais[0]
const totalSegundaDosis = totalDosisPais[1]

// Ultimos datos de Primeras Dosis Distribuidas
const primeraDayKey = Object.entries(totalPrimeraDosis)
// Ultimos datos de Segundas Dosis Distribuidas
const segundaDayKey = Object.entries(totalSegundaDosis)


/* Datos por marca Vacuna */
const trademark = trademarkData
const totalDosisPfizer = trademark.filter(marca => marca.Fabricante === 'Pfizer')
const totalDosisSinovac = trademark.filter(marca => marca.Fabricante === 'Sinovac')

// Ultimos datos de Primeras Dosis Vacunas Pfizer
const pfizerPrimeraKey = Object.entries(totalDosisPfizer[0])
// Ultimos datos de Segunda Dosis Vacunas Pfizer
const pfizerSegundaKey = Object.entries(totalDosisPfizer[1])

// Ultimos datos de Primeras Dosis Vacunas Pfizer
const sinovacPrimeraKey = Object.entries(totalDosisSinovac[0])
// Ultimos datos de Segunda Dosis Vacunas Pfizer
const sinovacSegundaKey = Object.entries(totalDosisSinovac[1])


export const actualPrimeraDayData = parseInt(primeraDayKey[primeraDayKey.length - 1][1])
export const actualSegundaDayData = parseInt(segundaDayKey[segundaDayKey.length - 1][1])
export const dosisAdministradasTotal = actualPrimeraDayData + actualSegundaDayData
export const actualPfizerPrimeraDayData = parseInt(pfizerPrimeraKey[pfizerPrimeraKey.length - 1][1])
export const actualSinovacPrimeraDayData = parseInt(sinovacPrimeraKey[sinovacPrimeraKey.length - 1][1])
export const actualPfizerSegundaDayData = parseInt(pfizerSegundaKey[pfizerSegundaKey.length - 1][1])
export const actualSinovacSegundaDayData = parseInt(sinovacSegundaKey[sinovacSegundaKey.length - 1][1])
export const dosisCompletasAdministradas = parseInt(actualPfizerSegundaDayData + actualSinovacSegundaDayData)
export const porcentajePoblacionAdministradas = dosisAdministradasTotal / population
export const porcentajePoblacionCompletas = dosisCompletasAdministradas / population

/*** Tabla ***/

let mapRegion = data.map(data => data.Region)
let mapRegionNew = [...new Set(mapRegion)]

export const dataDosisAdministradas = mapRegionNew.map(el => {
    const filterData = data.filter(db => db.Region === el)
    // Total Primeras Dosis por Region
    const dataKeyPrimera = Object.entries(filterData[0])
    const dataPrimera = dataKeyPrimera[dataKeyPrimera.length - 1].concat(dataKeyPrimera[0][1])

    // Total Segundas Dosis por Region
    const dataKeySegunda = Object.entries(filterData[1])
    const dataTotal = dataKeySegunda[dataKeySegunda.length - 1].concat(dataKeyPrimera[dataKeyPrimera.length - 1][1]).concat(dataKeyPrimera[0][1])
    return dataTotal
})