import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import { get } from "http";
import { Student } from "./studentSlice";
import {Course} from "./courseSlice";

export class Grade {
    id: number = 0;
    letterGrade: string = "";
    student: Student = new Student();
    course: Course = new Course();
}

export class SearchParams {
    first = 0;
    rows = 7;
    searchText = "";
    sortColumn = "";
    sortDirection: number | null | undefined = 1;
}

interface ResStatus {
    status: number;
    msg: string;
  }

interface state {
    grades: Grade[];
    grade: Grade;
    searchParams: SearchParams;
    resStatus: ResStatus;
    loading: boolean;
}

const initialState: state = {
    grades: [],
    grade: new Grade(),
    searchParams: {
        first: 0,
        rows: 7,
        searchText: "",
        sortColumn: "",
        sortDirection: 1,
    },
    resStatus: {status: 0, msg: ""},
    loading: false,
};


const gradeSlice = createSlice({
    name: "grade",
    initialState,
    reducers: {
        getGrades: (state: state, action: PayloadAction<Grade[]>) => {
            state.grades = action.payload;
        },

       
        addGrade: (state: state, action: PayloadAction<Grade>) => {
            state.grade = action.payload;
          },
        setGrades(state, action: PayloadAction<Grade[]>) {
            state.grades = action.payload;
        },
        setGrade(state, action: PayloadAction<Grade>) {
            state.grade = action.payload;
        },
        setSearchParams(state, action: PayloadAction<SearchParams>) {
            state.searchParams = action.payload;
        },
        setResStatus(state, action: PayloadAction<ResStatus>) {
            state.resStatus = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});


export const { addGrade, setGrades, setGrade, setSearchParams, setResStatus, setLoading , getGrades} = gradeSlice.actions;

export const fetchGrades = (searchParams: SearchParams): any => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const { first, rows, searchText, sortColumn, sortDirection } =
          searchParams;
        const res = await api.get(
          `/grades?f=${first}&r=${rows}&st=${searchText}&sc=${sortColumn}&sd=${sortDirection}&`
        );
        let feedData = res.data;
       //  const res = await api.get("/grades");
         dispatch(getGrades(res.data));
        // dispatch(setGrades(res.data));
        // dispatch(setSearchParams(searchParams));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};

export const fetchGrade = (id: number) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const res = await api.get(`/grades/${id}`);
        dispatch(setGrade(res.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};

export const createGrade = (grade: Grade) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const res = await api.post("/grades", grade);
        dispatch(setResStatus(res.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};


export const updateGrade = (grade: Grade) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const res = await api.put(`/grades/${grade.id}`, grade);
        dispatch(setResStatus(res.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};

export const deleteGrade = (id: number) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const res = await api.delete(`/grades/${id}`);
        dispatch(setResStatus(res.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};

export default gradeSlice.reducer;
