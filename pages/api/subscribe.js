// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = 'whsec_d02cd36108ef9719aed8d1b48d1b53794fdf33d649c2675ebb83c76963523291';

export default async function handler(req, res) {
  try {
    if (req.method != 'POST') return res.status(400);
    const { name, email, paymentMethod, auth0_user_id } = req.body;
    console.log('payment method=====', auth0_user_id);
    // Create a customer
    const customer = await stripe.customers.create({
      email,
      name,
      payment_method: paymentMethod,
      invoice_settings: { default_payment_method: paymentMethod },
      metadata: {
        auth0_user_id: auth0_user_id,
      },
    });
    // Create a product
    const product = await stripe.products.create({
      name: 'Monthly subscription',
    });
    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      // items: [
      //   {
      //     price_data: {
      //       currency: 'USD',
      //       product: product.id,
      //       // unit_amount: Math.round(0.3 * 100),
      //       // unit_amount: Math.round(1.99 * 100),
      //       // unit_amount: Math.round(9.99 * 100),
      //       // unit_amount: 30,
      //       price: 'price_1MvM4QKgbteJZDnRwMvnknUt',

      //       recurring: {
      //         interval: 'month',
      //       },
      //     },
      //   },
      // ],
      // default_payment_method: 'pm_1NDQsAKgbteJZDnRrhI98Bya',
      items: [{ price: 'price_1ND1HUKgbteJZDnRifmgWAoB' }],
      // payment_settings: {
      //   payment_method_types: ['card'],
      //   save_default_payment_method: 'on_subscription',
      // },
      // expand: ['latest_invoice.payment_intent'],
    });

    console.log(subscription);

    // Send back the client secret for payment
    res.json({
      message: 'Subscription successfully initiated',
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
