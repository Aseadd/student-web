import React from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';                       

import './App.css';
import StudentList from './components/Student';
import CourseList from './components/Course';
import GradeList from './components/Grade';
import EditCourse from './components/EditGrade';

function App() {
  return (
  <BrowserRouter >
    <div className='bg-gray-100'>
      <Navbar />
    </div>
    <Routes>
      <Route index element = {<Home/>} />
      <Route path='home' element = {<Home />} />
      <Route path= "courses" element = {<CourseList />} />
      <Route path='students' element ={<StudentList />} />
      <Route path='grades' element ={<GradeList />} />
      <Route path='analytics' element ={<EditCourse />} />
    </Routes>

  </BrowserRouter>
  );
}

export default App;
