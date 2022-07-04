/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { Stripe, loadStripe } from '@stripe/stripe-js'

const getStripe = () => {
	let stripePromise = null
	if (!stripePromise) {
		stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
	}
	return stripePromise
}

export default getStripe
