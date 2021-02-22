const download = require('download')
const fs = require('fs-extra')
const transformCsvVaccineToJson = require('./transform-csv-vaccine-to-json')

const url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto76/fabricante.csv'

const date = new Date()
const year = date.getFullYear()
const day = `${date.getDate()}`.padStart(2, '0')
const month = `${date.getMonth() + 1}`.padStart(2, '0')

const filename = `trademark_${day}${month}${year}.csv`

download(url, 'public/data', { filename })
    .then(async () => {
        console.log(`${url} downloaded`)
        const json = await transformCsvVaccineToJson(filename)
        const jsonFileName = filename.replace('.csv', '.json')

        await fs.writeJson(`./public/data/${jsonFileName}`, json)
        await fs.copyFile(`./public/data/${jsonFileName}`, './public/data/trademark_latest.json')
    })
    .catch(err => {
        console.error(`${url} can't be downloaded. Error:`)
        console.log(err)
    })