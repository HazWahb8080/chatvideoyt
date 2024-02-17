import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu2JmraTFtingH2aPClxOhWr-0xoU-dsg",
  authDomain: "chatvideoyt-4e2a7.firebaseapp.com",
  projectId: "chatvideoyt-4e2a7",
  storageBucket: "chatvideoyt-4e2a7.appspot.com",
  messagingSenderId: "519895359716",
  appId: "1:519895359716:web:c94c3d3bba7672c0580cf1",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
// const analytics = !getApps().length ? getAnalytics(app) : getApp();

export default app;
export { db, storage };
