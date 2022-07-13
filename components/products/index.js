import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { Product } from './product'
import Image from 'next/image'
export const Products = ({ products, isValidating }) => {
	const productList = products
	// console.log(productList)
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateRows: 'auto 1fr',
				position: 'relative',
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
				{isValidating && (
					<div
						style={{
							position: 'absolute',
							display: 'flex',
							height: '25px',
							width: '100%',
							justifyContent: 'end',
							// zIndex: '-1',
							// backgroundColor: '#f5f5f5',
						}}>
						<Image src={'/redloader.gif'} alt='loading' width={25} height={25} />
					</div>
				)}
				{productList?.map(product => (
					<Link href={`/product/${product.id}`} key={product._id}>
						<a>
							<div className={styles.product}>
								<Product key={product.id} product={product} isValidating={isValidating} />
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
