import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";


export class Course {
    id: number = 0
    title: string = ""
    description: string = ""
    courseCode: string = ""
    creditHours: number = 0
    enrolledStudents: any[] = []
    grades: any[] = []
    
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
    courses:  Course[];
    course: Course;
    searchParams: SearchParams;
    resStatus: ResStatus;
    loading: boolean;
}


const initialState: state = {
    courses:  [],
    course: {
        id: 0,
        title: "",
        description: "",
        courseCode: "",
        creditHours: 0,
        enrolledStudents: [],
        grades: [],
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


const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        getCourses(state, action: PayloadAction< Course[]>) {
            state.courses = action.payload;
        },
        setCourses(state, action: PayloadAction<Course[]>) {
            state.courses = action.payload;
        },
        setCourse(state, action: PayloadAction<Course>) {
            state.course = action.payload;
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

export const { setCourses, setCourse, setSearchParams, setResStatus, setLoading, getCourses } = courseSlice.actions;

export const fetchCourses = (searchParams: SearchParams): any => async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
        const { first, rows, searchText, sortColumn, sortDirection } = searchParams;
        const res = await api.get(
            `/courses?f=${first}&r=${rows}&st=${searchText}&sc=${sortColumn}&sd=${sortDirection}&`
          );
       // const response = await api.get("/courses", { params: searchParams });
        dispatch(getCourses(res.data));
       
        dispatch(setLoading(false));
    } catch (error: any) {
        dispatch(setResStatus({ status: error.response.status, msg: error.response.statusText }));
    }
    dispatch(setLoading(false));
};

export const fetchCourse = (id: number) => async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
        const response = await api.get(`/courses/${id}`);
        dispatch(setCourse(response.data));
    } catch (error: any) {
        dispatch(setResStatus({ status: error.response.status, msg: error.response.statusText }));
    }
    dispatch(setLoading(false));
};

export const saveCourse = (course: Course) => async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
        const response = await api.post("/courses", course);
        dispatch(setCourse(response.data));
        dispatch(setResStatus({ status: response.status, msg: "Course saved successfully." }));
    } catch (error: any) {
        dispatch(setResStatus({ status: error.response.status, msg: error.response.statusText }));
    }
    dispatch(setLoading(false));
};

export const updateCourse = (course: Course) => async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
        const response = await api.put(`/courses/${course.id}`, course);
        dispatch(setCourse(response.data));
        dispatch(setResStatus({ status: response.status, msg: "Course updated successfully." }));
    } catch (error: any) {
        dispatch(setResStatus({ status: error.response.status, msg: error.response.statusText }));
    }
    dispatch(setLoading(false));
};

export const deleteCourse = (id: number) => async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
        const response = await api.delete(`/courses/${id}`);
        dispatch(setResStatus({ status: response.status, msg: "Course deleted successfully." }));
    } catch (error: any) {
        dispatch(setResStatus({ status: error.response.status, msg: error.response.statusText }));
    }
    dispatch(setLoading(false));
};

// export const fetchPassAndFails = (SearchParams: SearchParams): any => async (dispatch: any) => {
//     dispatch(setLoading(true));
//     try {
//         const { first, rows, searchText, sortColumn, sortDirection } = SearchParams;
//         const response = await api.get(
//             `/courses/grades?f=${first}&r=${rows}&st=${searchText}&sc=${sortColumn}&sd=${sortDirection}&`
//           );
//         dispatch(setCourses(response.data));
//         console.log("pass and fail chart", response.data);
//     } catch (error: any) {
//         dispatch(setResStatus({ status: error.response.status, msg: error.response.statusText }));
//     }
//     dispatch(setLoading(false));
// }


export default courseSlice.reducer;