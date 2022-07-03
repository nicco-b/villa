import MainLayout from '../components/layouts/MainLayout'
import { mainContext, MainProvider } from '../context/mainContext'
import '../styles/globals.css'
//s
function Villa({ Component, pageProps }) {
	const getLayout = Component.getLayout || (page => page)
	return <MainProvider>{getLayout(<Component {...pageProps} />)}</MainProvider>
}

export default Villa
