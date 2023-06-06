import firebase_app from '../config';
import { getDatabase, ref, push, get, set } from 'firebase/database';

const db = getDatabase(firebase_app);

export default async function addSearchHistory(userId, course) {
  let result = null;
  let error = null;

  try {
    // Check if user data exists with the given ID
    const userData = await get(ref(db, `users/${userId}`));
    if (!userData.exists()) {
      throw new Error(`User with ID '${userId}' not found`);
    }

    // Check if the course already exists in the user's course history
    const coursesRef = ref(db, `courses/${userId}/history`);
    const coursesSnapshot = await get(coursesRef);
    const coursesData = coursesSnapshot.val() || {};
    // console.log('@@@@course exists', coursesData);
    const courseExists = Object.values(coursesData).some((existingCourse) => existingCourse.query === course.query);

    // If the course does not exist, add it to the user's course history
    if (!courseExists) {
      const newCourseRef = push(coursesRef);
      await set(newCourseRef, course);
      result = 'Course added to history';
    } else {
      result = 'Course already exists in history';
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
