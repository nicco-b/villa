import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { Product } from './product'
import Image from 'next/image'
export const Products = ({ products, isValidating }) => {
	return (
		<div
			style={
				{
					// display: 'grid',
					// gridTemplateRows: 'auto 1fr',
					// position: 'relative',
				}
			}>
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
						<Image src={'/red_loader.webp'} alt='loading' width={25} height={25} />
					</div>
				)}
				{products?.map((product, i) => (
					<>
						<div className={styles.product}>
							<Product key={product.id} product={product} isValidating={isValidating} />
							{/* if not last item */}
						</div>
						{products.length - 1 !== i && (
							<div
								style={{
									margin: ' 1em 0 0 0',
									height: '1px',
									backgroundColor: 'var(--border-color-alt)',
								}}></div>
						)}
					</>
				))}
			</div>
		</div>
	)
}
