import styles from 'styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <a href='https://felipetodev.com' rel='nofollow noreferrer' target='_blank'>Desarrollado por @felipetodev 🔺</a>
        <span>&bull;</span>
        <a href='https://github.com/felipetodev/covid-vacuna-chile' rel='nofollow noreferrer' target='_blank'>GitHub</a>
        <span>&bull;</span>
        <a href='https://github.com/felipetodev/covid-vacuna-chile/issues' rel='nofollow noreferrer' target='_blank'>Enviar sugerencia</a>
      </div>
    </footer>
  )
}