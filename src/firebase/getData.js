import firebase_app from './config';
import { getDatabase, ref, set, get } from 'firebase/database';
const db = getDatabase(firebase_app);

export default async function getData(collection, id) {
  let result = null;
  let error = null;
  try {
    const snapshot = await get(ref(db, `${collection}/${id}`));
    if (snapshot.exists()) {
      result = snapshot.val();
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
