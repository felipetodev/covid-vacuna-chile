import styles from 'styles/SelectRegion.module.css'

export default function SelectRegion({ onChange }) {
    // Arreglar este asco :P
    return (
        <section className={styles.sectionSelect}>
            <label htmlFor='date-select'>Regiones:</label>
            <div>
                <select defaultValue={0} onChange={(e) => onChange(e.target.value)} id='date-select' className={styles.select}>
                    <option value={0}>Totales</option>
                    <option value={2}>Desconocido</option>
                    <option value={4}>Santiago</option>
                    <option value={6}>Aysén</option>
                    <option value={8}>Antofagasta</option>
                    <option value={10}>Arica y Parinacota</option>
                    <option value={12}>Atacama</option>
                    <option value={14}>Coquimbo</option>
                    <option value={16}>Araucanía</option>
                    <option value={18}>Los Lagos</option>
                    <option value={20}>Los Ríos</option>
                    <option value={22}>Magallanes</option>
                    <option value={24}>Tarapacá</option>
                    <option value={26}>Valparaíso</option>
                    <option value={28}>Ñuble</option>
                    <option value={30}>Biobío</option>
                    <option value={32}>O’Higgins</option>
                    <option value={34}>Maule</option>
                </select>
            </div>
        </section>
    )
}