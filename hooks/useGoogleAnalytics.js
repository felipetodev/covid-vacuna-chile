import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from 'services/gtag'

export default function useGoogleAnalytics() {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])
}