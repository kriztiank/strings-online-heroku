'use strict';
const stripe = require('stripe')('sk_test_8kfQdaZyKgd2aG58YtYSm1Lk00AUKUp1Ti');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (ctx) => {
    const { name, total, items, stripeTokenId } = ctx.request.body;
    const { id } = ctx.state.user;
    // console.log(ctx.request.body);

    const charge = await stripe.charges.create({
      amount: Math.round(total * 100),
      currency: 'dkk',
      source: stripeTokenId,
      description: `Order ${new Date()} by ${ctx.state.user.username}`,
    });
    const order = await strapi.services.order.create({
      name,
      total,
      items,
      user: id,
    });
    return order;
  },
};
