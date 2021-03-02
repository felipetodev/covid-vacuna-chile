import { DefaultSeo } from 'next-seo'
import SEO from 'config/seo'
import 'styles/globals.css'
import useGoogleAnalytics from 'hooks/useGoogleAnalytics'

function MyApp({ Component, pageProps }) {
  useGoogleAnalytics()
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
