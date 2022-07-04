import MainLayout from '../components/layouts/MainLayout'
import { mainContext, MainProvider } from '../context/mainContext'
import { CartProvider } from 'use-shopping-cart'
import * as config from '../config'
import '../styles/globals.css'
//s
function Villa({ Component, pageProps }) {
	const getLayout = Component.getLayout || (page => page)
	return (
		<CartProvider
			cartMode='checkout-session'
			stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
			currency={config.CURRENCY}>
			<MainProvider>{getLayout(<Component {...pageProps} />)}</MainProvider>
		</CartProvider>
	)
}

export default Villa
