// Import the Stripe library
import Stripe from 'stripe';

// Initialize a Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Check the request method
  if (req.method === 'POST') {
    try {
      // Create a new SetupIntent
      const setupIntent = await stripe.setupIntents.create();

      // Respond with the client_secret
      res.status(200).json({ clientSecret: setupIntent.client_secret });
    } catch (err) {
      // Handle errors
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
