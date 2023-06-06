import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(400);
    const { subscriptionId } = req.body;
    if (!subscriptionId) {
      return res.status(400).json({ message: 'Missing subscription ID' });
    }
    // Cancel the subscription
    const canceledSubscription = await stripe.subscriptions.del(subscriptionId);
    res.json({
      message: 'Subscription successfully canceled',
      canceledSubscription,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
