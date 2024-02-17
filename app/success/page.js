/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { db } from "@/firebase";
import axios from "axios";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const fetchCheckoutSessionData = async () => {
    const checkSessionDetails = await axios.post(
      `/api/checkout_sessions/${session_id}?email=${session?.user?.email}`
    );
    const data = checkSessionDetails.data;
    const createCustomerPortal = await axios.post(
      `/api/checkout_sessions/portal`,
      { customerId: data.customer }
    );
    const portalSession = createCustomerPortal.data;
    const portalUrl = portalSession.url;
    if (data.payment_status == "paid") {
      const userDoc = await getDoc(doc(db, "users", session?.user?.email));
      if (userDoc.exists()) {
        await updateDoc(doc(db, "users", session?.user?.email), {
          paid: true,
          checkoutSessionId: data.id,
          subId: data.subscription,
          portalUrl,
          customerEmail: data.customer_details.email,
          customerName: data.customer_details.name,
          email: session?.user?.email,
          timestamp: serverTimestamp(),
        });
      } else {
        await setDoc(doc(db, "users", session?.user?.email), {
          paid: true,
          checkoutSessionId: data.id,
          subId: data.subscription,
          portalUrl,
          customerEmail: data.customer_details.email,
          customerName: data.customer_details.name,
          email: session?.user?.email,
          timestamp: serverTimestamp(),
        });
      }
      setMessage("success");
      setTimeout(() => {
        router.push("/");
      }, 4000);
    } else {
      setMessage("error");
    }
  };

  useEffect(() => {
    if (!session || !session_id) return;
    fetchCheckoutSessionData();
  }, [session_id, session]);
  if (!session || !session_id) {
    return (
      <div
        className="w-full min-h-screen
       bg-black text-white items-center  justify-center flex flex-col"
      >
        loading ....
      </div>
    );
  }
  if (message === "error" && message !== "") {
    return (
      <div
        className="w-full min-h-screen
       bg-black text-white items-center  justify-center flex flex-col"
      >
        <h1> There is an error validating your payment details.</h1>
      </div>
    );
  }
  if (message === "success") {
    return (
      <div
        className="w-full min-h-screen
       bg-black text-white items-center  justify-center flex flex-col"
      >
        <h1 className="text-2xl">
          Thanks for your purchase!,{session?.user?.name}!
        </h1>
        <p>redirecting now ...</p>
      </div>
    );
  }
}

export default SuccessPage;
