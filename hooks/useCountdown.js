import { useEffect, useState } from 'react'
import moment from 'moment'
const useCountdown = targetDate => {
	var date = moment(targetDate).format()
	const start = new Date(date)
	const end = new Date().getTime()
	const [countDown, setCountDown] = useState(start - end)

	useEffect(() => {
		const interval = setInterval(() => {
			setCountDown(start - end)
		}, 1000)

		return () => clearInterval(interval)
	}, [start, end])

	return getReturnValues(countDown)
}

const getReturnValues = countDown => {
	// calculate time left
	const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
	const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

	return [days, hours, minutes, seconds]
}

export { useCountdown }
