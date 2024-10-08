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

    return userCredential;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error; // Re-throw the error so it can be handled by the calling code
  }
};

export const doSignInWithEmailAndPassword = (emailAddress, userPassword) => {
  return signInWithEmailAndPassword(auth, emailAddress, userPassword);
};

export const doSignInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();

  try {
    const authResult = await signInWithPopup(auth, googleProvider);
    const loggedIn = authResult.user;

    if (loggedIn) {
      console.log("Google sign-in successful:", loggedIn);
      // The `onAuthStateChanged` listener should now automatically detect the signed-in user
    }
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
};


export const doSignOut = () => {
  return auth.signOut();
};
