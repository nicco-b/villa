import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import SecondaryLayout from '../../components/layouts/SecondaryLayout'
import { getOrderStatus } from '../api/orders/status'

export default function Index({ fallback }) {
	const router = useRouter()
	const { order } = fallback
	return (
		<SWRConfig
			value={{
				fallback,
				revalidate: false,
				revalidateOnFocus: false,
				fetcher: (...args) => fetch(...args).then(res => res.json()),
			}}>
			<div
				onClick={() => {
					router.query.id = '62f7402fe0bd643dbd6bbb2f'
					router.query.email = 'niccobeats@icloud.com'

					router.push(router)
				}}>
				<div>order status</div>
				{order && <div>status: {order.status}</div>}
			</div>
		</SWRConfig>
	)
}

Index.getLayout = function getLayout(page) {
	return <SecondaryLayout>{page}</SecondaryLayout>
}
export async function getServerSideProps(context) {
	const { params, query } = context
	const orderWStatus = await getOrderStatus({
		id: query?.id,
		email: query?.email,
	})
	console.log(orderWStatus)
	return {
		props: {
			fallback: {
				order: JSON.parse(JSON.stringify(orderWStatus)),
			},
		},
	}
}
