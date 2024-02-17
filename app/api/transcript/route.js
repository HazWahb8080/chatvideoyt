import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function OPTIONS(request) {
  return NextResponse.json({}, { headers: corsHeaders });
}
export async function POST(request) {
  try {
    const { transcript, session } = await request.json();
    const userRef = doc(db, "users", session?.user?.email);
    const keyRef = getDoc(userRef);
    let key = "";
    key = keyRef.data().apiKey;
    let prompt = `In detail, summarize this youtube video transcript ${transcript}`;
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo-1106",
          messages: [{ role: "user", content: prompt }],
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      }
    );
    if (openaiResponse.ok) {
      const openaiData = await openaiResponse.json();
      if (
        openaiData.choices &&
        openaiData.choices.length > 0 &&
        openaiData.choices[0].message &&
        openaiData.choices[0].message.content
      ) {
        const generatedText = openaiData.choices[0].message.content;
        return Response.json({ generatedText, key }, { headers: corsHeaders });
      } else {
        return Response.json(
          JSON.stringify("nothing returned from openAi", {
            headers: corsHeaders,
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
