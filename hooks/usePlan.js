"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";

// custom hook to see the status of the plan either paid or not.

export function usePlan() {
  const { data: session } = useSession();
  const [active, setActivePlan] = useState();
  const [customerPortal, setCustomerPortal] = useState();

  // make it separate in case we need it else where.
  const checkActivePlanOrNot = async () => {
    const userDoc = await getDoc(doc(db, "users", session?.user?.email));
    if (!userDoc.exists()) return;
    const subId = userDoc.data().subId;
    setCustomerPortal(userDoc.data().portalUrl);
    const response = await axios.post(
      `/api/checkout_sessions/${subId}?email=${session?.user?.email}`
    );
    const data = response.data;

    if (data.status == "active") {
      setActivePlan(true);
    } else {
      setActivePlan(false);
    }
  };
  useEffect(() => {
    if (!session) return;
    checkActivePlanOrNot();
  }, [session]);

  return { checkActivePlanOrNot, active, customerPortal };
}
