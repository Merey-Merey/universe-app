import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  type UserCredential,
} from "firebase/auth";
import { auth } from "./config";
import { createUserProfile } from "./userService";

const getGoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
};

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
  const provider = getGoogleProvider();
  const credential = await signInWithPopup(auth, provider);
  await createUserProfile(credential.user.uid, {
    fullName: credential.user.displayName ?? "",
    email: credential.user.email ?? "",
    avatarUrl: credential.user.photoURL ?? "",
  });
  return credential;
};

export const startGoogleRedirectSignIn = async (): Promise<void> => {
  const provider = getGoogleProvider();
  await signInWithRedirect(auth, provider);
};

export const getGoogleRedirectSignInResult = async (): Promise<UserCredential | null> => {
  const credential = await getRedirectResult(auth);
  if (!credential) return null;

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
