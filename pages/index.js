import { SWRConfig } from 'swr'
import MainLayout from '../components/layouts/MainLayout'
import { getProducts } from './api/products/products'
import { getScheduledSales } from './api/schedule'
import Home from './home'

export default function Index({ fallback }) {
	return (
		<SWRConfig
			value={{
				fallback,
				revalidate: false,
				revalidateOnFocus: false,
				fetcher: (...args) => fetch(...args).then(res => res.json()),
			}}>
			<Home />
		</SWRConfig>
	)
}

Index.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>
}
export async function getStaticProps() {
	const scheduled_sales = await getScheduledSales()
	//
	const products = await getProducts()
	const ss = JSON.parse(JSON.stringify(scheduled_sales))

	if (scheduled_sales.length > 0) {
		return {
			props: {
				fallback: {
					'/api/schedule': ss,
					'/api/products/products': products,
				},
			},
		}
	}

	return {
		props: {
			fallback: {
				'/api/products/products': products,
			},
		},
	}
}
