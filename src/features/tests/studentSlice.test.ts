import studentReducer, { setStudent, setStudents, SearchParams, getStudents, setResStatus, setLoading, setSearchParams} from "../studentSlice";

const initialState = {
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

describe('studentSlice', () => {

    it('should handle setStudents', () => {
        const students = [{ id: 1, name: 'name', contactDetails: 'details', academicRecord: 'record', courses: [] }];
        const nextState = studentReducer(initialState, setStudents(students));
        expect(nextState.students).toEqual(students);
    });

    it('should handle setStudent', () => {
        const student = { id: 1, name: 'name', contactDetails: 'details', academicRecord: 'record', courses: [] };
        const nextState = studentReducer(initialState, setStudent(student));
        expect(nextState.student).toEqual(student);
    });

    it('should handle getStudents', () => {
        const students = [{ id: 1, name: 'name', contactDetails: 'details', academicRecord: 'record', courses: [] }];
        const nextState = studentReducer(initialState, getStudents(students));
        expect(nextState.students).toEqual(students);
    });

    it('should handle setSearchParams', () => {
        const searchParams = { first: 0, rows: 10, searchText: 'search', sortColumn: 'name', sortDirection: 1 };
        const nextState = studentReducer(initialState, setSearchParams(searchParams));
        expect(nextState.searchParams).toEqual(searchParams);
    });

    it('should handle setResStatus', () => {
        const resStatus = { status: 200, msg: 'OK' };
        const nextState = studentReducer(initialState, setResStatus(resStatus));
        expect(nextState.resStatus).toEqual(resStatus);
    });

    it('should handle setLoading', () => {
        const loading = true;
        const nextState = studentReducer(initialState, setLoading(loading));
        expect(nextState.loading).toEqual(loading);
    });

});