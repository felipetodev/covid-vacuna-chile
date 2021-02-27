const csvtojson = require('csvtojson');

module.exports = async function transformCsvAgeRangeToJson(csvFileName) {
    const json = await csvtojson().fromFile(`./public/data/${csvFileName}`)

    const newDataset = json.map(({ Region, Dosis, ...restOfData }) => {
        const header = Object.keys(restOfData)
        const data = Object.values(restOfData).map(el => el * 1)
    
        const chartData = []
    
        for (let i = 0; i < header.length; i++) {
            const newRow = {}
            newRow.name = header[i]
            newRow.data = data[i]
            newRow.region = Region
            newRow.dosis = Dosis
            chartData.push(newRow)
        }
    
        return chartData
    })

    return newDataset
}