const csvtojson = require('csvtojson');

module.exports = async function transformCsvBySexToJson(csvFileName) {
    const json = await csvtojson().fromFile(`./public/data/${csvFileName}`)

    const dataBySex = json.map(({ Dosis, Sexo, ...restOfData }) => {
        const countedKey = Object.keys(restOfData)

        let totalCount = 0

        countedKey.forEach(el => {
            totalCount += +restOfData[el]
        })

        return {
            Dosis,
            Sexo,
            [`total${Dosis}`]: totalCount
        }
    })

    const firstData = dataBySex.filter(el => el.Dosis === 'Primera')
    const secondData = dataBySex.filter(el => el.Dosis === 'Segunda')

    const totals = []

    for (let i = 0; i < firstData.length || i < secondData.length; i++) {
        const { totalPrimera } = firstData[i] || {}
        const secondDosis = secondData[i] || {}

        totals[i] = {
            Sexo: secondDosis.Sexo,
            [`totalPrimera${secondDosis.Sexo}`]: totalPrimera,
            [`totalSegunda${secondDosis.Sexo}`]: secondDosis.totalSegunda,
            [`totalDosis${secondDosis.Sexo}`]: totalPrimera + secondDosis.totalSegunda
        }
    }

    return totals
}