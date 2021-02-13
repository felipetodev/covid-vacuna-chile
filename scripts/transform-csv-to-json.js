const XLSX = require('xlsx')
const fs = require('fs-extra')

const workbook = XLSX.readFile('./data/vacunacion.csv')

// Search another parser

const { Sheets: { Sheet1 } } = workbook

const json = XLSX.utils.sheet_to_json(Sheet1)

;(async () => {
    await fs.writeJson('./data/vacunacionchile.json', json)
    await fs.writeJson('./data/latest.json', json)
})()