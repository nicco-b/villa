import MainLayout from '../components/layouts/MainLayout'
import { mainContext, MainProvider } from '../context/mainContext'
import { CartProvider } from 'use-shopping-cart'
import * as config from '../config'
import '../styles/globals.css'
import { ShoppingCartProvider } from '../context/ShoppingCartContext'
//s
function Villa({ Component, pageProps }) {
	const getLayout = Component.getLayout || (page => page)
	return (
		<MainProvider>
			<ShoppingCartProvider>{getLayout(<Component {...pageProps} />)}</ShoppingCartProvider>
		</MainProvider>
	)
}

export default Villa
