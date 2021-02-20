import trademarkData from 'data/trademark_latest.json'

// console.log(trademarkData)

let jsonUNO = trademarkData.filter(element => element.Fabricante === 'Pfizer')
let jsonDOS = trademarkData.filter(element => element.Fabricante === 'Sinovac')