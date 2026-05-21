/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

export interface User {
  avatarUrl: any;
  savedJobIds: number[];
  savedHousingIds: number[];
  appliedJobIds: number[];
  eventIds: number[];
  fullName: string;
  email: string;
  phone: string;
  university: string;
  faculty: string;
  year: string;
  city: string;
  role: string;
  initials: string;
  avatarLetter: string;
  avatar?: string;
}

interface UserContextValue {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  toggleSavedJob:     (id: number) => void;
  toggleSavedHousing: (id: number) => void;
  applyToJob:         (id: number) => void;
  registerEvent:      (id: number) => void;
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
  eventIds: [],
};

const UserContext = createContext<UserContextValue>({
  user: defaultUser,
  setUser: () => {},
  toggleSavedJob:     () => {},
  toggleSavedHousing: () => {},
  applyToJob:         () => {},
  registerEvent:      () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const toggleSavedJob = (id: number) =>
    setUser(u => ({
      ...u,
      savedJobIds: u.savedJobIds.includes(id)
        ? u.savedJobIds.filter(x => x !== id)
        : [...u.savedJobIds, id],
    }));

  const toggleSavedHousing = (id: number) =>
    setUser(u => ({
      ...u,
      savedHousingIds: u.savedHousingIds.includes(id)
        ? u.savedHousingIds.filter(x => x !== id)
        : [...u.savedHousingIds, id],
    }));

  const applyToJob = (id: number) =>
    setUser(u => ({
      ...u,
      appliedJobIds: u.appliedJobIds.includes(id)
        ? u.appliedJobIds
        : [...u.appliedJobIds, id],
    }));

  const registerEvent = (id: number) =>
    setUser(u => ({
      ...u,
      eventIds: u.eventIds.includes(id)
        ? u.eventIds
        : [...u.eventIds, id],
    }));

  return (
    <UserContext.Provider value={{ user, setUser, toggleSavedJob, toggleSavedHousing, applyToJob, registerEvent }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export const getInitials = (fullName: string): string => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

export const getAvatarLetter = (fullName: string): string => {
  const first = fullName.trim().split(/\s+/)[0];
  return first ? first[0].toUpperCase() : "";
};