import firebase_app from '../config';
import { getDatabase, ref, get } from 'firebase/database';

const db = getDatabase(firebase_app);

export default async function getCoursesHistory_(userId) {
  try {
    const coursesRef = ref(db, `courses/${userId}/history`);
    const coursesSnapshot = await get(coursesRef);

    if (!coursesSnapshot.exists()) {
      return null;
    }

    const courses = coursesSnapshot.val();

    return courses;
  } catch (e) {
    console.error(e);
    return null;
  }
}
