const download = require('download')
const fs = require('fs-extra')
const transformCsvAgeRangeToJson = require('./transform-csv-agerange-to-json')

const url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto77/total_vacunados_region_edad.csv'

const filename = `age_range_vaccine.csv`

download(url, 'public/data', { filename })
    .then(async () => {
        console.log(`${url} downloaded`)
        const json = await transformCsvAgeRangeToJson(filename)
        const jsonFileName = filename.replace('.csv', '.json')

        await fs.writeJson(`./public/data/${jsonFileName}`, json)
    })
    .catch(err => {
        console.error(`${url} can't be downloaded. Error:`)
        console.log(err)
    })