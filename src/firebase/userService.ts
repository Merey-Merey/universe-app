import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

export interface UserProfile {
  fullName: string;
  email: string;
  phone?: string;
  university?: string;
  faculty?: string;
  year?: string;
  city?: string;
  role?: string;
  avatarUrl?: string;
  savedJobIds?: number[];
  savedHousingIds?: number[];
  appliedJobIds?: number[];
  eventIds?: number[];
  createdAt?: unknown;
}

export const createUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
): Promise<void> => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      fullName: "",
      email: "",
      phone: "+7 (",
      university: "",
      faculty: "",
      year: "1st",
      city: "",
      role: "Student",
      avatarUrl: "",
      savedJobIds: [],
      savedHousingIds: [],
      appliedJobIds: [],
      eventIds: [],
      createdAt: serverTimestamp(),
      ...data,
    });
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
};

export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
): Promise<void> => {
  await updateDoc(doc(db, "users", uid), data as Record<string, unknown>);
};