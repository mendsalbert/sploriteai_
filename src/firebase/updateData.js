import firebase_app from './config';
import { getDatabase, ref, get, update } from 'firebase/database';

const db = getDatabase(firebase_app);

export default async function updateData(collection, id, data) {
  let result = null;
  let error = null;

  try {
    // Retrieve existing data from the database
    const snapshot = await get(ref(db, `${collection}/${id}`));
    const existingData = snapshot.val();

    // Merge the existing data with the new data
    const mergedData = { ...existingData, ...data };

    // Update the database with the merged data
    await update(ref(db, `${collection}/${id}`), mergedData);

    result = 'Data updated successfully!';
  } catch (e) {
    error = e.message;
  }

  return { result, error };
}
