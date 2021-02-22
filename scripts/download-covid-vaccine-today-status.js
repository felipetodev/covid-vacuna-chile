const download = require('download')
const fs = require('fs-extra')
const transformCsvToJson = require('./transform-csv-to-json')

const url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto76/vacunacion.csv'

const date = new Date()
const year = date.getFullYear()
const day = `${date.getDate()}`.padStart(2, '0')
const month = `${date.getMonth() + 1}`.padStart(2, '0')

const filename = `${day}${month}${year}.csv`

download(url, 'public/data', { filename })
    .then(async () => {
        console.log(`${url} downloaded`)
        const json = await transformCsvToJson(filename)
        const jsonFileName = filename.replace('.csv', '.json')

        await fs.writeJson(`./public/data/${jsonFileName}`, json)
        await fs.copyFile(`./public/data/${jsonFileName}`, './public/data/latest.json')
        await fs.writeJson('./public/data/info.json', { lastModified: +new Date() })
    })
    .catch(err => {
        console.error(`${url} can't be downloaded. Error:`)
        console.log(err)
    })