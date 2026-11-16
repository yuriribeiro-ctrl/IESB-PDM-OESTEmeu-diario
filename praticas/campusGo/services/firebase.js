import { getAuth } from 'firebase/auth';
import { firebaseApp, db } from './firebase-config';

export const auth = getAuth(firebaseApp);
export { db, firebaseApp };
