import gradeReducer, { Grade, getGrades, addGrade, setGrades, setGrade, setSearchParams, setResStatus, setLoading } from '../gradeSlice';

const initialState = {
    grades: [],
    grade: {
        id: 0,
        letterGrade: '',
        student: {
            id: 0,
            name: '',
            contactDetails: '',
            academicRecord: '',
            courses: [],
        },
        course: {
            id: 0,
            title: '',
            courseCode: '',
            description: '',
            creditHours: 0,
            enrolledStudents: [],
            grades: [],
        },
    },
    searchParams: {
        first: 0,
        rows: 7,
        searchText: '',
        sortColumn: '',
        sortDirection: 1,
    },
    resStatus: { status: 0, msg: '' },
    loading: false,
};
describe('gradeSlice', () => {
    const grade1: Grade = {
        id: 1,
        letterGrade: 'A',
        student: {
            id: 1,
            name: 'John',
            contactDetails: 'details',
            academicRecord: 'record',
            courses: [],
        },
        course: {
            id: 1,
            title: 'Math',
            courseCode: 'code',
            description: 'description',
            creditHours: 3,
            enrolledStudents: [],
            grades: [],
        },
    };

    const grade2: Grade = {
        id: 2,
        letterGrade: 'B',
        student: {
            id: 2,
            name: 'Jane',
            contactDetails: 'details',
            academicRecord: 'record',
            courses: [],
        },
        course: {
            id: 2,
            title: 'Science',
            courseCode: 'code',
            description: 'description',
            creditHours: 4,
            enrolledStudents: [],
            grades: [],
        },
    };

    const grades: Grade[] = [grade1, grade2];

    it('should return the initial state', () => {
        expect(gradeReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle getGrades', () => {
        expect(gradeReducer(initialState, getGrades(grades))).toEqual({ ...initialState, grades });
    });

    it('should handle addGrade', () => {
        expect(gradeReducer(initialState, addGrade(grade1))).toEqual({ ...initialState, grade: grade1 });
    });

    it('should handle setGrades', () => {
        expect(gradeReducer(initialState, setGrades(grades))).toEqual({ ...initialState, grades });
    });

    it('should handle setGrade', () => {
        expect(gradeReducer(initialState, setGrade(grade1))).toEqual({ ...initialState, grade: grade1 });
    });

    it('should handle setSearchParams', () => {
        const searchParams = { first: 0, rows: 10, searchText: 'John', sortColumn: 'name', sortDirection: 1 };
        expect(gradeReducer(initialState, setSearchParams(searchParams))).toEqual({ ...initialState, searchParams });
    });

    it('should handle setResStatus', () => {
        const resStatus = { status: 200, msg: 'OK' };
        expect(gradeReducer(initialState, setResStatus(resStatus))).toEqual({ ...initialState, resStatus });
    });

    it('should handle setLoading', () => {
        expect(gradeReducer(initialState, setLoading(true))).toEqual({ ...initialState, loading: true });
    });
});

