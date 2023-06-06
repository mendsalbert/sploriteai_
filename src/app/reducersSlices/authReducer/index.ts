// import getData from "../../../firebase/getData";
import addData from '../../../firebase/addData';
import getData from '../../../firebase/getData';
import updateData from '../../../firebase/updateData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import RootState from '../../store/index';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

interface UserState {
  user: object | any[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserDataStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getUserDataSuccess(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getUserDataFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserDataStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    updateUserDataSuccess(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateUserDataFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addUserDataStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    addUserDataSuccess(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addUserDataFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

interface AddUserDataAction {
  type: string;
  payload: any; // Replace `any` with the appropriate type for the payload
}

export const { getUserDataStart, getUserDataSuccess, getUserDataFailure, updateUserDataStart, updateUserDataSuccess, updateUserDataFailure, addUserDataStart, addUserDataSuccess, addUserDataFailure } =
  userSlice.actions;

export const addUserData = (userData: any, user: any) => async (dispatch: any) => {
  dispatch(addUserDataStart());
  try {
    if (user) {
      const _ = await addData('users', user.sub, userData);
      // console.log(_);

      dispatch(addUserDataSuccess({ ...user, ...userData }));
    } else {
      dispatch(addUserDataFailure('User not found.'));
    }
  } catch (error: any) {
    dispatch(addUserDataFailure(error.message));
  }
};

export const getUserData = (user: any) => async (dispatch: any) => {
  dispatch(getUserDataStart());

  try {
    if (user) {
      const userData = await getData('users', user.sub);

      dispatch(getUserDataSuccess({ ...user, ...userData }));
    } else {
      dispatch(getUserDataFailure('User not found.'));
    }
  } catch (error: any) {
    dispatch(getUserDataFailure(error.message));
  }
};

export const updateUserData = (userData: any, user: any) => async (dispatch: any) => {
  dispatch(updateUserDataStart());
  try {
    if (user) {
      const _ = await updateData('users', user.sub, userData);
      // console.log(_);

      dispatch(updateUserDataSuccess({ ...user, ...userData }));
    } else {
      dispatch(updateUserDataFailure('User not found.'));
    }
  } catch (error: any) {
    dispatch(updateUserDataFailure(error.message));
  }
};

export default userSlice.reducer;
