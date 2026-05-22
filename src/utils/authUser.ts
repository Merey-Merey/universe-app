import type { User as AppUser } from "../context/UserContext";
import { getAvatarLetter, getInitials } from "../context/UserContext";
import type { UserProfile } from "../firebase/userService";

type AuthUserLike = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

export const buildAppUserFromAuth = (
  firebaseUser: AuthUserLike,
  profile: UserProfile | null,
  prevUser: AppUser
): AppUser => {
  const fullName = profile?.fullName || firebaseUser.displayName || prevUser.fullName || "";

  return {
    ...prevUser,
    fullName,
    email: profile?.email || firebaseUser.email || prevUser.email || "",
    phone: profile?.phone || prevUser.phone || "+7 (",
    university: profile?.university || prevUser.university || "",
    faculty: profile?.faculty || prevUser.faculty || "",
    year: profile?.year || prevUser.year || "1st",
    city: profile?.city || prevUser.city || "",
    role: profile?.role || prevUser.role || "Student",
    initials: getInitials(fullName),
    avatarLetter: getAvatarLetter(fullName),
    avatarUrl: profile?.avatarUrl || firebaseUser.photoURL || prevUser.avatarUrl,
    savedJobIds: profile?.savedJobIds ?? prevUser.savedJobIds,
    savedHousingIds: profile?.savedHousingIds ?? prevUser.savedHousingIds,
    appliedJobIds: profile?.appliedJobIds ?? prevUser.appliedJobIds,
    eventIds: profile?.eventIds ?? prevUser.eventIds,
  };
};
