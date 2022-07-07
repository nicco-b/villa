// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel='preload'
						href='https://assets.niccob.com/assets/fonts/Inter/Inter.var.woff2'
						as='font'
						crossOrigin=''
						type='font/woff2'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
