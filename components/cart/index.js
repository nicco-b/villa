export const Cart = () => {
	return (
		<div
			style={{
				border: '1px solid red',
			}}>
			<span>Cart</span>
			<div>items</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}>
				<span
					style={{
						textDecoration: 'underline',
					}}>
					clear all
				</span>
				<button>checkout</button>
			</div>
		</div>
	)
}
