import moment from 'moment'
import { useCountdown } from '../../hooks/useCountdown'

export const CountdownTimer = ({ date, setCountdownFinished, sale }) => {
	const [days, hours, minutes, seconds] = useCountdown(new Date(date).getTime())
	if (days + hours + minutes + seconds <= 0) {
		return setCountdownFinished(true)
	} else {
		return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} sale={sale} />
	}
}
const DateTimeDisplay = ({ value, type, isDanger }) => {
	return (
		<div className={isDanger ? 'countdown danger' : 'countdown'}>
			<p
				style={{
					fontSize: '2rem',
					color: '#369662',
				}}>
				{value}
			</p>
		</div>
	)
}

export default DateTimeDisplay

const ShowCounter = ({ days, hours, minutes, seconds, sale }) => {
	return (
		<div
			style={{
				display: 'grid',
				justifyItems: 'center',
				justifyContent: 'center',
				gap: '1rem',
				color: '#369662',
				padding: '3em 0 0 0',
			}}>
			<div>{sale.callout}</div>
			<div
				className='show-counter'
				style={{
					display: 'flex',
					gap: '2px',
					border: '2px solid #369662',
					padding: '10px 1.5em',
					width: 'fit-content',
					borderRadius: '99999px',
				}}>
				<DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
				<p
					style={{
						color: '#369662',
						fontSize: '2rem',
					}}>
					:
				</p>
				<DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
				<p
					style={{
						color: '#369662',
						fontSize: '2rem',
					}}>
					:
				</p>
				<DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
				<p
					style={{
						color: '#369662',
						fontSize: '2rem',
					}}>
					:
				</p>
				<DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
			</div>
			<div>
				{new Date(sale.start_date).toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' })}
				{new Date(sale.start_date).toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' })}
				{new Date(sale.start_date).getTimezoneOffset() === 420 ? 'PDT' : 'PST'}
			</div>
		</div>
	)
}
