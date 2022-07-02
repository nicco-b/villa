import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { SideBar } from '../sidebar'

export default function MainLayout({ children }) {
	return (
		<div className={styles.centered}>
			<div className={styles.twoColumn}>
				<>
					<div>
						<div
							style={{
								borderBottom: '1px solid black',
								height: '55px',
								fontSize: '20px',
								fontWeight: '600',
								display: 'flex',
								alignItems: 'center',
							}}>
							<div className={styles.totemBox}>
								<img src='/totem1.png' />
							</div>
							<div className={styles.totemBox}>
								<img src='/totem3.png' />
							</div>
							<div className={styles.totemBox}>
								<img src='/totem2.png' />
							</div>
							<div className={styles.totemBox}>
								<img src='/totem4.png' />
							</div>
							<div className={styles.totemBox}>
								<img src='/totem5.png' />
							</div>
							<div className={styles.totemBox}>
								<img src='/totem6.png' />
							</div>
						</div>
						{children}
					</div>
				</>
				<div>
					<SideBar />
				</div>
			</div>
		</div>
	)
}
