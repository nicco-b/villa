import { SWRConfig } from 'swr'
import SecondaryLayout from '../../components/layouts/SecondaryLayout'

export default function Index({ fallback }) {
	return (
		<SWRConfig
			value={{
				fallback,
				revalidate: false,
				revalidateOnFocus: false,
				fetcher: (...args) => fetch(...args).then(res => res.json()),
			}}>
			<div>search</div>
		</SWRConfig>
	)
}

Index.getLayout = function getLayout(page) {
	return <SecondaryLayout>{page}</SecondaryLayout>
}
export async function getStaticProps() {
	return {
		props: {
			fallback: {},
		},
	}
}
