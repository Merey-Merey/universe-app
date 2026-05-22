import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  type UserCredential,
} from "firebase/auth";
import { auth } from "./config";
import { createUserProfile } from "./userService";

export const signIn = (email: string, password: string): Promise<UserCredential> =>
  signInWithEmailAndPassword(auth, email, password);

export const signUp = async (
  email: string,
  password: string,
  fullName: string
): Promise<UserCredential> => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(credential.user.uid, { fullName, email });
  return credential;
};

export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  await createUserProfile(credential.user.uid, {
    fullName: credential.user.displayName ?? "",
    email: credential.user.email ?? "",
    avatarUrl: credential.user.photoURL ?? "",
  });
  return credential;
};

export const logout = (): Promise<void> => signOut(auth);

export const resetPassword = (email: string): Promise<void> =>
  sendPasswordResetEmail(auth, email);