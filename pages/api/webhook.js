import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_d02cd36108ef9719aed8d1b48d1b53794fdf33d649c2675ebb83c76963523291');
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  // Handle the event
  switch (event.type) {
    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object;
      // Then define and call a function to handle the event invoice.payment_failed
      break;
    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;

      // Then define and call a function to handle the event invoice.payment_succeeded
      break;
    case 'payment_intent.created':
      const paymentIntentCreated = event.data.object;
      // Then define and call a function to handle the event payment_intent.created
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded);
      // Then define and call a function to handle the event payment_intent.succeeded
      break;

    case 'charge.succeeded':
      const chargeSucceeded = event.data.object;

      //       // Then define and call a function to handle the event charge.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.status(200).send('Webhook received successfully');
}

// const Stripe = require('stripe');
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const express = require('express');
// const app = express();

// app.use(express.json());

// app.post('/webhook', async (req, res) => {
//   try {
//     const sig = req.headers['stripe-signature'];
//     const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

//     if (event.type === 'charge.succeeded') {
//       // Payment was successful, handle it here
//       const paymentIntent = event.data.object;
//       console.log('Payment succeeded:', paymentIntent.id);
//     }

//     res.status(200).json({ received: true });
//   } catch (error) {
//     console.error('Webhook error:', error);
//     res.status(400).json({ error: 'Webhook Error' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const express = require('express');
// const app = express();

// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = 'whsec_d02cd36108ef9719aed8d1b48d1b53794fdf33d649c2675ebb83c76963523291';

// app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'charge.succeeded':
//       const chargeSucceeded = event.data.object;
//       // Then define and call a function to handle the event charge.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

// // app.listen(4242, () => console.log('Running on port 4242'));
