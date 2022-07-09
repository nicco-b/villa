import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { Product } from './product'
export const Products = ({ products }) => {
	const productList = products
	// console.log(productList)
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateRows: 'auto 1fr',
			}}>
			{/* <h3>products</h3> */}
			<div
				style={{
					padding: '0em 0em 2em 0em',

					gap: '1em',
					display: 'grid',
					// overflow: 'auto',
					gridTemplateRows: 'repeat(auto-fit, minmax(100px, 1fr))',
				}}>
				{productList?.map(product => (
					<Link href={`/product/${product.id}`}>
						<a>
							<div className={styles.product}>
								<Product key={product.id} product={product} />
								<div
									style={{
										height: '1px',
										backgroundColor: 'var(--border-color-alt)',
									}}></div>
							</div>
						</a>
					</Link>
				))}
			</div>
		</div>
	)
}
