const download = require('download')
const fs = require('fs-extra')
const transformCsvBySexToJson = require('./transform-csv-bysex-to-json')

const url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto78/total_vacunados_sexo_edad.csv'

const filename = `by_sex_vaccine.csv`

download(url, 'public/data', { filename })
    .then(async () => {
        console.log(`${url} downloaded`)
        const json = await transformCsvBySexToJson(filename)
        const jsonFileName = filename.replace('.csv', '.json')

        await fs.writeJson(`./public/data/${jsonFileName}`, json)
    })
    .catch(err => {
        console.error(`${url} can't be downloaded. Error:`)
        console.log(err)
    })