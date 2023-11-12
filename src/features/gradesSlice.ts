import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from "../utils/api";
import { Student } from './studentSlice';
import { Course } from './courseSlice';

export class Grade {
    id: number = 0;
    letterGrade: string = '';
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

interface GradesState {
  grades: Grade[];
  selectedGrade: Grade | undefined;
  searchParams: SearchParams;
  resStatus: ResStatus;
}

const initialState: GradesState = {
  grades: [],
  selectedGrade: undefined,
  searchParams: {
    first: 0,
    rows: 7,
    searchText: "",
    sortColumn: "",
    sortDirection: 1,
  },
  resStatus: {status: 0, msg: ""},

};

export const gradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {
    setGrades: (state, action: PayloadAction<Grade[]>) => {
      state.grades = action.payload;
    },
    setSelectedGrade: (state, action: PayloadAction<Grade | undefined>) => {
      state.selectedGrade = action.payload;
    },
  },
});

export const { setGrades, setSelectedGrade } = gradesSlice.actions;

export const loadGrades = (searchParams: SearchParams): any => async (dispatch: any) => {
    const { first, rows, searchText, sortColumn, sortDirection } =
    searchParams;
  const res = await api.get(
    `/grades?f=${first}&r=${rows}&st=${searchText}&sc=${sortColumn}&sd=${sortDirection}&`
  );
  dispatch(setGrades(res.data));

};

export const createGrade = (grade: Grade): any => async (dispatch: any) => {
  const res = await api.post("/grades", grade);
  dispatch(loadGrades(res.data.searchParams));
};

export const updateGrade = (id: number, grade: Grade) => async (dispatch: any) => {
  const res = await api.put(`/grades/${id}`, grade);
  dispatch(setSelectedGrade(undefined));
  dispatch(loadGrades(res.data.searchParams));
};

export const deleteGrade = (id: number) => async (dispatch: any) => {
  const res = await api.delete(`/grades/${id}`);
  dispatch(loadGrades(res.data));
};

export default gradesSlice.reducer;
