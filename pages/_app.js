import MainLayout from '../components/layouts/MainLayout'
import '../styles/globals.css'
//s
function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || (page => page)
	return getLayout(<Component {...pageProps} />)
}

export default MyApp
