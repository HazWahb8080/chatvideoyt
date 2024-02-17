import url from "url";
const { default: Stripe } = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(request) {
  const { customerId } = await request.json();
  try {
    const { protocol, host } = url.parse(request.url);
    const baseUrl = `${protocol}//${host}`;
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: baseUrl,
    });
    return Response.json(portalSession);
  } catch (error) {
    return Response.json(error.message);
  }
}
