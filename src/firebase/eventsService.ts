import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

export interface EventFirestore {
  id: string;
  day: string;
  month: string;
  date: number;
  title: string;
  venue: string;
  time: string;
  category: string;
  price: string | null;
  spots?: number;
  featured?: boolean;
  accentColor: string;
  createdAt?: unknown;
}

export const getEvents = async (): Promise<EventFirestore[]> => {
  const q = query(collection(db, "events"), orderBy("date", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as EventFirestore));
};

export const addEvent = async (
  data: Omit<EventFirestore, "id" | "createdAt">
): Promise<void> => {
  await addDoc(collection(db, "events"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};