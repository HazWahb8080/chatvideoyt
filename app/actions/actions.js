"use client";
import { db } from "@/firebase";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";

export const pay = async (session) => {
  try {
    const payload = { email: session?.user?.email };
    const response = await axios.post("/api/checkout_sessions", payload);
    const data = response.data;
    window.location.replace(data.url);
  } catch (error) {
    console.error(error.message);
  }
};
export const handlePlan = async (session) => {
  try {
    const userRef = await getDoc(doc(db, "users", session?.user?.email));
    const portalUrl = userRef.data().portalUrl;
    window.location.replace(portalUrl);
  } catch (error) {
    console.error(error.message);
  }
};
