const csvtojson = require('csvtojson');

module.exports = async function transformCsvToJson(csvFileName) {
    const json = await csvtojson().fromFile(`./data/${csvFileName}`)

    return json
}