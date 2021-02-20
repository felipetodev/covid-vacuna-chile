import data from 'data/latest.json'
import { populationOver18 } from 'public/data/bbdd.json'

let jsonUNO = data.filter(element => element.Dosis === 'Primera')
let jsonDOS = data.filter(element => element.Dosis === 'Segunda')

const datosPrimerasDosis = jsonUNO.map(element => {
    let keys = Object.entries(element)
    let lastKeys = keys[keys.length - 1]
    let keyDate = lastKeys[0]
    let keyValue = lastKeys[1]

    const {
        'Region': Region,
    } = element
    
    const populationRegion = populationOver18[Region]

    return {
        Region,
        primerasDosisAdministradas: +keyValue,
        fechaUltRegistro: keyDate,
        poblacionOver18: populationRegion
    }
})

let datosSegundasDosis = jsonDOS.map(element => {
    let keys = Object.entries(element)
    let lastKeys = keys[keys.length - 1]
    // let keyDate = lastKeys[0]
    let keyValue = lastKeys[1]

    const {
        'Region': Region,
    } = element

    return {
        Region,
        segundasDosisAdministradas: +keyValue,
    }
})

export const newData = []

for (let i = 0; i < datosPrimerasDosis.length || i < datosSegundasDosis.length; i++) {
    const primerasDosisAdministradas = datosPrimerasDosis[i] || {}
    const segundasDosisAdministradas = datosSegundasDosis[i] || {}
    newData[i] = {
        ...primerasDosisAdministradas,
        ...segundasDosisAdministradas,
        totalDosisAdministradas: primerasDosisAdministradas.primerasDosisAdministradas + segundasDosisAdministradas.segundasDosisAdministradas,
        porcentajePoblacionAdministradas: (primerasDosisAdministradas.primerasDosisAdministradas + segundasDosisAdministradas.segundasDosisAdministradas) / primerasDosisAdministradas.poblacionOver18,
        porcentajePoblacionCompletas: segundasDosisAdministradas.segundasDosisAdministradas / primerasDosisAdministradas.poblacionOver18
    }
}