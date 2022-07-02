import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { Product } from './product'
export const Products = ({ products }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateRows: 'auto 1fr',
			}}>
			<h2>products</h2>
			<div
				style={{
					padding: '0em 0em 1em 0em',

					gap: '1em',
					display: 'grid',
					overflow: 'auto',
					gridTemplateRows: 'repeat(auto-fit, minmax(100px, 1fr))',
				}}>
				{products?.products.map(product => (
					<Link href={`/product/${product.id}`}>
						<a>
							<Product key={product.id} product={product} />
							<div
								style={{
									height: '1px',
									backgroundColor: '#ccc',
								}}></div>
						</a>
					</Link>
				))}
			</div>
		</div>
	)
}
