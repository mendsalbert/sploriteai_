// import firebase_app from './config';
import firebase_app from '../firebase/config';
import { getDatabase, ref, get } from 'firebase/database';
const db = getDatabase(firebase_app);

const getUserSubscription = async (userId) => {
  try {
    // Get the user data from the Realtime Database
    const userSnapshot = await get(ref(db, `users/${userId}`));

    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      return {
        isSubscribed: userData.isSubscribed,
        subscriptionId: userData.subscriptionId,
      };
      //   return userData.isSubscribed;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    throw error;
  }
};

export default getUserSubscription;
