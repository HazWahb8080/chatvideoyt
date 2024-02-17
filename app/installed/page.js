"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

function InstalledPage() {
  const { data: session } = useSession();
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitApiKey = async () => {
    if (apiKey.trim() == "" || loading) return;
    setLoading(true);
    const userDoc = await getDoc(doc(db, "users", session?.user?.email));
    if (userDoc.exists()) {
      await updateDoc(doc(db, "users", session?.user?.email), {
        user: session?.user,
        timestamp: serverTimestamp(),
        apiKey,
      });
    } else {
      await setDoc(doc(db, "users", session?.user?.email), {
        user: session?.user,
        timestamp: serverTimestamp(),
        apiKey,
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!router || !session) return;
    const checkApiKeyFirst = async () => {
      const userRef = doc(db, "users", session?.user?.email);
      const keyRef = await getDoc(userRef);
      if (keyRef.exists()) {
        if (keyRef.data().apiKey) {
          setApiKey(keyRef.data().apiKey);
        } else {
          setApiKey("");
        }
      }
    };
    checkApiKeyFirst();
  }, [router, session]);
  return (
    <div
      className="min-h-screen overflow-y-hidden w-full items-center 
    justify-center flex relative bg-black text-white"
    >
      {session ? (
        <span className="w-full items-center justify-center flex flex-col space-y-6 z-50">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="enter your openai api key"
            className="input"
          />
          <button onClick={handleSubmitApiKey} className="button z-50">
            {loading ? "submitting..." : "submit"}
          </button>
        </span>
      ) : (
        <span className="w-full items-center justify-center flex flex-col space-y-6 z-50">
          <h1 className="text-xl">
            signin in order to be able to <br /> use our chrome extension
          </h1>
          <button
            className="button"
            onClick={() => signIn("google", { callbackUrl: "/installed" })}
          >
            sign In With Google
          </button>
        </span>
      )}
    </div>
  );
}

export default InstalledPage;
