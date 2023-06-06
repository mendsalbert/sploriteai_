import addUserPreference_ from '@/firebase/userPreference/addData';
import getUserPreference_ from '@/firebase/userPreference/getData';
import removeUserPreference_ from '@/firebase/userPreference/deleteData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import 'firebase/auth';
import { transformObjectToArray } from '@/utils/helpers';

interface UserPreferenceState {
  preferences: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserPreferenceState = {
  preferences: [],
  isLoading: false,
  error: null,
};

const userPreferenceSlice = createSlice({
  name: 'userPreference',
  initialState,
  reducers: {
    addUserPreferenceStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    addUserPreferenceSuccess(state, action: PayloadAction<any>) {
      state.preferences = [...state.preferences, action.payload];
      state.isLoading = false;
      state.error = null;
    },
    addUserPreferenceFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserPreferenceStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getUserPreferenceSuccess(state, action: PayloadAction<any>) {
      state.preferences = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getUserPreferenceFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeUserPreferenceStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    removeUserPreferenceSuccess(state, action: PayloadAction<any>) {
      state.preferences = state.preferences.filter((preference) => preference.id !== action.payload.id);
      state.isLoading = false;
      state.error = null;
    },
    removeUserPreferenceFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addUserPreferenceStart,
  addUserPreferenceSuccess,
  addUserPreferenceFailure,
  getUserPreferenceStart,
  getUserPreferenceSuccess,
  getUserPreferenceFailure,
  removeUserPreferenceStart,
  removeUserPreferenceSuccess,
  removeUserPreferenceFailure,
} = userPreferenceSlice.actions;

export const getUserPreference = (userId: any) => async (dispatch: any) => {
  dispatch(getUserPreferenceStart());

  try {
    const userPreferenceData = await getUserPreference_(userId?.sub);

    dispatch(getUserPreferenceSuccess(userPreferenceData));
  } catch (error: any) {
    dispatch(getUserPreferenceFailure(error.message));
  }
};

export const addUserPreference = (query: any, user: any) => async (dispatch: any) => {
  dispatch(addUserPreferenceStart());
  try {
    if (user) {
      const _ = await addUserPreference_(user.sub, query);

      dispatch(addUserPreferenceSuccess(query));
    } else {
      dispatch(addUserPreferenceFailure('User not found.'));
    }
  } catch (error: any) {
    dispatch(addUserPreferenceFailure(error.message));
  }
};

export const removeUserPreference = (preference: any, userId: any) => async (dispatch: any, getState: any) => {
  try {
    const _ = await removeUserPreference_(preference, userId?.sub);
    const updatedPreferences = getState().userPreference.preferences.filter((p: any) => p.id !== preference);
    dispatch(getUserPreferenceSuccess(updatedPreferences));
  } catch (error: any) {
    dispatch(removeUserPreferenceFailure(error.message));
  }
};

export default userPreferenceSlice.reducer;
