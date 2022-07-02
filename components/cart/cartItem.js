import styles from '../../styles/Home.module.css'

export const CartItem = ({ product }) => {
	return (
		<>
			{' '}
			<div
				style={{
					// border: '1px solid blue',
					display: 'grid',
					padding: '0.5em 0em',
					gap: '0em',
					gridTemplateColumns: 'auto 1fr',
					alignItems: 'center',
				}}>
				<div
					style={{
						// border: '1px solid blue',
						display: 'grid',
						maxHeight: '50px',
						maxWidth: '50px',
					}}>
					<div className={styles.productImg}>
						<img src={`/totem${product.id}.png`} />
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						// flexDirection: 'column',
						justifyContent: 'space-between',
						height: '100%',
						alignItems: 'center',
					}}>
					<div
						style={{
							display: 'flex',
							// flexDirection: 'column',
							width: '100%',
							gap: '0.2em',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '0em 1em',
						}}>
						<h4>{product.name}</h4>
						{/* <h5>{product.dimensions}</h5> */}
						<h5>{product.price}</h5>
					</div>

					<button>x</button>
				</div>
			</div>
		</>
	)
}
