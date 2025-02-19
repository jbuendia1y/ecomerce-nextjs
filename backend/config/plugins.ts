export default () => ({
  email: {
    config: {
      provider: "strapi-provider-email-resend",
      providerOptions: {
        apiKey: process.env.RESEND_API_KEY, // Required
      },
      settings: {
        defaultFrom: process.env.RESEND_EMAIL_FROM,
        defaultReplyTo: process.env.RESEND_EMAIL_FROM,
      },
    },
  },
});
