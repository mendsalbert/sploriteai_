import { getDatabase, ref, get } from 'firebase/database';
import firebase_app from './config';

export default async function getUserIdByEmail(email) {
  const db = getDatabase(firebase_app);
  let result = null;
  let error = null;

  try {
    const snapshot = await get(ref(db, 'users'));
    if (snapshot.exists()) {
      const usersData = snapshot.val();
      for (const userId in usersData) {
        const user = usersData[userId];
        if (user.email === email) {
          result = userId;
          break;
        }
      }
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
