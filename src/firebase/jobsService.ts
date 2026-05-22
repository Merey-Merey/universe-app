import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

export interface JobItem {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyColor?: string;
  type: string;
  mode: string;
  salary: string;
  location: string;
  skills: string[];
  description?: string;
  requirements?: string[];
  accentColor?: string;
  featured?: boolean;
  createdAt?: unknown;
}

export const getJobs = async (): Promise<JobItem[]> => {
  const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as JobItem));
};

export const addJob = async (
  data: Omit<JobItem, "id" | "createdAt">
): Promise<void> => {
  await addDoc(collection(db, "jobs"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};