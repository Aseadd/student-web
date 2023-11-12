import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
import { useParams } from "react-router";
import { RootState } from "../store/store";
import {setCourse, fetchCourse, fetchCourses, deleteCourse, saveCourse, Course} from "../features/courseSlice";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Skeleton } from "@mui/material";

const columns: GridColDef[] = [
 { field: 'id', headerName: 'ID'},
  { field: 'title', headerName: 'Course Name', width: 200 },
  { field: 'courseCode', headerName: 'Course Code' },
  {
    field: 'description', headerName: 'Description', width: 400,
  },
  {
    field: 'creditHours', headerName: 'Credit Hours',
  },
];

const CourseList = () => {
    const dispatch = useDispatch();
    const courseSlice = useSelector((state: RootState) => state.course);
    const {course, courses, searchParams, resStatus} = courseSlice;
    const [formData, setFormData] = useState<Course>(new Course())
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
      useEffect(() => {
          
          setFormData(course)
        }, [courses])

        useEffect(() => {
          dispatch(fetchCourses(searchParams));
          
        }, [searchParams]);

        return (
            <Container fixed className="flex mt-10">

            {
              courses && courses.length > 0 &&
        
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
            {
              courses && courses.length === 0 &&
              <div className="flex justify-center items-center">
                <h1 className="text-4xl font-bold text-gray-400">Loading ...</h1>
                <Skeleton width={100} height={20} />
              </div>
            }
    </Container>
     )
  }
export default CourseList;