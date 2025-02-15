export default {
  routes: [
    {
      method: "POST",
      path: "/purcharse",
      handler: "payment.makePurcharse",
    },
    {
      method: "POST",
      path: "/purcharse/webhook",
      handler: "payment.webhookPayment",
      config: {
        auth: false,
      },
    },
  ],
};
