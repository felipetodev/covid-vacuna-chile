const XLSX = require('xlsx')

module.exports = async function transformCsvToJson (csvFileName) {
    const workbook = XLSX.readFile(`./data/${csvFileName}`)

    // Search another parser
    const { Sheets: { Sheet1 } } = workbook
    
    const json = XLSX.utils.sheet_to_json(Sheet1)

    return json
}