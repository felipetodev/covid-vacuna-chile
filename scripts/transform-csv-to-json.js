const csvtojson = require('csvtojson');
const { populationOver18 } = require('../public/data/bbdd.json')

module.exports = async function transformCsvToJson(csvFileName) {
    const json = await csvtojson().fromFile(`./public/data/${csvFileName}`)

    let jsonUNO = json.filter(element => element.Dosis === 'Primera')
    let jsonDOS = json.filter(element => element.Dosis === 'Segunda')
    let jsonUNICA = json.filter(element => element.Dosis === 'Unica')

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

    let datosUnicaDosis = jsonUNICA.map(element => {
        let keys = Object.entries(element)
        let lastKeys = keys[keys.length - 1]
        let keyValue = lastKeys[1]

        const {
            'Region': Region,
        } = element

        return {
            Region,
            unicaDosisAdministradas: +keyValue,
        }
    })

    const data = []

    for (let i = 0; i < datosPrimerasDosis.length || i < datosSegundasDosis.length || i < datosUnicaDosis.length; i++) {
        const primerasDosisAdministradas = datosPrimerasDosis[i] || {}
        const segundasDosisAdministradas = datosSegundasDosis[i] || {}
        const unicaDosisAdministradas = datosUnicaDosis[i] || {}
        data[i] = {
            ...primerasDosisAdministradas,
            ...segundasDosisAdministradas,
            ...unicaDosisAdministradas,
            totalDosisAdministradas: (primerasDosisAdministradas.primerasDosisAdministradas + segundasDosisAdministradas.segundasDosisAdministradas + unicaDosisAdministradas.unicaDosisAdministradas),
            porcentajePoblacionAdministradas: (primerasDosisAdministradas.primerasDosisAdministradas + segundasDosisAdministradas.segundasDosisAdministradas + unicaDosisAdministradas.unicaDosisAdministradas) / primerasDosisAdministradas.poblacionOver18,
            porcentajePoblacionCompletas: (segundasDosisAdministradas.segundasDosisAdministradas + unicaDosisAdministradas.unicaDosisAdministradas) / primerasDosisAdministradas.poblacionOver18
        }
    }

    return data
}