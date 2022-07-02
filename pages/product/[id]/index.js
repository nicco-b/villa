import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '../../../components/layouts/MainLayout'
import styles from '../../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { Product } from '../../../components/products/product'
export default function SingleProduct({ product }) {
	return (
		<div>
			<button>
				<Link href={`/`}>back</Link>
			</button>
			<Product product={product} />
		</div>
	)
}

SingleProduct.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>
}
export async function getServerSideProps(context) {
	// Fetch data from external API
	const id = context.params.id
	console.log(id)
	const res = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/${id}`)

	const product = await res.json()

	// Pass data to the page via props
	return { props: { product } }
}
