import { useEffect, useState } from 'react'
import moment from 'moment'
const useCountdown = targetDate => {
	const start = new Date(targetDate).getTime()
	const end = new Date().getTime()
	const [countDown, setCountDown] = useState(null)
	const [countdownFinished, setCountdownFinished] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => {
			setCountDown(start - end)
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [start, end])

	return [...getReturnValues(countDown, setCountdownFinished), countdownFinished]
}

const getReturnValues = (countDown, setCountdownFinished) => {
	// calculate time left
	useEffect(() => {
		if (countDown <= 0) {
			setCountdownFinished(true)
		} else {
			setCountdownFinished(false)
		}
	}, [countDown])
	if (countDown) {
		const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
		const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

		return [days, hours, minutes, seconds]
	}
	return [0, 0, 0, 0]
}

export { useCountdown }
