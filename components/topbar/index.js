import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export const TopBar = ({ animate }) => {
	return (
		<>
			<div className={styles.topBar}>
				<Link href='/'>
					<a href='/'>
						<LogoHoverSwap animate={animate} />
					</a>
				</Link>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
					}}>
					<div className={styles.totemBox}>
						<Image src='/totems/totem3.png' alt='totem2' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totems/totem2.png' alt='totem3' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totems/totem4.png' alt='totem4' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totems/totem5.png' alt='totem5' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totems/totem6.png' alt='totem6' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totems/fishtotem.png' alt='totem6' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totems/firetotem.png' alt='totem6' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totems/housetotem.png' alt='totem6' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totems/boottotem.png' alt='totem6' height={40} width={40} />
					</div>
					<div className={styles.totemBox}>
						<Image src='/totems/cloudtotem.png' alt='totem6' height={40} width={40} />
					</div>
					<div
						className={styles.totemBox}
						style={{
							cursor: 'pointer',
							padding: '0 0 0 10px',
						}}>
						<Link href='https://duairakp.com'>
							<Image src='/portfolio_favicon.ico' alt='totem2' height={29} width={29} />
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

const LogoHoverSwap = ({ animate }) => {
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
