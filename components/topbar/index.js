import Image from 'next/image'
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
						<Image src='/totem1.png' alt='totem1' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totem3.png' alt='totem2' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totem2.png' alt='totem3' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totem4.png' alt='totem4' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totem5.png' alt='totem5' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totem6.png' alt='totem6' height={40} width={40} />
					</div>
				</div>
				<Link href='/'>
					<a href='/'>
						<LogoHoverSwap />
					</a>
				</Link>
			</div>
		</>
	)
}

const LogoHoverSwap = ({ children }) => {
	return (
		<>
			<div className={'logoHoverSwap'}>
				<div className={'still'}>
					<Image src='/lun.png' alt='logo' width={90} height={40} />
				</div>
				<div className={'moving'}>
					<img src='/logoAnimated.gif' alt='logo' width={90} height={40} />
				</div>
			</div>
		</>
	)
}
