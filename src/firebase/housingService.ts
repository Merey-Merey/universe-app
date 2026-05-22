import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

export interface HousingFirestore {
  id: string;
  name: string;
  address: string;
  price: string;
  priceShort: string;
  rooms: string;
  area: string;
  floor: string;
  amenities: string[];
  about: string;
  available: boolean;
  lat: number;
  lng: number;
  owner: {
    name: string;
    initials: string;
    role: string;
    phone: string;
    whatsapp: string;
    telegram: string;
  };
  createdAt?: unknown;
}

export const getHousing = async (): Promise<HousingFirestore[]> => {
  const q = query(collection(db, "housing"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as HousingFirestore));
};

export const addHousing = async (
  data: Omit<HousingFirestore, "id" | "createdAt">
): Promise<void> => {
  await addDoc(collection(db, "housing"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};