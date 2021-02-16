import data from './latest.json'

const total = data.filter(el => el.Region === 'Total')
const arica = data.filter(el => el.Region === 'Arica y Parinacota')
const tarapaca = data.filter(el => el.Region === 'Tarapacá')
const antofagasta = data.filter(el => el.Region === 'Antofagasta')
const atacama = data.filter(el => el.Region === 'Atacama')
const coquimbo = data.filter(el => el.Region === 'Coquimbo')
const valparaiso = data.filter(el => el.Region === 'Valparaíso')
const metropolitana = data.filter(el => el.Region === 'Metropolitana')
const ohiggins = data.filter(el => el.Region === 'O’Higgins')
const maule = data.filter(el => el.Region === 'Maule')
const nuble = data.filter(el => el.Region === 'Ñuble')
const biobio = data.filter(el => el.Region === 'Biobío')
const araucania = data.filter(el => el.Region === 'Araucanía')
const losrios = data.filter(el => el.Region === 'Los Ríos')
const loslagos = data.filter(el => el.Region === 'Los Lagos')
const aysen = data.filter(el => el.Region === 'Aysén')
const magallanes = data.filter(el => el.Region === 'Magallanes')

const datosArica = arica
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosTarapaca = tarapaca
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosAntofagasta = antofagasta
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosAtacama = atacama
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosCoquimbo = coquimbo
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosValparaiso = valparaiso
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosMetropolitana = metropolitana
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosOhiggins = ohiggins
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosMaule = maule
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosNuble = nuble
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosBiobio = biobio
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosAraucania = araucania
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosLosRios = losrios
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosLosLagos = loslagos
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosAysen = aysen
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const datosMagallanes = magallanes
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const Total = total
    .map(({ Region, Dosis, ...restOfDatos }) => restOfDatos)
    .reduce((acc, actualValue) => {
        const values = Object
            .values(actualValue)
            .map(n => +n)
            .reduce((acc, actual) => acc + actual, 0)
        return acc + values
    }, 0)

const newData = [
    {
        id: 1,
        region: 'Arica',
        totalDosisEntregadas: datosArica
    },
    {
        id: 2,
        region: 'Tarapaca',
        totalDosisEntregadas: datosTarapaca
    },
    {
        id: 3,
        region: 'Antofagasta',
        totalDosisEntregadas: datosAntofagasta
    },
    {
        id: 4,
        region: 'Atacama',
        totalDosisEntregadas: datosAtacama
    },
    {
        id: 5,
        region: 'Coquimbo',
        totalDosisEntregadas: datosCoquimbo
    },
    {
        id: 6,
        region: 'Valparaiso',
        totalDosisEntregadas: datosValparaiso
    },
    {
        id: 7,
        region: 'Metropolitana',
        totalDosisEntregadas: datosMetropolitana
    },
    {
        id: 8,
        region: 'Ohiggins',
        totalDosisEntregadas: datosOhiggins
    },
    {
        id: 9,
        region: 'Maule',
        totalDosisEntregadas: datosMaule
    },
    {
        id: 10,
        region: 'Ñuble',
        totalDosisEntregadas: datosNuble
    },
    {
        id: 11,
        region: 'Biobio',
        totalDosisEntregadas: datosBiobio
    },
    {
        id: 12,
        region: 'Araucania',
        totalDosisEntregadas: datosAraucania
    },
    {
        id: 13,
        region: 'Los Rios',
        totalDosisEntregadas: datosLosRios
    },
    {
        id: 14,
        region: 'Los Lagos',
        totalDosisEntregadas: datosLosLagos
    },
    {
        id: 15,
        region: 'Aysen',
        totalDosisEntregadas: datosAysen
    },
    {
        id: 16,
        region: 'Magallanes',
        totalDosisEntregadas: datosMagallanes
    },
    {
        id: 17,
        region: 'Total',
        totalDosisEntregadas: Total
    }
]