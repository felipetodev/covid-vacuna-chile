const csvtojson = require('csvtojson');

module.exports = async function transformCsvBySexToJson(csvFileName) {
    const json = await csvtojson().fromFile(`./public/data/${csvFileName}`)

    const dataHombre = json.filter(el => el.Sexo === 'Hombre')
    const dataMujer = json.filter(el => el.Sexo === 'Mujer')

    const dataHombrePrimeras = dataHombre[0]
    const dataHombreSegundas = dataHombre[1]
    const dataMujerPrimeras = dataMujer[0]
    const dataMujerSegundas = dataMujer[1]

    const objValuePrimerasHombre = Object.values(dataHombrePrimeras).map(el => el * 1)
    const objValueSegundasHombre = Object.values(dataHombreSegundas).map(el => el * 1)

    const objValuePrimerasMujer = Object.values(dataMujerPrimeras).map(el => el * 1)
    const objValueSegundasMujer = Object.values(dataMujerSegundas).map(el => el * 1)

    let totalPrimerasHombre = 0
    let totalSegundasHombre = 0
    let totalPrimerasMujer = 0
    let totalSegundasMujer = 0

    for (let i = 0; i < objValuePrimerasHombre.length || i < objValueSegundasHombre.length; i++) {
        !isNaN(objValuePrimerasHombre[i]) ? totalPrimerasHombre += objValuePrimerasHombre[i] : 0
        !isNaN(objValueSegundasHombre[i]) ? totalSegundasHombre += objValueSegundasHombre[i] : 0
    }

    for (let i = 0; i < objValuePrimerasMujer.length || i < objValueSegundasMujer.length; i++) {
        !isNaN(objValuePrimerasMujer[i]) ? totalPrimerasMujer += objValuePrimerasMujer[i] : 0
        !isNaN(objValueSegundasMujer[i]) ? totalSegundasMujer += objValueSegundasMujer[i] : 0
    }
    
    return {
        primerasDosisHombre: totalPrimerasHombre,
        segundasDosisHombre: totalSegundasHombre,
        totalDosisHombre: totalPrimerasHombre + totalSegundasHombre,
        primerasDosisMujer: totalPrimerasMujer,
        segundasDosisMujer: totalSegundasMujer,
        totalDosisMujer: totalPrimerasMujer + totalSegundasMujer
    }
}