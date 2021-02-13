export default function NumberPercentage({ children }) {
    const locale = 'es'
    return new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 2 }).format(children)
}