import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export const TopBar = ({ children }) => {
	return (
		<>
			<div className={styles.topBar}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						maxWidth: '200px',
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
				<div>
					<Link href='/'>
						<a href='/'>
							<img src='/lun.png' alt='logo' width={90} height={40} />
						</a>
					</Link>
				</div>
			</div>
		</>
	)
}
