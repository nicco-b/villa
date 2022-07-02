import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { SideBar } from '../sidebar'
import { TopBar } from '../topbar'
import { useWindowSize } from '../../hooks/useWindowSize'
import { useEffect, useState } from 'react'

export default function MainLayout({ children }) {
	const size = useWindowSize()
	const [columns, setColumns] = useState(undefined)
	// detect window screen width function
	useEffect(() => {
		if (size.width > 680) {
			setColumns(2)
		} else {
			setColumns(1)
		}
	}, [size])

	return (
		<div className={styles.centered}>
			<div className={styles.sideSpacer}></div>
			<div className={styles.twoRow}>
				<>
					<TopBar />
					<div className={styles.twoColumn}>
						<div>{children}</div>
						<SideBar columns={columns} />
					</div>
				</>
			</div>
			<div className={styles.sideSpacer}></div>
		</div>
	)
}
