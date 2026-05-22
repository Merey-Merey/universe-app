import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./config";

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: string;
  amount?: string;
  deadline?: string;
  tags?: string[];
  urgent?: boolean;
  createdAt?: unknown;
}

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Announcement));
};

export const addAnnouncement = async (
  data: Omit<Announcement, "id" | "createdAt">
): Promise<void> => {
  await addDoc(collection(db, "announcements"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};