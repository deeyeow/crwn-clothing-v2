import { initializeApp } from 'firebase/app';
import {
  getAuth,
  //signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDczxevJQUniPhQDLshQYLy30ffzhCfS4U',
  authDomain: 'crwn-clothing-db-d8409.firebaseapp.com',
  projectId: 'crwn-clothing-db-d8409',
  storageBucket: 'crwn-clothing-db-d8409.appspot.com',
  messagingSenderId: '217252760801',
  appId: '1:217252760801:web:636334c731a00413497ba0',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
/*
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
*/

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

  console.log(userAuth);
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

//redundant function to protect front-end in case function inside changes
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromEmailAndPassword = async (userAuth) => {
  if (!userAuth) return;

  console.log(userAuth);
  //const userDocRef = doc(db, 'users', )
};
