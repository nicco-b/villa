import styles from '../../styles/Home.module.css'
import { SideBar } from '../sidebar'
import { TopBar } from '../topbar'
import { useWindowSize } from '../../hooks/useWindowSize'
import { useLayoutEffect, useEffect, useState } from 'react'
import { useMain } from '../../context/mainContext'
export default function MainLayout({ children, animate }) {
	const { cartTotal } = useMain()
	const size = useWindowSize()
	const [columns, setColumns] = useState(undefined)
	// detect window screen width function
	const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
	useIsomorphicLayoutEffect(() => {
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
					<TopBar animate={animate} />
					<div className={styles.twoColumn}>
						<div style={{ width: '100%' }}>{children}</div>
						<SideBar columns={columns} />
					</div>
				</>
			</div>
			<div className={styles.sideSpacer}></div>
		</div>
	)
}
