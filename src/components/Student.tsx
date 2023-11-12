import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import  TextField  from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams } from "react-router";
import { RootState } from "../store/store";

import { getStudents,  setSearchParams, addStudent, setStudent, Student, fetchStudent, fetchStudents, deleteStudent, createStudent } from "../features/studentSlice";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Skeleton } from "@mui/material";
import React from "react";
import ChartTable from "./EditGrade";
import { BarChart } from "@mui/x-charts";
import { type } from "os";


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'contactDetails', headerName: 'Last name', width: 130 },
  {
    field: 'academicRecord',
    headerName: 'Academic Record',
    width: 90,
  },
];

    const StudentList = () => {
        const dispatch = useDispatch();
        const studentSlice = useSelector((state: RootState) => state.student);
        const courseSlice = useSelector((state: RootState) => state.course);
        const gradeSlice = useSelector((state: RootState) => state.grade);
        const {student, students, searchParams} = studentSlice;
        const {course, courses} = courseSlice;
      //  const {grade, grades} = gradeSlice;
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(5);
      
        const handleChangePage = (event: any, newPage: number) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = (event: any) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        };
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, students.length - page * rowsPerPage);
        
        console.log("Students list from student Component ",students);
        const courseGradeCounts: any = {};

        for (const student of students) {
          for (const course of student.courses) {
            const courseID = course.id;
            if (course.grades.length > 0) {
              const numGrades = course.grades.length;
              if (!courseGradeCounts[courseID]) {
                courseGradeCounts[courseID] = 0;
              }
              courseGradeCounts[courseID] += numGrades;
            }
          }
        }
console.log("Course Grade Counts", courseGradeCounts);
        // useEffect(() => {
        //   dispatch(fetchStudents(searchParams));
        // }, [students]);

        // useEffect(() => {
        //   setFormData(student);
        // }, [students]);

        useEffect(() => {
          dispatch(fetchStudents(searchParams));
          
        }, [searchParams]);

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
        } 
    return (
      <Container fixed className="flex mt-20">
         {
      students.length > 0 &&
      <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : students
          ).map((student) => (
            <React.Fragment key={student.id}>
              <TableRow>
                <TableCell rowSpan={student.courses.length}>{student.name}</TableCell>
                <TableCell>{student.courses[0].title}</TableCell>
                <TableCell>{student.courses[0].grades.length > 0 ? student.courses[0].grades[0].letterGrade : '-'}</TableCell>
              </TableRow>
              {student.courses.slice(1).map((course: any) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.grades.length > 0 ? course.grades[0].letterGrade : '-'}</TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={3} />
            </TableRow>
          )}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    </Paper>
   }
   {
      students.length === 0 &&
      <div className="flex justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-400">Loading ...</h1>
        <Skeleton width={100} height={20} />
      </div>
   }
  </Container>
        );
     };

export default StudentList
    


