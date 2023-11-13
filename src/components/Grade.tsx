import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import  TextField  from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams } from "react-router";
import { RootState } from "../store/store";
import { getGrades,  setSearchParams, addGrade, setGrade, Grade, fetchGrade, fetchGrades, deleteGrade, createGrade } from "../features/gradeSlice";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Skeleton } from "@mui/material";
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'letterGrade', headerName: 'Grade', width: 70 },
];

    const GradeList = () => {
        const dispatch = useDispatch();
        const gradeSlice = useSelector((state: RootState) => state.grade);
        const {grade, grades, searchParams} = gradeSlice;
        const [name, setName] = useState('')
        const [contactDetails, setContactDetails] = useState('')
        const [academicRecord, setAcademicRecord] = useState('')
        const [formData, setFormData] = useState<Grade>(new Grade())
        const [letterGrade, setLetterGrade] = useState('')
        const [studentId, setStudentId] = useState(0)
        const [courseId, setCourseId] = useState(0)

        useEffect(() => {
         
          setFormData(grade)
        }, [grades])

        useEffect(() => {
          dispatch(fetchGrades(searchParams));
          
        }, [searchParams]);

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          const grade: any = {
            id: grades.length + 1,
            letterGrade,
            student: {
              id: studentId,
              name: "",
              contactDetails: "",
              academicRecord: ""
            }, 
            course: {
              id: courseId,
              title: "",
              description: "",
              courseCode: "",
              creditHours: 0

            }
          }
          if (handleValidation()) {
            dispatch(addGrade(grade) as any)
          }
        } 

        const handleValidation = () => {
          let formIsValid = true;
          let errors = {
            letterGrade: "",
            studentId: "",
            courseId: ""
          }
          if (!letterGrade) {
            formIsValid = false;
            errors["letterGrade"] = "Cannot be empty";
          }

          if (!studentId) {
            formIsValid = false;
            errors["studentId"] = "Cannot be empty";
          }

          if (!courseId) {
            formIsValid = false;
            errors["courseId"] = "Cannot be empty";
          }
          return formIsValid;
        }

        return (
            <Container fixed className="flex mt-20 space-x-4">
            <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4 mb-10">
             <TextField
              className="block w-1/2 px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-red-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="outlined-required"
              label={"Letter Grade"}
              defaultValue="Letter Grade"
              value={letterGrade}
              onChange= {(e) => {
                setLetterGrade(e.target.value)
              }}
              required ={true}
            />

            <TextField
              className="block w-1/2 px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-red-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="outlined-required"
              label={"Student Id"}
              defaultValue="Student Id"
              value={studentId}
              onChange= {(e) => {
                setStudentId(parseInt(e.target.value))
              }}
              required ={true}
            />
            <TextField
              className="block w-1/2 px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-red-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="outlined-required"
              label={"Course Id"}
              defaultValue="Course Id"
              value={courseId}
              onChange= {(e) => {
               setCourseId(parseInt(e.target.value))
              }}
              required ={true}
            />
            <Button
            className="block w-1/3 px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-red-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              variant="contained"
              color="primary"
              type="submit"
            >
              Add Grade
            </Button>
            </div>
          </form>
         
             {
          gradeSlice.grades && gradeSlice.grades.length > 0 &&
            <DataGrid
            rows={gradeSlice.grades}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />  
            }

            {
              gradeSlice.grades && gradeSlice.grades.length === 0 &&
              <div className="flex justify-center items-center">
                <h1 className="text-4xl font-bold text-gray-400">Loading ...</h1>
                <Skeleton width={100} height={20} />
              </div>    
            }

          </Container>
        );
       
     };

export default GradeList
    