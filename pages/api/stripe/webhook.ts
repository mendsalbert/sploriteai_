import updateData from '@/firebase/updateData';
// import getUserIdByEmail from '@/firebase/getEmail';
const getRawBody = require('raw-body');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const headers = req.headers;

  try {
    const rawBody = await getRawBody(req);
    const stripeEvent = stripe.webhooks.constructEvent(rawBody, headers['stripe-signature'], '');

    console.log(`stripeEvent: ${stripeEvent.type}`);

    const object = stripeEvent.data.object;
    let customer, auth0_user_id;

    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        if (object.amount_due > 0) {
          customer = await stripe.customers.retrieve(object.customer);
          auth0_user_id = customer.metadata.auth0_user_id;

          const subscriptionId = object.subscription;

          await updateData('users', auth0_user_id, {
            isSubscribed: true,
            stripeSubscriptionStatus: 'active',
            subscriptionId: subscriptionId,
          });
        }
        break;

      case 'invoice.payment_succeeded':
        if (object.amount_due > 0) {
          customer = await stripe.customers.retrieve(object.customer);
          auth0_user_id = customer.metadata.auth0_user_id;

          const subscriptionId = object.subscription;

          await updateData('users', auth0_user_id, {
            isSubscribed: true,
            stripeSubscriptionStatus: 'active',
            subscriptionId: subscriptionId,
          });
        }
        break;

      case 'invoice.created':
        if (object.amount_due > 0) {
          console.log('invoice created=====', 'created');
          customer = await stripe.customers.retrieve(object.customer);
          auth0_user_id = customer.metadata.auth0_user_id;

          const subscriptionId = object.subscription;

          await updateData('users', auth0_user_id, {
            isSubscribed: true,
            stripeSubscriptionStatus: 'active',
            subscriptionId: subscriptionId,
          });
        }
        break;

      case 'invoice.payment_failed':
        customer = await stripe.customers.retrieve(object.customer);
        auth0_user_id = customer.metadata.auth0_user_id;

        await updateData('users', auth0_user_id, {
          isSubscribed: false,
          stripeSubscriptionStatus: 'past_due',
        });
        break;

      case 'charge.succeeded':
        const invoiceId = object.invoice;
        const invoice = await stripe.invoices.retrieve(invoiceId);
        const subscriptionId = invoice.subscription;

        customer = await stripe.customers.retrieve(object.customer);
        auth0_user_id = customer.metadata.auth0_user_id;

        await updateData('users', auth0_user_id, {
          isSubscribed: true,
          stripeSubscriptionStatus: object.status,
          subscriptionId: subscriptionId,
        });
        break;

      case 'customer.subscription.deleted':
        console.log('deleted');
        customer = await stripe.customers.retrieve(object.customer);
        auth0_user_id = customer.metadata.auth0_user_id;

        await updateData('users', auth0_user_id, {
          isSubscribed: false,
          stripeSubscriptionStatus: 'canceled',
        });
        break;
      // ...
    }

    res.send({ status: 'success' });
  } catch (error) {
    console.log('stripe webhook error', error);
    res.send({ status: 'error', code: error.code, message: error.message });
  }
};
