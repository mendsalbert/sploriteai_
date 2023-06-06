import firebase_app from "../config";
import { getDatabase, ref, remove } from "firebase/database";

const db = getDatabase(firebase_app);

export default async function deleteCoursesHistory(course, userId) {
  try {
    const coursesRef = ref(db, `preference/${userId}`);
    await remove(coursesRef);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
