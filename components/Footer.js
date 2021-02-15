import styles from 'styles/Footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <div>
        <a
          href='https://felipetodev.com'
          target='_blank'
          rel='noreferrer'
        >
          Adaptado por{' '}
          <span>@felipetodev</span>
        </a>
        <span>&bull;</span>
        <a href='https://github.com/felipetodev/covid-vacuna-chile' rel='nofollow noreferrer' target='_blank'>GitHub</a>
        <span>&bull;</span>
      </div>
    </footer>
  )
}