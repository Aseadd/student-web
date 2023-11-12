import { useEffect } from "react";
import CollegeImg from '../assets/images/college.png'


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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum iste amet corrupti nisi officia. Illum non dolorem ullam incidunt officia! Ratione distinctio voluptatum dolore quam vero quae culpa fugiat obcaecati!</p>
            </div>

            <div className="w-1/2 p-8">
                <img src={CollegeImg} alt="college" className="w-96 h-96" />
            </div>

        </div>
        </div>
    )
    }

export default Home