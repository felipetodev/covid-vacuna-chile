export default function NumberDigits({ children }) {
    const locale = 'es'
    return new Intl.NumberFormat(locale).format(children)
}