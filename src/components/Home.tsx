import { useEffect } from "react";
import CollegeImg from '../assets/images/college.png'
import { Button } from "@mui/material";


const Home = () => {
    useEffect(() => {
        document.title = 'Home | XY COLLEGE'
    }, [])


    return (
        <div className='container mx-auto'>
        <div className="flex mt-20" >
            <div className="w-1/2 p-8 ">
                <h1 className="text-6xl font-bold ">Harmony in Learning</h1>
                <h1 className="text-6xl font-bold text-green-700">Uniting Curiosity and Knowledge</h1>
                <p className="text-justify mt-3 pt-2 mb-2">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
                <div className="flex ">
                <button className="px-4 py-2 mt-2 text-white bg-green-700 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 border-r-2">Explore</button>
                <button className="px-4 py-2 mt-2 ml-4 text-black bg-white-700 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">Watch Video</button>
                </div>
                
            </div>

            <div className="w-1/2 p-8">
                <img src={CollegeImg} alt="college" className="w-96 h-96" />
            </div>

        </div>
        </div>
    )
    }

export default Home