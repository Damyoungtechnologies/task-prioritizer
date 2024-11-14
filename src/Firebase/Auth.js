import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Export the auth instance so it can be used elsewhere in the app
export { auth };

export const doCreateUserWithEmailAndPassword = async (username, emailAddress, userPassword) => {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, emailAddress, userPassword);

    // Update the user's profile with the username (displayName)
    await updateProfile(userCredential.user, {
      displayName: username,
    });

    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, error }; // Return success: false to indicate failure
  }
};

export const doSignInWithEmailAndPassword = async (emailAddress, userPassword) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, emailAddress, userPassword);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error during email and password sign-in:", error);
    return { success: false, error }; // Return success: false to indicate failure
  }
};

export const doSignInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();

  try {
    const authResult = await signInWithPopup(auth, googleProvider);
    const loggedIn = authResult.user;

    if (loggedIn) {
      console.log("Google sign-in successful:", loggedIn);
      return { success: true, user: loggedIn };
    }
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    return { success: false, error }; // Return success: false to indicate failure
  }
};

export const doSignOut = () => {
  return auth.signOut();
};
