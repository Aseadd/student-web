import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import { get } from "http";
import { Course } from "./courseSlice";

export class Student {
    id: number = 0;
    name: string = ""
    contactDetails: string = ""
    academicRecord: string = ""
    courses: any[] = []
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
    students: Student[];

    student: Student;
    searchParams: SearchParams;
    resStatus: ResStatus;
    loading: boolean;
}

const initialState: state = {
    students: [],
    student: {
        id: 0,
        name: "",
        contactDetails: "",
        academicRecord: "",
        courses: [],
    },
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


const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        getStudents: (state: state, action: PayloadAction<Student[]>) => {
            state.students = action.payload;
        },

       
        addStudent: (state: state, action: PayloadAction<Student>) => {
            state.student = action.payload;
          },
        setStudents(state, action: PayloadAction<Student[]>) {
            state.students = action.payload;
        },
        setStudent(state, action: PayloadAction<Student>) {
            state.student = action.payload;
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


export const { addStudent, setStudents, setStudent, setSearchParams, setResStatus, setLoading , getStudents} = studentSlice.actions;

export const fetchStudents = (searchParams: SearchParams): any => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const { first, rows, searchText, sortColumn, sortDirection } =
          searchParams;
        const res = await api.get(
          `/students?f=${first}&r=${rows}&st=${searchText}&sc=${sortColumn}&sd=${sortDirection}&`
        );
        let feedData = res.data;
       //  const res = await api.get("/students");
         dispatch(getStudents(res.data));
         console.log("student data from slice", res.data);
        // dispatch(setStudents(res.data));
        // dispatch(setSearchParams(searchParams));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};

export const fetchStudent = (id: number) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const res = await api.get(`/students/${id}`);
        dispatch(setStudent(res.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};

export const createStudent = (student: Student) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const res = await api.post("/students", student);
        dispatch(setResStatus(res.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};


export const updateStudent = (student: Student) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const res = await api.put(`/students/${student.id}`, student);
        dispatch(setResStatus(res.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};

export const deleteStudent = (id: number) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const res = await api.delete(`/students/${id}`);
        dispatch(setResStatus(res.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};

export default studentSlice.reducer;
