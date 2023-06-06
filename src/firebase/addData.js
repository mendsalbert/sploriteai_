import firebase_app from './config';
import { getDatabase, ref, set, get } from 'firebase/database';

const db = getDatabase(firebase_app);

export default async function addData(collection, id, data) {
  let result = null;
  let error = null;

  try {
    // Check if data already exists with the given ID
    const existingData = await get(ref(db, `${collection}/${id}`));
    if (existingData.exists()) {
      throw new Error(`Data with ID '${id}' already exists`);
    }
    // Add the data to the database
    await set(ref(db, `${collection}/${id}`), {
      id,
      ...data,
    });
  } catch (e) {
    error = e;
  }
  return { result, error };
}
