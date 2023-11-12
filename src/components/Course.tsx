import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import  TextField  from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams } from "react-router";
import { RootState } from "../store/store";
import {setCourse, fetchCourse, fetchCourses, deleteCourse, saveCourse, Course} from "../features/courseSlice";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from "react";
import { BarChart } from "@mui/x-charts";

const columns: GridColDef[] = [
 { field: 'id', headerName: 'ID'},
  { field: 'title', headerName: 'Course Name', width: 200 },
  { field: 'courseCode', headerName: 'Course Code' },
  {
    field: 'description',
    headerName: 'Description',
    width: 400,
  },
  {
    field: 'creditHours',
    headerName: 'Credit Hours',
  },
];

const CourseList = () => {
    const dispatch = useDispatch();
    const courseSlice = useSelector((state: RootState) => state.course);
    const {course, courses, searchParams, resStatus} = courseSlice;
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [courseCode, setCourseCode] = useState('')
    const [creditHours, setCreditHours] = useState(0)
    const [formData, setFormData] = useState<Course>(new Course())
    console.log("Courses list from course Slice is ",courses);


    const courseGrades:any = {};

for (const course of courses) {
  const courseId = course.id;
  const passes = course.grades.filter(grade => grade.letterGrade === 'A' || grade.letterGrade === 'B' || grade.letterGrade === 'C').length;
  const fails = course.grades.filter(grade => grade.letterGrade === 'D' || grade.letterGrade === 'F').length;

  if (!courseGrades[courseId]) {
    courseGrades[courseId] = {
      passes: 0,
      fails: 0,
    };
  }

  courseGrades[courseId].passes += passes;
  courseGrades[courseId].fails += fails;
}

console.log("Passes and Fails", courseGrades);

    useEffect(() => {
         
        setFormData(course)
      }, [courses])

      useEffect(() => {
        dispatch(fetchCourses(searchParams));
        
      }, [searchParams]);

      return (
          <Container fixed className="flex mt-10">
        
          {
       
          <DataGrid
          rows={courses}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        /> 
          }
  </Container>
      )
}

export default CourseList;