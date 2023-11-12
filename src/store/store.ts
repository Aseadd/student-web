import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import studentSlice from "../features/studentSlice";
import courseSlice from "../features/courseSlice";
import gradeSlice from "../features/gradeSlice";
import gradesSlice from "../features/gradesSlice";


const initialState = {
    // Add initial state here
    
};

const store = configureStore({
    reducer: {
        // Add reducers here
        student: studentSlice,
        course: courseSlice,
        grade: gradeSlice,
        grades: gradesSlice,
    },
    preloadedState: initialState,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;