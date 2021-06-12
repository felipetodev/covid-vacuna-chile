const csvtojson = require('csvtojson');

module.exports = async function transformCsvVaccineToJson(csvFileName) {
    const json = await csvtojson().fromFile(`./public/data/${csvFileName}`)

    let jsonPfizer = json.filter(element => element.Fabricante === 'Pfizer')
    let jsonSinovac = json.filter(element => element.Fabricante === 'Sinovac')
    let jsonAstraZeneca = json.filter(element => element.Fabricante === 'Astra-Zeneca')
    let jsonCansino = json.filter(element => element.Fabricante.toLowerCase() === 'cansino')

    const pfizerPrimera = jsonPfizer[0]
    const pfizerPrimeraKey = Object.keys(pfizerPrimera)[Object.keys(pfizerPrimera).length - 1]
    const pfizerPrimeraValue = Object.values(pfizerPrimera)[Object.values(pfizerPrimera).length - 1]

    const pfizerSegunda = jsonPfizer[1]
    const pfizerSegundaKey = Object.keys(pfizerSegunda)[Object.keys(pfizerSegunda).length - 1]
    const pfizerSegundaValue = Object.values(pfizerSegunda)[Object.values(pfizerSegunda).length - 1]

    const sinovacPrimera = jsonSinovac[0]
    const sinovacPrimeraKey = Object.keys(sinovacPrimera)[Object.keys(sinovacPrimera).length - 1]
    const sinovacPrimeraValue = Object.values(sinovacPrimera)[Object.values(sinovacPrimera).length - 1]

    const sinovacSegunda = jsonSinovac[1]
    const sinovacSegundaKey = Object.keys(sinovacSegunda)[Object.keys(sinovacSegunda).length - 1]
    const sinovacSegundaValue = Object.values(sinovacSegunda)[Object.values(sinovacSegunda).length - 1]
    
    const astraZenecaPrimera = jsonAstraZeneca[0]
    const astraZenecaPrimeraKey = Object.keys(astraZenecaPrimera)[Object.keys(astraZenecaPrimera).length - 1]
    const astraZenecaPrimeraValue = Object.values(astraZenecaPrimera)[Object.values(astraZenecaPrimera).length - 1]

    const astraZenecaSegunda = jsonAstraZeneca[1]
    const astraZenecaSegundaKey = Object.keys(astraZenecaSegunda)[Object.keys(astraZenecaSegunda).length - 1]
    const astraZenecaSegundaValue = Object.values(astraZenecaSegunda)[Object.values(astraZenecaSegunda).length - 1]

    const cansinoPrimera = jsonCansino[0]
    const cansinoPrimeraKey = Object.keys(cansinoPrimera)[Object.keys(cansinoPrimera).length - 1]
    const cansinoPrimeraValue = Object.values(cansinoPrimera)[Object.values(cansinoPrimera).length - 1]

    const cansinoSegunda = jsonCansino[1]
    const cansinoSegundaKey = Object.keys(cansinoSegunda)[Object.keys(cansinoSegunda).length - 1]
    const cansinoSegundaValue = Object.values(cansinoSegunda)[Object.values(cansinoSegunda).length - 1]


    return vaccineData = [
        {
            UltRegistroPrimerasDosisPfizer: pfizerPrimeraKey,
            primerasDosisPfizer: +pfizerPrimeraValue,
            UltRegistroSegundasDosisPfizer: pfizerSegundaKey,
            segundasDosisPfizer: +pfizerSegundaValue,
            totalDosisDistribuidasPfizer: +pfizerPrimeraValue + +pfizerSegundaValue
        },
        {
            UltRegistroPrimerasDosisSinovac: sinovacPrimeraKey,
            primerasDosisSinovac: +sinovacPrimeraValue,
            UltRegistroSegundasDosisSinovac: sinovacSegundaKey,
            segundasDosisSinovac: +sinovacSegundaValue,
            totalDosisDistribuidasSinovac: +sinovacPrimeraValue + +sinovacSegundaValue
        },
        {
            UltRegistroPrimerasDosisAstraZeneca: astraZenecaPrimeraKey,
            primerasDosisAstraZeneca: +astraZenecaPrimeraValue,
            UltRegistroSegundasDosisAstraZeneca: astraZenecaSegundaKey,
            segundasDosisAstraZeneca: +astraZenecaSegundaValue,
            totalDosisDistribuidasAstraZeneca: +astraZenecaPrimeraValue + +astraZenecaSegundaValue
        },
        {
            UltRegistroPrimerasDosisCansino: cansinoPrimeraKey,
            primerasDosisCansino: +cansinoPrimeraValue,
            UltRegistroSegundasDosisCansino: cansinoSegundaKey,
            segundasDosisCansino: +cansinoSegundaValue,
            totalDosisDistribuidasCansino: +cansinoPrimeraValue + +cansinoSegundaValue
        }
    ]
}