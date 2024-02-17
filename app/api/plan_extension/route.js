import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json(null);
  } else {
    const userDoc = await getDoc(doc(db, "users", session?.user?.email));
    let planData = "";
    if (userDoc.exists() && userDoc?.data()?.subId) {
      planData = await stripe.subscriptions.retrieve(userDoc.data().subId);
    } else {
      planData = null;
    }
    return Response.json(planData);
  }
}
