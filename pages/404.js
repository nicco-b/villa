import Link from 'next/link'
import MainLayout from '../components/layouts/MainLayout'
import styles from '../styles/Home.module.css'
export default function Index({ fallback }) {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.main}>
					<div
						style={{
							height: '100%',
							display: 'grid',
							padding: '1em',
						}}>
						<img src='/crying_man.gif' alt='404' className={styles.responsive} />
						<div
							style={{
								display: 'grid',
								justifyContent: 'center',
								justifyItems: 'center',
								padding: '1em 0',
								gap: '1em',
							}}>
							page not found
							<Link href={'/'}>
								<button
									style={{
										width: 'fit-content',
									}}>
									go home
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

Index.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>
}
