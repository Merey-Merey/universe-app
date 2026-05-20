/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

export interface User {
  avatarUrl: any;
  savedJobIds: never[];
  savedHousingIds: never[];
  appliedJobIds: never[];
  eventIds: never[];
  fullName: string;       // "Aymakhan Balausa"
  email: string;          // "aymakhanbalausa@gmail.com"
  phone: string;          // "+7 771 887 33 37"
  university: string;     // "SKSU — South Kazakhstan State Univ."
  faculty: string;        // "Information Technologies"
  year: string;           // "3rd"
  city: string;           // "Shymkent"
  role: string;           // "Student"
  /** Первые буквы имени и фамилии, например "AB" */
  initials: string;
  /** Первая буква имени для большого аватара, например "A" */
  avatarLetter: string;
  avatar?: string;
}

interface UserContextValue {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUser: User = {
    fullName: "",
    email: "",
    phone: "+7 (",
    university: "",
    faculty: "",
    year: "1st",
    city: "",
    role: "Student",
    initials: "",
    avatarLetter: "",
    avatarUrl: undefined,
    savedJobIds: [],
    savedHousingIds: [],
    appliedJobIds: [],
    eventIds: []
};

const UserContext = createContext<UserContextValue>({
  user: defaultUser,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

/** Утилита: вычислить инициалы из полного имени */
export const getInitials = (fullName: string): string => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

/** Утилита: первая буква имени */
export const getAvatarLetter = (fullName: string): string => {
  const first = fullName.trim().split(/\s+/)[0];
  return first ? first[0].toUpperCase() : "";
};