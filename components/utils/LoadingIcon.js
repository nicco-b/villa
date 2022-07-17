import styles from '../../styles/LoadingIcon.module.css'
// import styled from 'styled-components'
// const Circle = styled.circle`
// 	display: block;
// 	fill: transparent;
// 	stroke: ${props => (props.stroke ? props.stroke : '#888888a9')};
// 	stroke-linecap: round;
// 	stroke-dasharray: 354;
// 	stroke-dashoffset: 354;
// 	stroke-width: 10px;
// 	animation: 2s ease-in-out infinite both circle-animation;
// 	/* transform-origin: 50% 50%; */
// `
const LoadingIcon = ({ stroke }) => {
	return (
		<div className={styles.uploadspinnerbox}>
			<svg id='spin' xmlns='http://www.w3.org/2000/svg'>
				<circle stroke={stroke} cx='10' cy='10' r='12' />
			</svg>
		</div>
	)
}
export default LoadingIcon
