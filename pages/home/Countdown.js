import moment, { min } from 'moment'
import { tz } from 'moment-timezone'
import { useEffect } from 'react'
import { useCountdown } from '../../hooks/useCountdown'

export const CountdownTimer = ({ date, setCountdownFinished, sale }) => {
	const [days, hours, minutes, seconds, countdownFinished] = useCountdown(date)
	useEffect(() => {
		if (countdownFinished) {
			setCountdownFinished(true)
		} else {
			setCountdownFinished(false)
		}
	}, [countdownFinished])
	if (days + hours + minutes + seconds <= 0) {
		return
	} else {
		return (
			<ShowCounter
				key={sale._id}
				days={days}
				hours={hours}
				minutes={minutes}
				seconds={seconds}
				sale={sale}
				countdownFinished={countdownFinished}
			/>
		)
	}
}
const DateTimeDisplay = ({ value, type, isDanger, color }) => {
	return (
		<div className={isDanger ? 'countdown danger' : 'countdown'}>
			<p
				style={{
					fontSize: '2rem',
					color: color,
				}}>
				{value?.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
			</p>
		</div>
	)
}

export default DateTimeDisplay

const ShowCounter = ({ days, hours, minutes, seconds, sale }) => {
	// var abbrs = {
	// 	EST: 'Eastern Standard Time',
	// 	EDT: 'Eastern Daylight Time',
	// 	CST: 'Central Standard Time',
	// 	CDT: 'Central Daylight Time',
	// 	MST: 'Mountain Standard Time',
	// 	MDT: 'Mountain Daylight Time',
	// 	PST: 'Pacific Standard Time',
	// 	PDT: 'Pacific Daylight Time',
	// }

	// moment.fn.zoneName = function () {
	// 	var abbr = this.zoneAbbr()
	// 	return abbrs[abbr] || abbr
	// }
	const mDate = moment(sale.start_date)

	return (
		<div
			style={{
				display: 'grid',
				justifyItems: 'center',
				justifyContent: 'center',
				gap: '0.5rem',
				color: '#369662',
				padding: '3em 0 0 0',
				userSelect: 'none',
			}}>
			<div
				style={{
					fontSize: '1.23rem',
					fontWeight: '600',
					color: '#369662',
				}}>
				{sale.callout}
			</div>
			<div
				style={{
					fontSize: '1.1rem',
					fontWeight: '450',
					color: '#36966290',
					padding: '0em 0 1em 0',
				}}>
				{/* {new Date(sale.start_date).toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' })} */}
				{/* {new Date(sale.start_date).toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' })} */}
				{/* {new Date(sale.start_date).getTimezoneOffset() === 420 ? 'PDT' : 'PST'} */}
				{mDate.tz('America/Los_Angeles').format('LLL')}{' '}
				<span
					style={{
						fontSize: '1.1rem',
						fontWeight: '600',
						color: '#36966290',
					}}>
					{mDate.tz('America/Los_Angeles').format('z')}
				</span>
			</div>
			<div
				className='show-counter'
				style={{
					display: 'flex',
					gap: '2px',
					border: '2px solid #36966230',
					padding: '10px 1.5em',
					width: '250px',
					borderRadius: '99999px',
				}}>
				<div
					style={{
						display: 'flex',
						gap: '2px',
						width: '250px',
					}}>
					<DateTimeDisplay
						color={days === 0 ? '#36966280' : '#369662'}
						value={days}
						type={'Days'}
						isDanger={days <= 3}
					/>
					<p
						style={{
							color: days === 0 ? '#36966280' : '#369662',

							fontSize: '2rem',
						}}>
						:
					</p>
					<DateTimeDisplay
						color={hours === 0 ? '#36966280' : '#369662'}
						value={hours}
						type={'Hours'}
						isDanger={false}
					/>
					<p
						style={{
							color: hours === 0 ? '#36966280' : '#369662',

							fontSize: '2rem',
						}}>
						:
					</p>
					<DateTimeDisplay
						color={hours === 0 && minutes === 0 ? '#36966280' : '#369662'}
						value={minutes}
						type={'Mins'}
						isDanger={false}
					/>
					<p
						style={{
							color: minutes === 0 ? '#36966280' : '#369662',

							fontSize: '2rem',
						}}>
						:
					</p>
					<DateTimeDisplay
						color={minutes === 0 && seconds === 0 ? '#36966280' : '#369662'}
						value={seconds}
						type={'Seconds'}
						isDanger={false}
					/>
				</div>
			</div>
		</div>
	)
}
