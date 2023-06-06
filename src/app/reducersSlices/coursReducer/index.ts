// import getData from "../../../firebase/getData";
// import addData from "../../../firebase/addData";
// import getData from "../../../firebase/getData";
// import updateData from "../../../firebase/updateData";
import addSearchHistory from '@/firebase/courses/addData';
import getCourseHistory_ from '@/firebase/courses/getData';
import deleteCourseHistory from '@/firebase/courses/deleteData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import 'firebase/auth';
import { transformObjectToArray } from '@/utils/helpers';
interface CourseHistoryState {
  courses: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CourseHistoryState = {
  courses: [],
  isLoading: false,
  error: null,
};

const courseHistorySlice = createSlice({
  name: 'courseHistory',
  initialState,
  reducers: {
    addCourseHistoryStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    addCourseHistorySuccess(state, action: PayloadAction<any>) {
      state.courses = [...state.courses, action.payload];
      state.isLoading = false;
      state.error = null;
    },
    addCourseHistoryFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCourseHistoryStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getCourseHistorySuccess(state, action: PayloadAction<any>) {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getCourseHistoryFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeCourseHistoryStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    removeCourseHistorySuccess(state, action: PayloadAction<any>) {
      state.courses = state.courses.filter((course) => course.id !== action.payload.id);
      state.isLoading = false;
      state.error = null;
    },
    removeCourseHistoryFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addCourseHistoryStart,
  addCourseHistorySuccess,
  addCourseHistoryFailure,
  getCourseHistoryStart,
  getCourseHistorySuccess,
  getCourseHistoryFailure,
  removeCourseHistoryStart,
  removeCourseHistorySuccess,
  removeCourseHistoryFailure,
} = courseHistorySlice.actions;

export const getCourseHistory = (userId: any) => async (dispatch: any) => {
  dispatch(getCourseHistoryStart());

  try {
    const courseHistoryData = await getCourseHistory_(userId?.sub);

    dispatch(getCourseHistorySuccess(transformObjectToArray(courseHistoryData)));
  } catch (error: any) {
    dispatch(getCourseHistoryFailure(error.message));
  }
};

export const addCourseHistory = (query: any, user: any) => async (dispatch: any) => {
  dispatch(addCourseHistoryStart());
  try {
    if (user) {
      const _ = await addSearchHistory(user.sub, query);
      // console.log(_);

      dispatch(addCourseHistorySuccess(query));
    } else {
      dispatch(addCourseHistoryFailure('User not found.'));
    }
  } catch (error: any) {
    dispatch(addCourseHistoryFailure(error.message));
  }
};

// export const removeCourseHistory =
//   (course: any, userId: any) => async (dispatch: any) => {
//     dispatch(removeCourseHistoryStart());

//     try {
//       await deleteCourseHistory(course, userId?.sub);
//       let courseHis = await getCourseHistory(userId?.sub);
//       console.log("@@@@@@", courseHis);

//       dispatch(removeCourseHistorySuccess(courseHis));
//     } catch (error: any) {
//       dispatch(removeCourseHistoryFailure(error.message));
//     }
//   };

export const removeCourseHistory = (course: any, userId: any) => async (dispatch: any, getState: any) => {
  // dispatch(removeCourseHistoryStart());

  try {
    // console.log(course, userId);
    const _ = await deleteCourseHistory(course, userId?.sub);
    // console.log("@@@@@", _);

    const updatedCourses = getState().course.courses.filter((c: any) => c.id !== course);
    // console.log(updatedCourses);

    // dispatch(removeCourseHistorySuccess(updatedCourses));
    dispatch(getCourseHistorySuccess(updatedCourses));
  } catch (error: any) {
    dispatch(removeCourseHistoryFailure(error.message));
  }
};

// export const removeCourseHistory =
//   (course: any, userId: any) => async (dispatch: any, getState: any) => {
//     console.log("Removing course:", course);
//     console.log("Before removing:", getState().course.courses);
//     dispatch(removeCourseHistoryStart());

//     try {
//       // await deleteCourseHistory(course, userId?.sub);
//       console.log("Course removed from backend:", course);

//       const updatedCourses = getState().courseHistory.courses.filter(
//         (c: any) => c.id !== course.id
//       );
//       console.log("After removing:", updatedCourses);

//       dispatch(removeCourseHistorySuccess(updatedCourses));
//     } catch (error: any) {
//       dispatch(removeCourseHistoryFailure(error.message));
//     }
//   };

export default courseHistorySlice.reducer;
