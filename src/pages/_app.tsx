import '../styles/main.scss'
import Layout from '../layout/Layout'

console.log('process.env', process.env)

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
