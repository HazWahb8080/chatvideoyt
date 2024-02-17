import Stripe from "stripe";
import url from "url";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(request) {
  const { email } = await request.json();
  try {
    const { protocol, host } = url.parse(request.url);
    const baseUrl = `${protocol}//${host}`;
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [{ price: "price_1OgWA3LanFSuawPmr4hb5ZGP", quantity: 1 }],
      mode: "subscription",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    return Response.json(session);
  } catch (error) {
    return Response.json({ statusCode: 500, message: error.message });
  }
}
