import courseReducer, {setCourses, setCourse, setSearchParams, setResStatus, setLoading, getCourses } from '../courseSlice';

const initialState = {
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

describe('courseSlice', () => {

    it('should handle setSearchParams', () => {
        const searchParams = { first: 0, rows: 10, searchText: 'search', sortColumn: 'title', sortDirection: 1 };
        const nextState = courseReducer(initialState, setSearchParams(searchParams));
        expect(nextState.searchParams).toEqual(searchParams);
    });

    it('should handle setResStatus', () => {
        const resStatus = { status: 200, msg: 'OK' };
        const nextState = courseReducer(initialState, setResStatus(resStatus));
        expect(nextState.resStatus).toEqual(resStatus);
    });

    it('should handle setLoading', () => {
        const loading = true;
        const nextState = courseReducer(initialState, setLoading(loading));
        expect(nextState.loading).toEqual(loading);
    });

    it('should handle setCourse', () => {
        const course = { id: 1, title: 'title', description: 'description', courseCode: 'code', creditHours: 3, enrolledStudents: [], grades: [] };
        const nextState = courseReducer(initialState, setCourse(course));
        expect(nextState.course).toEqual(course);
    });

    it('should handle setCourses', () => {
        const courses = [{ id: 1, title: 'title', description: 'description', courseCode: 'code', creditHours: 3, enrolledStudents: [], grades: [] }];
        const nextState = courseReducer(initialState, setCourses(courses));
        expect(nextState.courses).toEqual(courses);
    });

    it('should handle getCourses', () => {
        const courses = [{ id: 1, title: 'title', description: 'description', courseCode: 'code', creditHours: 3, enrolledStudents: [], grades: [] }];
        const nextState = courseReducer(initialState, getCourses(courses));
        expect(nextState.courses).toEqual(courses);
    });

   
});
