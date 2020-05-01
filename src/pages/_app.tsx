import '../styles/main.scss'
import Layout from '../layout/Layout'

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
